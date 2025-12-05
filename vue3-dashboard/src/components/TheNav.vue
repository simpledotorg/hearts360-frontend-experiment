<template>
  <!-- Banner -->
  <div class="banner">
    <div class="banner-body">
      <div class="selectors-container">
        <div class="region-nav">
          <div class="hover-button nav-button-base">Choose region or facility...</div>
          <div class="card nav-hover-content">
            <div class="nav-button-base hover-button hover-button-hover-state">
              {{ $t('nav.chooseRegion') }}
            </div>
            <form class="search-form">
              <input
                id="region-search"
                v-model="regionSearch"
                type="search"
                class="region-search"
                :placeholder="$t('nav.searchPlaceholder')"
              />
            </form>
            <!-- Search Results (shown when searching) -->
            <dl v-if="regionSearch && regionSearch.trim() !== ''" id="search-results" class="search-results">
              <template v-for="(group, level) in searchResultsByLevel" :key="level">
                <dt class="search-section">{{ getLevelLabel(level) }}</dt>
                <dd 
                  v-for="location in group" 
                  :key="location.id"
                  class="results-state"
                >
                  <a href="#" @click.prevent="selectLocation(location)">
                    <span v-html="highlightSearch(location.name, regionSearch)"></span>
                    <span v-if="location.parentName"> ({{ location.parentName }})</span>
                  </a>
                </dd>
              </template>
              <dd v-if="Object.keys(searchResultsByLevel).length === 0" class="results-state text-grey" style="padding: 0.5rem;">
                {{ $t('nav.noResults') || 'No results found' }}
              </dd>
            </dl>
            <!-- Hierarchical Navigation (shown when not searching) -->
            <ul v-else id="myUL" class="nav-list">
              <li class="region-national">
                <a 
                  href="#" 
                  @click.prevent="selectLocation(nationalLocation)"
                  :aria-current="isSelected(nationalLocation) ? 'page' : undefined"
                >
                  {{ nationalLocation.name }}
                </a>
              </li>
              <li 
                v-for="region in hierarchicalTree.regions" 
                :key="region.id"
                class="region-state"
              >
                <span 
                  class="caret"
                  :class="{ 'caret-down': expandedItems[region.id] }"
                  @click="toggleExpand(region.id)"
                ></span>
                <a 
                  href="#" 
                  @click.prevent="selectLocation(region)"
                  :aria-current="isSelected(region) ? 'page' : undefined"
                >
                  {{ region.name }}
                </a>
                <ul 
                  class="nested"
                  :class="{ 'active': expandedItems[region.id] }"
                >
                  <li 
                    v-for="district in region.districts" 
                    :key="district.id"
                    class="region-district"
                  >
                    <span 
                      class="caret"
                      :class="{ 'caret-down': expandedItems[district.id] }"
                      @click="toggleExpand(district.id)"
                    ></span>
                    <a 
                      href="#" 
                      @click.prevent="selectLocation(district)"
                      :aria-current="isSelected(district) ? 'page' : undefined"
                    >
                      {{ district.name }}
                    </a>
                    <ul 
                      class="nested"
                      :class="{ 'active': expandedItems[district.id] }"
                    >
                      <li 
                        v-for="facility in district.facilities" 
                        :key="facility.id"
                        class="region-facility"
                      >
                        <a 
                          href="#" 
                          @click.prevent="selectLocation(facility)"
                          :aria-current="isSelected(facility) ? 'page' : undefined"
                        >
                          {{ facility.name }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="month-selector">
          <select 
            v-model="selectedMonth" 
            @change="onMonthChange"
            class="month-select nav-button-base"
          >
            <option 
              v-for="month in monthOptions" 
              :key="month.value" 
              :value="month.value"
            >
              {{ month.label }}
            </option>
          </select>
        </div>
      </div>

      <h1>
        <a href="#" @click.prevent="navigateToDashboard" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
          <div class="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill-opacity="1.0"
              fill="white"
            >
              <path
                d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C10.0226 20.3135 4.91699 17.563 2.86894 13.001L1 13V11L2.21045 11.0009C2.07425 10.3633 2 9.69651 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 9.68542 4.09035 10.3516 4.26658 11.0004L6.43381 11L8.5 7.55635L11.5 12.5563L12.4338 11H17V13H13.5662L11.5 16.4437L8.5 11.4437L7.56619 13L5.10789 13.0006C5.89727 14.3737 7.09304 15.6681 8.64514 16.9029C9.39001 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5Z"
              ></path>
            </svg>
          </div>
          <span>{{ $t('nav.hearts360') }}</span>360
        </a>
      </h1>

      <div class="flex justify-end items-center gap-2">
        <div class="language-selector">
          <select 
            v-model="selectedLanguage" 
            @change="onLanguageChange"
            class="language-select nav-button-base"
          >
            <option value="en">{{ $t('nav.english') }}</option>
            <option value="id">{{ $t('nav.indonesian') }}</option>
          </select>
        </div>
        <a 
          class="nav-button-base" 
          href="#"
          @click.prevent="navigateToUpload"
        >
          {{ $t('nav.uploadData') }}
        </a>
      </div>
    </div>
  </div>
  <TheNavDashboardLinks />
</template>

<script setup>
import TheNavDashboardLinks from './TheNavDashboardLinks.vue'
import { useDashboardStore } from '../stores/dashboard'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { national, regions, districts, facilities } from '../data/hierarchicalData.js'

const emit = defineEmits(['navigate'])

const store = useDashboardStore()
const { locale, t } = useI18n()

const regionSearch = computed({
  get: () => store.regionSearch,
  set: (value) => { store.regionSearch = value }
})

// Track expanded items
const expandedItems = ref({})

// National location object
const nationalLocation = {
  id: 'NAT-001',
  name: national.name,
  level: 'national',
  type: 'national',
  displayName: national.name
}

// Build hierarchical tree structure sorted by parent-child
const hierarchicalTree = computed(() => {
  const tree = {
    regions: []
  }
  
  // Sort regions by name
  const sortedRegions = [...regions].sort((a, b) => a.name.localeCompare(b.name))
  
  sortedRegions.forEach(region => {
    // Get districts for this region, sorted by name
    const regionDistricts = districts
      .filter(d => d.regionId === region.id)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(district => {
        // Get facilities for this district, sorted by name
        const districtFacilities = facilities
          .filter(f => f.districtId === district.id)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(facility => ({
            id: facility.id,
            name: facility.name,
            level: 'facility',
            type: 'facility',
            displayName: facility.name,
            parentId: facility.districtId,
            parentName: district.name
          }))
        
        return {
          id: district.id,
          name: district.name,
          level: 'district',
          type: 'district',
          displayName: district.name,
          parentId: district.regionId,
          parentName: region.name,
          facilities: districtFacilities
        }
      })
    
    tree.regions.push({
      id: region.id,
      name: region.name,
      level: 'region',
      type: 'region',
      displayName: region.name,
      parentId: 'NAT-001',
      districts: regionDistricts
    })
  })
  
  return tree
})

// Create a flattened list of all selectable locations for search
const allLocations = computed(() => {
  const locations = []
  
  // Add National
  locations.push(nationalLocation)
  
  // Add Regions
  regions.forEach(region => {
    locations.push({
      id: region.id,
      name: region.name,
      level: 'region',
      type: 'region',
      displayName: region.name,
      parentId: 'NAT-001'
    })
  })
  
  // Add Districts
  districts.forEach(district => {
    const region = regions.find(r => r.id === district.regionId)
    locations.push({
      id: district.id,
      name: district.name,
      level: 'district',
      type: 'district',
      displayName: district.name,
      parentId: district.regionId,
      parentName: region?.name
    })
  })
  
  // Add Facilities
  facilities.forEach(facility => {
    const district = districts.find(d => d.id === facility.districtId)
    const region = regions.find(r => r.id === district?.regionId)
    locations.push({
      id: facility.id,
      name: facility.name,
      level: 'facility',
      type: 'facility',
      displayName: facility.name,
      parentId: facility.districtId,
      parentName: district?.name,
      regionName: region?.name
    })
  })
  
  return locations
})

// Filter locations based on search and group by level
const searchResultsByLevel = computed(() => {
  if (!regionSearch.value || regionSearch.value.trim() === '') {
    return {}
  }
  
  const searchLower = regionSearch.value.toLowerCase().trim()
  const filtered = allLocations.value.filter(location => 
    location.name.toLowerCase().includes(searchLower) ||
    location.displayName.toLowerCase().includes(searchLower) ||
    (location.parentName && location.parentName.toLowerCase().includes(searchLower)) ||
    (location.regionName && location.regionName.toLowerCase().includes(searchLower))
  )
  
  // Group by level and sort
  const grouped = {
    'region': [],
    'district': [],
    'facility': []
  }
  
  filtered.forEach(location => {
    if (location.level === 'region') {
      grouped.region.push(location)
    } else if (location.level === 'district') {
      grouped.district.push(location)
    } else if (location.level === 'facility') {
      grouped.facility.push(location)
    }
  })
  
  // Sort each group
  grouped.region.sort((a, b) => a.name.localeCompare(b.name))
  grouped.district.sort((a, b) => a.name.localeCompare(b.name))
  grouped.facility.sort((a, b) => a.name.localeCompare(b.name))
  
  // Remove empty groups
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) {
      delete grouped[key]
    }
  })
  
  return grouped
})

