<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb" v-if="store.regionName">
    <ol class="breadcrumbs-list">
      <li class="breadcrumb-item">
        <span class="breadcrumb-current">{{ store.regionName }}</span>
      </li>
      <li 
        v-for="subRegion in actualSubRegions" 
        :key="subRegion.name"
        class="breadcrumb-item"
      >
        <span class="breadcrumb-separator">/</span>
        <a 
          href="#" 
          class="breadcrumb-link"
          :aria-label="`View ${subRegion.name}`"
        >
          {{ subRegion.name }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboard'

const store = useDashboardStore()

// Filter out the first sub-region (index 0) which is the current region total
const actualSubRegions = computed(() => {
  return store.subRegions.slice(1)
})
</script>

<style scoped>
.breadcrumbs {
  padding: 0.5rem 0;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-current {
  font-weight: 600;
  color: #333;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #999;
}

.breadcrumb-link {
  color: #0175eb;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.breadcrumb-link:focus {
  outline: 2px solid #0175eb;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>

