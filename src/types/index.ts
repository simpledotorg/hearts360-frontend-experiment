/**
 * Core types and interfaces for HEARTS360 Dashboard
 * Framework-agnostic business logic types
 */

export type DataSourceType = 'rest' | 'graphql' | 'dhis2' | 'custom';

export interface DataSourceConfig {
  type: DataSourceType;
  url?: string;
  headers?: Record<string, string>;
  adapter?: (data: any) => DashboardData;
}

export interface DashboardData {
  metrics: Metric[];
  charts: ChartData[];
  lastUpdated: Date;
}

export interface Metric {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
}

export interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: any;
  options?: Record<string, any>;
}

export interface DashboardConfig {
  dataSource: DataSourceConfig;
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  charts?: ChartConfig[];
}

export interface ChartConfig {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  dataKey: string;
  options?: Record<string, any>;
}

export interface DashboardProps {
  config?: DashboardConfig;
  dataSource?: DataSourceConfig;
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
}



