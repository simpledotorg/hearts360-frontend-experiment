<template>

    <!-- Dashboard Links -->
    <div class="link-dashboards">
      <ul>
        <li class="active-link">
          <a :href="`/dashboard/${activeDashboard}`">
            {{ $t('nav.hypertensionDashboard') }}
          </a>
        </li>
      </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboard'

const store = useDashboardStore()

const activeDashboard = computed(() => {
  return store.activeDashboard
})
</script>