// Toggle expand/collapse for hierarchical items
const toggleExpand = (id) => {
  expandedItems.value[id] = !expandedItems.value[id]
}

// Get level label for search results
const getLevelLabel = (level) => {
  const labels = {
    'region': 'State',
    'district': 'District',
    'facility': 'Sub-district'
  }
  return labels[level] || level
}

// Highlight search term in text
const highlightSearch = (text, searchTerm) => {
  if (!searchTerm) return text
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, '<em>$1</em>')
}

// Check if location is currently selected
const isSelected = (location) => {
  if (location.level === 'national') {
    return store.currentLevel === 'national' && (!store.currentId || store.currentId === 'NAT-001')
  }
  return store.currentLevel === location.level && store.currentId === location.id
}

// Handle location selection
const selectLocation = (location) => {
  // For national level, we can use null or 'NAT-001', but the API expects null
  const id = location.level === 'national' ? null : location.id
  store.setCurrentLevel(location.level, id)
  store.loadDashboardData(null, location.level, id)
  regionSearch.value = '' // Clear search after selection
  
  // Auto-expand parent items when selecting a child
  if (location.level === 'facility' && location.parentId) {
    expandedItems.value[location.parentId] = true
    // Also expand the region if it's a district's parent
    const district = districts.find(d => d.id === location.parentId)
    if (district && district.regionId) {
      expandedItems.value[district.regionId] = true
    }
  } else if (location.level === 'district' && location.parentId) {
    expandedItems.value[location.parentId] = true
  }
}

