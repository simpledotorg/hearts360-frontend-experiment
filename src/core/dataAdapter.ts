/**
 * Data adapter for different data source types
 * Framework-agnostic data transformation logic
 */

import type { DataSourceConfig, DashboardData } from '../types';

export class DataAdapter {
  private config: DataSourceConfig;

  constructor(config: DataSourceConfig) {
    this.config = config;
  }

  async fetchData(): Promise<DashboardData> {
    switch (this.config.type) {
      case 'rest':
        return this.fetchRestData();
      case 'graphql':
        return this.fetchGraphQLData();
      case 'dhis2':
        return this.fetchDHIS2Data();
      case 'custom':
        if (!this.config.adapter) {
          throw new Error('Custom adapter function required for custom data source');
        }
        const rawData = await this.fetchRestData();
        return this.config.adapter(rawData);
      default:
        throw new Error(`Unsupported data source type: ${this.config.type}`);
    }
  }

  private async fetchRestData(): Promise<DashboardData> {
    if (!this.config.url) {
      throw new Error('URL required for REST data source');
    }

    const response = await fetch(this.config.url, {
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return this.transformToDashboardData(data);
  }

  private async fetchGraphQLData(): Promise<DashboardData> {
    if (!this.config.url) {
      throw new Error('URL required for GraphQL data source');
    }

    // Example GraphQL query - should be configurable
    const query = `
      query {
        dashboard {
          metrics {
            id
            label
            value
            unit
          }
          charts {
            id
            type
            title
            data
          }
        }
      }
    `;

    const response = await fetch(this.config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GraphQL data: ${response.statusText}`);
    }

    const result = await response.json();
    return this.transformToDashboardData(result.data);
  }

  private async fetchDHIS2Data(): Promise<DashboardData> {
    if (!this.config.url) {
      throw new Error('URL required for DHIS2 data source');
    }

    // DHIS2 API endpoint for analytics
    const dhis2Url = `${this.config.url}/api/analytics.json?dimension=dx:...&dimension=pe:LAST_12_MONTHS`;

    const response = await fetch(dhis2Url, {
      headers: {
        'Authorization': `Basic ${btoa(`${this.config.headers?.username}:${this.config.headers?.password}`)}`,
        ...this.config.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch DHIS2 data: ${response.statusText}`);
    }

    const data = await response.json();
    return this.transformDHIS2ToDashboardData(data);
  }

  private transformToDashboardData(data: any): DashboardData {
    // Transform generic REST/GraphQL response to dashboard format
    return {
      metrics: data.metrics || [],
      charts: data.charts || [],
      lastUpdated: new Date(),
    };
  }

  private transformDHIS2ToDashboardData(data: any): DashboardData {
    // Transform DHIS2 analytics response to dashboard format
    // This is a simplified example - actual DHIS2 transformation would be more complex
    const metrics = data.rows?.map((row: any[]) => ({
      id: row[0],
      label: row[1] || row[0],
      value: parseFloat(row[2]) || 0,
    })) || [];

    return {
      metrics,
      charts: [],
      lastUpdated: new Date(),
    };
  }
}



