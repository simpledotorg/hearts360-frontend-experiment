import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchDashboardData } from '../services/api'

export const useDashboardStore = defineStore('dashboard', () => {
  // Loading and Error States
  const isLoading = ref(false)
  const error = ref(null)

  // Dashboard Configuration
  const regionName = ref('')
  const lastUpdated = ref(null)
  const activeDashboard = ref('hypertension') // 'hypertension' | 'diabetes' | 'overdue'
  const regionSearch = ref('')

  const dashboardLinks = ref([
    {
      name: 'Hypertension',
      href: '/dashboard/hypertension'
    }
  ])

  const activeDashboardLink = computed(() => {
    return dashboardLinks.value.find(link => link.name === activeDashboard.value)
  })
  
  // Overview Indicators
  const patientsProtected = ref({
    total: 0,
    label: 'patients',
    description: ''
  })

  const treatmentCascade = ref({
    estimatedHypertension: {
      count: 0,
      percentage: 0,
      label: 'Estimated people with hypertension'
    },
    cumulativeRegistered: {
      count: 0,
      percentage: 0,
      label: 'Cumulative registered patients'
    },
    patientsUnderCare: {
      count: 0,
      percentage: 0,
      label: 'Patients under care'
    },
    bpControlled: {
      count: 0,
      percentage: 0,
      label: 'Patients with BP controlled'
    }
  })

  // Program Management Indicators
  const treatmentOutcomes = ref({
    period: {
      start: '',
      end: '',
      label: ''
    },
    denominator: {
      count: 0,
      label: ''
    },
    bpControlled: {
      count: 0,
      percentage: 0,
      label: 'BP controlled at latest visit in past 3 months',
      description: ''
    },
    bpUncontrolled: {
      count: 0,
      percentage: 0,
      label: 'BP not controlled at latest visit in past 3 months',
      description: ''
    },
    noVisit3Months: {
      count: 0,
      percentage: 0,
      label: 'No visit in past 3 months',
      description: ''
    }
  })

  const patientsUnderCare = ref({
    total: 0,
    monthlyRegistered: {
      count: 0,
      month: '',
      label: ''
    },
    cumulativeRegistered: {
      count: 0,
      label: ''
    }
  })

  const lostToFollowUp12Months = ref({
    percentage: 0,
    count: 0,
    period: {
      start: '',
      end: '',
      label: ''
    },
    denominator: {
      count: 0,
      label: ''
    }
  })

  const opportunisticScreening = ref({
    percentage: 0,
    count: 0,
    month: '',
    label: '',
    denominator: {
      count: 0,
      label: ''
    }
  })

  // Sub-regions Comparison Data
  const subRegions = ref([])

  // Cohort Reports
  const cohorts = ref([])

  // Overdue Patients
  const overduePatients = ref({
    percentage: 0,
    count: 0,
    month: '',
    label: '',
    denominator: {
      count: 0,
      label: ''
    },
    excluded: {
      removedFromList: 0,
      noPhoneNumber: 0
    }
  })

  const overduePatientsCalled = ref({
    percentage: 0,
    count: 0,
    month: '',
    label: '',
    denominator: {
      count: 0,
      label: ''
    }
  })

  const overduePatientsReturned = ref({
    percentage: 0,
    count: 0,
    month: '',
    label: '',
    denominator: {
      count: 0,
      label: ''
    },
    returnWindow: 15 // days
  })

  // Chart Data References (will be populated from charts.js)
  const chartData = ref({
    patientsProtected: null,
    bpControlled: null,
    bpUncontrolled: null,
    ltfu3Month: null,
    registrations: null,
    ltfu12Months: null,
    screenings: null,
    overdue: null,
    overdueCalled: null,
    overdueReturned: null,
    drugStock: null
  })

  // Computed Properties
  const formattedLastUpdated = computed(() => {
    if (!lastUpdated.value) return ''
    return lastUpdated.value.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  })

  const totalPatientsUnderCare = computed(() => {
    return subRegions.value.reduce((sum, region) => sum + region.patientsUnderCare, 0)
  })

  const averageBpControlled = computed(() => {
    const total = subRegions.value.reduce((sum, region) => sum + region.bpControlled.percentage, 0)
    return Math.round(total / subRegions.value.length)
  })

  // Actions
  function setRegionName(name) {
    regionName.value = name
  }

  function setLastUpdated(date) {
    lastUpdated.value = new Date(date)
  }

  function setActiveDashboard(dashboard) {
    activeDashboard.value = dashboard
  }

  function setRegionSearch(search) {
    regionSearch.value = search
  }

  function updateChartData(chartKey, data) {
    if (chartData.value.hasOwnProperty(chartKey)) {
      chartData.value[chartKey] = data
    }
  }

  function updateTreatmentOutcomes(outcomes) {
    treatmentOutcomes.value = { ...treatmentOutcomes.value, ...outcomes }
  }

  function updatePatientsProtected(data) {
    patientsProtected.value = { ...patientsProtected.value, ...data }
  }

  function addSubRegion(region) {
    subRegions.value.push(region)
  }

  function updateSubRegion(index, updates) {
    if (subRegions.value[index]) {
      subRegions.value[index] = { ...subRegions.value[index], ...updates }
    }
  }

  function removeSubRegion(index) {
    if (subRegions.value[index]) {
      subRegions.value.splice(index, 1)
    }
  }

  function addCohort(cohort) {
    cohorts.value.push(cohort)
  }

  function updateCohort(index, updates) {
    if (cohorts.value[index]) {
      cohorts.value[index] = { ...cohorts.value[index], ...updates }
    }
  }

  function removeCohort(index) {
    if (cohorts.value[index]) {
      cohorts.value.splice(index, 1)
    }
  }

  /**
   * Fetch dashboard data from API
   * @param {string} region - Optional region filter
   */
  async function loadDashboardData(region = null) {
    isLoading.value = true
    error.value = null

    try {
      const data = await fetchDashboardData(region)
      
      // Update all store values with API data
      regionName.value = data.regionName
      lastUpdated.value = new Date(data.lastUpdated)
      activeDashboard.value = data.activeDashboard
      
      patientsProtected.value = data.patientsProtected
      treatmentCascade.value = data.treatmentCascade
      treatmentOutcomes.value = data.treatmentOutcomes
      patientsUnderCare.value = data.patientsUnderCare
      lostToFollowUp12Months.value = data.lostToFollowUp12Months
      opportunisticScreening.value = data.opportunisticScreening
      subRegions.value = data.subRegions
      cohorts.value = data.cohorts
      overduePatients.value = data.overduePatients
      overduePatientsCalled.value = data.overduePatientsCalled
      overduePatientsReturned.value = data.overduePatientsReturned
    } catch (err) {
      error.value = err.message || 'Failed to load dashboard data'
      console.error('Error loading dashboard data:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Refresh dashboard data
   */
  async function refreshDashboardData() {
    await loadDashboardData(regionSearch.value)
  }

  function resetStore() {
    regionName.value = ''
    lastUpdated.value = null
    activeDashboard.value = 'hypertension'
    regionSearch.value = ''
    isLoading.value = false
    error.value = null
    
    // Reset all data to empty/default values
    patientsProtected.value = {
      total: 0,
      label: 'patients',
      description: ''
    }
    treatmentCascade.value = {
      estimatedHypertension: { count: 0, percentage: 0, label: '' },
      cumulativeRegistered: { count: 0, percentage: 0, label: '' },
      patientsUnderCare: { count: 0, percentage: 0, label: '' },
      bpControlled: { count: 0, percentage: 0, label: '' }
    }
    treatmentOutcomes.value = {
      period: { start: '', end: '', label: '' },
      denominator: { count: 0, label: '' },
      bpControlled: { count: 0, percentage: 0, label: '', description: '' },
      bpUncontrolled: { count: 0, percentage: 0, label: '', description: '' },
      noVisit3Months: { count: 0, percentage: 0, label: '', description: '' }
    }
    patientsUnderCare.value = {
      total: 0,
      monthlyRegistered: { count: 0, month: '', label: '' },
      cumulativeRegistered: { count: 0, label: '' }
    }
    lostToFollowUp12Months.value = {
      percentage: 0,
      count: 0,
      period: { start: '', end: '', label: '' },
      denominator: { count: 0, label: '' }
    }
    opportunisticScreening.value = {
      percentage: 0,
      count: 0,
      month: '',
      label: '',
      denominator: { count: 0, label: '' }
    }
    subRegions.value = []
    cohorts.value = []
    overduePatients.value = {
      percentage: 0,
      count: 0,
      month: '',
      label: '',
      denominator: { count: 0, label: '' },
      excluded: { removedFromList: 0, noPhoneNumber: 0 }
    }
    overduePatientsCalled.value = {
      percentage: 0,
      count: 0,
      month: '',
      label: '',
      denominator: { count: 0, label: '' }
    }
    overduePatientsReturned.value = {
      percentage: 0,
      count: 0,
      month: '',
      label: '',
      denominator: { count: 0, label: '' },
      returnWindow: 15
    }
  }

  return {
    // State
    isLoading,
    error,
    regionName,
    lastUpdated,
    activeDashboard,
    regionSearch,
    patientsProtected,
    treatmentCascade,
    treatmentOutcomes,
    patientsUnderCare,
    lostToFollowUp12Months,
    opportunisticScreening,
    subRegions,
    cohorts,
    overduePatients,
    overduePatientsCalled,
    overduePatientsReturned,
    chartData,
    // Computed
    formattedLastUpdated,
    totalPatientsUnderCare,
    averageBpControlled,
    // Actions
    loadDashboardData,
    refreshDashboardData,
    setRegionName,
    setLastUpdated,
    setActiveDashboard, 
    setRegionSearch,
    updateChartData,
    updateTreatmentOutcomes,
    updatePatientsProtected,
    addSubRegion,
    updateSubRegion,
    removeSubRegion,
    addCohort,
    updateCohort,
    removeCohort,
    resetStore
  }
})