// Get display text for location with hierarchy
const getLocationDisplay = (location) => {
  if (location.level === 'national') {
    return location.name
  } else if (location.level === 'region') {
    return location.name
  } else if (location.level === 'district') {
    return `${location.name} (${location.parentName})`
  } else if (location.level === 'facility') {
    return `${location.name} (${location.parentName})`
  }
  return location.name
}

// Get current location display name
const currentLocationDisplay = computed(() => {
  if (store.currentLevel === 'national') {
    return national.name
  }
  const location = allLocations.value.find(l => 
    l.level === store.currentLevel && l.id === store.currentId
  )
  return location ? getLocationDisplay(location) : $t('nav.chooseRegion')
})

const selectedMonth = computed({
  get: () => store.selectedMonth,
  set: (value) => { store.setSelectedMonth(value) }
})

// Language selection
const selectedLanguage = computed({
  get: () => locale.value,
  set: (value) => { locale.value = value }
})

const onLanguageChange = () => {
  // Save to localStorage for persistence
  localStorage.setItem('preferred-language', selectedLanguage.value)
}

// Generate month options: current month + past 6 months
const generateMonthOptions = () => {
  const options = []
  const now = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()
    const value = `${month}-${year}`
    const label = `${month}-${year}`
    options.push({ value, label })
  }
  
  return options
}

const monthOptions = ref(generateMonthOptions())

const onMonthChange = () => {
  // Handle month change if needed (e.g., reload data)
  console.log('Selected month:', selectedMonth.value)
}

// Navigate to upload page
const navigateToUpload = () => {
  emit('navigate', 'upload')
}

// Navigate to dashboard
const navigateToDashboard = () => {
  emit('navigate', 'dashboard')
}

// Initialize expanded state based on current selection
const initializeExpandedState = () => {
  if (store.currentLevel === 'facility' && store.currentId) {
    const facility = facilities.find(f => f.id === store.currentId)
    if (facility) {
      expandedItems.value[facility.districtId] = true
      const district = districts.find(d => d.id === facility.districtId)
      if (district) {
        expandedItems.value[district.regionId] = true
      }
    }
  } else if (store.currentLevel === 'district' && store.currentId) {
    const district = districts.find(d => d.id === store.currentId)
    if (district) {
      expandedItems.value[district.regionId] = true
    }
  } else if (store.currentLevel === 'region' && store.currentId) {
    expandedItems.value[store.currentId] = true
  }
}

onMounted(() => {
  initializeExpandedState()
})
</script>