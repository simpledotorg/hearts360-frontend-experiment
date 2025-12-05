<template>
  <nav
    class="breadcrumbs"
    aria-label="Breadcrumb"
    v-if="store.regionName || currentPage === 'upload'"
  >
    <!-- Upload page: Show return to dashboard link -->
    <ol class="breadcrumbs-list" v-if="currentPage === 'upload'">
      <li class="breadcrumb-item">
        <a
          href="#"
          class="breadcrumb-link"
          aria-label="Return to the dashboard"
          @click.prevent="navigateToDashboard"
        >
          ‹ {{ $t("breadcrumbs.returnToDashboard") }}
        </a>
      </li>
    </ol>
    <!-- Dashboard page: Show breadcrumb path (always render list to preserve space) -->
    <ol class="breadcrumbs-list" v-else>
      <li
        v-for="(crumb, index) in breadcrumbPath"
        :key="crumb.id || crumb.name"
        class="breadcrumb-item"
      >
        <span v-if="index > 0" class="breadcrumb-separator">›</span>
        <a
          v-if="!crumb.isCurrent"
          href="#"
          class="breadcrumb-link"
          :aria-label="`View ${crumb.name}`"
          @click.prevent="navigateToLevel(crumb.level, crumb.id)"
        >
          {{ crumb.name }}
        </a>
        <span v-else class="breadcrumb-current">{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import {
  national,
  regions,
  districts,
  facilities,
} from "../data/hierarchicalData.js";

const props = defineProps({
  currentPage: {
    type: String,
    default: "dashboard",
  },
});

const emit = defineEmits(["navigate"]);

const store = useDashboardStore();

// Build breadcrumb path showing only parent levels (higher than current view)
const breadcrumbPath = computed(() => {
  const path = [];
  const currentLevel = store.currentLevel;
  const currentId = store.currentId;

  // If viewing national level, show nothing (blank)
  if (currentLevel === "national") {
    return [];
  }

  // If viewing region level, show: National -> Region
  if (currentLevel === "region" && currentId) {
    const region = regions.find((r) => r.id === currentId);
    if (region) {
      path.push({
        id: "NAT-001",
        name: national.name,
        level: "national",
        isCurrent: false,
      });
      path.push({
        id: region.id,
        name: region.name,
        level: "region",
        isCurrent: true,
      });
    }
  }

  // If viewing district level, show: National -> Region -> District
  if (currentLevel === "district" && currentId) {
    const district = districts.find((d) => d.id === currentId);
    if (district) {
      const region = regions.find((r) => r.id === district.regionId);
      if (region) {
        path.push({
          id: "NAT-001",
          name: national.name,
          level: "national",
          isCurrent: false,
        });
        path.push({
          id: region.id,
          name: region.name,
          level: "region",
          isCurrent: false,
        });
        path.push({
          id: district.id,
          name: district.name,
          level: "district",
          isCurrent: true,
        });
      }
    }
  }

  // If viewing facility level, show: National -> Region -> District -> Facility
  if (currentLevel === "facility" && currentId) {
    const facility = facilities.find((f) => f.id === currentId);
    if (facility) {
      const district = districts.find((d) => d.id === facility.districtId);
      if (district) {
        const region = regions.find((r) => r.id === district.regionId);
        if (region) {
          path.push({
            id: "NAT-001",
            name: national.name,
            level: "national",
            isCurrent: false,
          });
          path.push({
            id: region.id,
            name: region.name,
            level: "region",
            isCurrent: false,
          });
          path.push({
            id: district.id,
            name: district.name,
            level: "district",
            isCurrent: false,
          });
          path.push({
            id: facility.id,
            name: facility.name,
            level: "facility",
            isCurrent: true,
          });
        }
      }
    }
  }

  return path;
});

// Navigate to a specific level when clicking a breadcrumb
const navigateToLevel = (level, id) => {
  const actualId = level === "national" ? null : id;
  store.setCurrentLevel(level, actualId);
  store.loadDashboardData(null, level, actualId);
};

// Navigate to dashboard
const navigateToDashboard = () => {
  emit("navigate", "dashboard");
};
</script>

<style scoped>
.breadcrumbs {
  padding: 0 1rem 0.5rem;
  @media screen and (min-width: 880px) {
    padding: 0.25rem 1.5rem 0;
  }
  width: 100%;
  max-width: 1600px;
  margin: auto;
  min-height: 1.5rem; /* Reserve space even when empty */
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  min-height: 1.5rem; /* Reserve space even when empty */
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
