<template>
  <div :class="['hearts360-dashboard', `theme-${theme}`]">
    <div v-if="config?.showHeader !== false" class="dashboard-header">
      <h1>HEARTS360 Dashboard</h1>
      <div v-if="lastUpdated" class="last-updated">
        Last updated: {{ formatDate(lastUpdated) }}
      </div>
    </div>

    <div v-if="loading" class="loading">
      Loading dashboard data...
    </div>

    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>

    <div v-else class="dashboard-content">
      <!-- Metrics Grid -->
      <div v-if="metrics.length > 0" class="metrics-grid">
        <div
          v-for="metric in metrics"
          :key="metric.id"
          class="metric-card"
        >
          <div class="metric-label">{{ metric.label }}</div>
          <div class="metric-value">
            {{ formatValue(metric.value) }}
            <span v-if="metric.unit" class="metric-unit">{{ metric.unit }}</span>
          </div>
          <div v-if="metric.trend" class="metric-trend" :class="`trend-${metric.trend}`">
            <span v-if="metric.change !== undefined">
              {{ metric.change > 0 ? '+' : '' }}{{ metric.change }}%
            </span>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div v-if="charts.length > 0" class="charts-grid">
        <div
          v-for="chart in charts"
          :key="chart.id"
          class="chart-container"
        >
          <h3>{{ chart.title }}</h3>
          <LineChart
            v-if="chart.type === 'line'"
            :data="chart.data"
            :options="chart.options"
          />
          <BarChart
            v-else-if="chart.type === 'bar'"
            :data="chart.data"
            :options="chart.options"
          />
          <PieChart
            v-else-if="chart.type === 'pie'"
            :data="chart.data"
            :options="chart.options"
          />
        </div>
      </div>
    </div>

    <div v-if="config?.showFooter !== false" class="dashboard-footer">
      <p>Powered by HEARTS360</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { DataAdapter } from '../core/dataAdapter';
import type { DashboardConfig, DashboardData, Metric, ChartData } from '../types';
import LineChart from './components/LineChart.vue';
import BarChart from './components/BarChart.vue';
import PieChart from './components/PieChart.vue';

interface Props {
  config?: DashboardConfig;
  dataSource?: DashboardConfig['dataSource'];
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  locale: 'en',
});

const loading = ref(true);
const error = ref<string | null>(null);
const dashboardData = ref<DashboardData | null>(null);
const lastUpdated = ref<Date | null>(null);

const metrics = computed<Metric[]>(() => dashboardData.value?.metrics || []);
const charts = computed<ChartData[]>(() => dashboardData.value?.charts || []);

const config = computed<DashboardConfig | undefined>(() => {
  if (props.config) return props.config;
  if (props.dataSource) {
    return {
      dataSource: props.dataSource,
      theme: props.theme,
      locale: props.locale,
    };
  }
  return undefined;
});

const loadData = async () => {
  if (!config.value?.dataSource) {
    error.value = 'No data source configured';
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    error.value = null;
    const adapter = new DataAdapter(config.value.dataSource);
    const data = await adapter.fetchData();
    dashboardData.value = data;
    lastUpdated.value = data.lastUpdated;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load dashboard data';
    console.error('Dashboard error:', err);
  } finally {
    loading.value = false;
  }
};

const formatValue = (value: number | string): string => {
  if (typeof value === 'number') {
    return new Intl.NumberFormat(props.locale).format(value);
  }
  return value;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat(props.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

onMounted(() => {
  loadData();
});

watch(() => config.value?.dataSource, () => {
  loadData();
}, { deep: true });
</script>

<style scoped>
.hearts360-dashboard {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  padding: 1rem;
  min-height: 400px;
}

.theme-light {
  background-color: #ffffff;
  color: #333333;
}

.theme-dark {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dashboard-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 1rem;
}

.theme-dark .dashboard-header {
  border-bottom-color: #404040;
}

.dashboard-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.last-updated {
  font-size: 0.875rem;
  color: #666;
}

.theme-dark .last-updated {
  color: #999;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
}

.error {
  color: #d32f2f;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.theme-dark .metric-card {
  background: #2a2a2a;
  border-color: #404040;
}

.metric-label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.theme-dark .metric-label {
  color: #999;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.metric-unit {
  font-size: 1rem;
  font-weight: normal;
  color: #666;
  margin-left: 0.25rem;
}

.metric-trend {
  font-size: 0.875rem;
}

.trend-up {
  color: #4caf50;
}

.trend-down {
  color: #f44336;
}

.trend-stable {
  color: #666;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.chart-container {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.theme-dark .chart-container {
  background: #2a2a2a;
  border-color: #404040;
}

.chart-container h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
}

.dashboard-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  font-size: 0.875rem;
  color: #666;
}

.theme-dark .dashboard-footer {
  border-top-color: #404040;
  color: #999;
}
</style>



