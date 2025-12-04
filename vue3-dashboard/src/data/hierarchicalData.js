/**
 * Hierarchical data for HEARTS360 Dashboard
 * Structure: National -> Regions -> Districts -> Facilities
 * Data flows up: Facilities sum to Districts, Districts sum to Regions, Regions sum to National
 */

// Helper function to calculate percentage
const calcPercentage = (numerator, denominator) => {
  return denominator > 0 ? Math.round((numerator / denominator) * 100) : 0
}

// Helper function to aggregate arrays of numbers
const sum = (arr) => arr.reduce((a, b) => a + b, 0)

// Generate facility-level data (8 facilities)
// Each facility has treatmentOutcomesDenominator = ~74% of patientsUnderCare (registered before period start)
const facilities = [
  {
    id: 'FAC-001',
    name: 'Central Health Clinic',
    districtId: 'DIST-001',
    patientsUnderCare: 1250,
    monthlyNewPatients: 95,
    cumulativeRegistered: 1450,
    estimatedHypertension: 12500,
    bpControlled: 750,
    bpUncontrolled: 200,
    noVisit3Months: 300,
    lostToFollowUp12Months: 145,
    opportunisticScreening: 2800,
    estimatedOPDPatients: 12000,
    overduePatients: 325,
    overduePatientsCalled: 136,
    overduePatientsReturned: 48,
    treatmentOutcomesDenominator: 925
  },
  {
    id: 'FAC-002',
    name: 'Riverside Medical Center',
    districtId: 'DIST-001',
    patientsUnderCare: 980,
    monthlyNewPatients: 78,
    cumulativeRegistered: 1120,
    estimatedHypertension: 9800,
    bpControlled: 588,
    bpUncontrolled: 157,
    noVisit3Months: 235,
    lostToFollowUp12Months: 112,
    opportunisticScreening: 2200,
    estimatedOPDPatients: 9500,
    overduePatients: 255,
    overduePatientsCalled: 107,
    overduePatientsReturned: 37,
    treatmentOutcomesDenominator: 725
  },
  {
    id: 'FAC-003',
    name: 'Mountain View Hospital',
    districtId: 'DIST-002',
    patientsUnderCare: 1650,
    monthlyNewPatients: 125,
    cumulativeRegistered: 1890,
    estimatedHypertension: 16500,
    bpControlled: 990,
    bpUncontrolled: 264,
    noVisit3Months: 396,
    lostToFollowUp12Months: 189,
    opportunisticScreening: 3700,
    estimatedOPDPatients: 16000,
    overduePatients: 429,
    overduePatientsCalled: 180,
    overduePatientsReturned: 63,
    treatmentOutcomesDenominator: 1221
  },
  {
    id: 'FAC-004',
    name: 'Sunset Community Health',
    districtId: 'DIST-002',
    patientsUnderCare: 1120,
    monthlyNewPatients: 88,
    cumulativeRegistered: 1280,
    estimatedHypertension: 11200,
    bpControlled: 672,
    bpUncontrolled: 179,
    noVisit3Months: 269,
    lostToFollowUp12Months: 128,
    opportunisticScreening: 2500,
    estimatedOPDPatients: 10800,
    overduePatients: 291,
    overduePatientsCalled: 122,
    overduePatientsReturned: 43,
    treatmentOutcomesDenominator: 829
  },
  {
    id: 'FAC-005',
    name: 'Green Valley Clinic',
    districtId: 'DIST-003',
    patientsUnderCare: 890,
    monthlyNewPatients: 68,
    cumulativeRegistered: 1020,
    estimatedHypertension: 8900,
    bpControlled: 534,
    bpUncontrolled: 142,
    noVisit3Months: 214,
    lostToFollowUp12Months: 102,
    opportunisticScreening: 2000,
    estimatedOPDPatients: 8700,
    overduePatients: 231,
    overduePatientsCalled: 97,
    overduePatientsReturned: 34,
    treatmentOutcomesDenominator: 659
  },
  {
    id: 'FAC-006',
    name: 'Coastal Medical Center',
    districtId: 'DIST-003',
    patientsUnderCare: 1340,
    monthlyNewPatients: 102,
    cumulativeRegistered: 1540,
    estimatedHypertension: 13400,
    bpControlled: 804,
    bpUncontrolled: 214,
    noVisit3Months: 322,
    lostToFollowUp12Months: 154,
    opportunisticScreening: 3000,
    estimatedOPDPatients: 13000,
    overduePatients: 348,
    overduePatientsCalled: 146,
    overduePatientsReturned: 51,
    treatmentOutcomesDenominator: 992
  },
  {
    id: 'FAC-007',
    name: 'Highland Health Facility',
    districtId: 'DIST-004',
    patientsUnderCare: 1050,
    monthlyNewPatients: 82,
    cumulativeRegistered: 1200,
    estimatedHypertension: 10500,
    bpControlled: 630,
    bpUncontrolled: 168,
    noVisit3Months: 252,
    lostToFollowUp12Months: 120,
    opportunisticScreening: 2350,
    estimatedOPDPatients: 10200,
    overduePatients: 273,
    overduePatientsCalled: 115,
    overduePatientsReturned: 40,
    treatmentOutcomesDenominator: 777
  },
  {
    id: 'FAC-008',
    name: 'Lakeside Community Hospital',
    districtId: 'DIST-005',
    patientsUnderCare: 1520,
    monthlyNewPatients: 115,
    cumulativeRegistered: 1740,
    estimatedHypertension: 15200,
    bpControlled: 912,
    bpUncontrolled: 243,
    noVisit3Months: 365,
    lostToFollowUp12Months: 174,
    opportunisticScreening: 3400,
    estimatedOPDPatients: 14700,
    overduePatients: 395,
    overduePatientsCalled: 166,
    overduePatientsReturned: 58,
    treatmentOutcomesDenominator: 1125
  }
]

// Aggregate facilities into districts (5 districts)
const districts = [
  {
    id: 'DIST-001',
    name: 'River District',
    regionId: 'REG-001',
    facilities: facilities.filter(f => f.districtId === 'DIST-001')
  },
  {
    id: 'DIST-002',
    name: 'Mountain District',
    regionId: 'REG-001',
    facilities: facilities.filter(f => f.districtId === 'DIST-002')
  },
  {
    id: 'DIST-003',
    name: 'Coastal District',
    regionId: 'REG-002',
    facilities: facilities.filter(f => f.districtId === 'DIST-003')
  },
  {
    id: 'DIST-004',
    name: 'Highland District',
    regionId: 'REG-002',
    facilities: facilities.filter(f => f.districtId === 'DIST-004')
  },
  {
    id: 'DIST-005',
    name: 'Lakeside District',
    regionId: 'REG-002',
    facilities: facilities.filter(f => f.districtId === 'DIST-005')
  }
].map(district => {
  const facs = district.facilities
  const patientsUnderCare = sum(facs.map(f => f.patientsUnderCare))
  const monthlyNewPatients = sum(facs.map(f => f.monthlyNewPatients))
  const cumulativeRegistered = sum(facs.map(f => f.cumulativeRegistered))
  const estimatedHypertension = sum(facs.map(f => f.estimatedHypertension))
  const bpControlled = sum(facs.map(f => f.bpControlled))
  const bpUncontrolled = sum(facs.map(f => f.bpUncontrolled))
  const noVisit3Months = sum(facs.map(f => f.noVisit3Months))
  const lostToFollowUp12Months = sum(facs.map(f => f.lostToFollowUp12Months))
  const opportunisticScreening = sum(facs.map(f => f.opportunisticScreening))
  const estimatedOPDPatients = sum(facs.map(f => f.estimatedOPDPatients))
  const overduePatients = sum(facs.map(f => f.overduePatients))
  const overduePatientsCalled = sum(facs.map(f => f.overduePatientsCalled))
  const overduePatientsReturned = sum(facs.map(f => f.overduePatientsReturned))
  
  // Sum treatment outcomes denominator from facilities
  const treatmentOutcomesDenominator = sum(facs.map(f => f.treatmentOutcomesDenominator))
  
  return {
    ...district,
    patientsUnderCare,
    monthlyNewPatients,
    cumulativeRegistered,
    estimatedHypertension,
    bpControlled,
    bpUncontrolled,
    noVisit3Months,
    lostToFollowUp12Months,
    opportunisticScreening,
    estimatedOPDPatients,
    overduePatients,
    overduePatientsCalled,
    overduePatientsReturned,
    treatmentOutcomesDenominator
  }
})

// Aggregate districts into regions (2 regions)
const regions = [
  {
    id: 'REG-001',
    name: 'Northern Region',
    districts: districts.filter(d => d.regionId === 'REG-001')
  },
  {
    id: 'REG-002',
    name: 'Southern Region',
    districts: districts.filter(d => d.regionId === 'REG-002')
  }
].map(region => {
  const dists = region.districts
  const patientsUnderCare = sum(dists.map(d => d.patientsUnderCare))
  const monthlyNewPatients = sum(dists.map(d => d.monthlyNewPatients))
  const cumulativeRegistered = sum(dists.map(d => d.cumulativeRegistered))
  const estimatedHypertension = sum(dists.map(d => d.estimatedHypertension))
  const bpControlled = sum(dists.map(d => d.bpControlled))
  const bpUncontrolled = sum(dists.map(d => d.bpUncontrolled))
  const noVisit3Months = sum(dists.map(d => d.noVisit3Months))
  const lostToFollowUp12Months = sum(dists.map(d => d.lostToFollowUp12Months))
  const opportunisticScreening = sum(dists.map(d => d.opportunisticScreening))
  const estimatedOPDPatients = sum(dists.map(d => d.estimatedOPDPatients))
  const overduePatients = sum(dists.map(d => d.overduePatients))
  const overduePatientsCalled = sum(dists.map(d => d.overduePatientsCalled))
  const overduePatientsReturned = sum(dists.map(d => d.overduePatientsReturned))
  const treatmentOutcomesDenominator = sum(dists.map(d => d.treatmentOutcomesDenominator))
  
  return {
    ...region,
    patientsUnderCare,
    monthlyNewPatients,
    cumulativeRegistered,
    estimatedHypertension,
    bpControlled,
    bpUncontrolled,
    noVisit3Months,
    lostToFollowUp12Months,
    opportunisticScreening,
    estimatedOPDPatients,
    overduePatients,
    overduePatientsCalled,
    overduePatientsReturned,
    treatmentOutcomesDenominator
  }
})

// Aggregate regions into national level
const national = {
  id: 'NAT-001',
  name: 'National',
  regions: regions,
  patientsUnderCare: sum(regions.map(r => r.patientsUnderCare)),
  monthlyNewPatients: sum(regions.map(r => r.monthlyNewPatients)),
  cumulativeRegistered: sum(regions.map(r => r.cumulativeRegistered)),
  estimatedHypertension: sum(regions.map(r => r.estimatedHypertension)),
  bpControlled: sum(regions.map(r => r.bpControlled)),
  bpUncontrolled: sum(regions.map(r => r.bpUncontrolled)),
  noVisit3Months: sum(regions.map(r => r.noVisit3Months)),
  lostToFollowUp12Months: sum(regions.map(r => r.lostToFollowUp12Months)),
  opportunisticScreening: sum(regions.map(r => r.opportunisticScreening)),
  estimatedOPDPatients: sum(regions.map(r => r.estimatedOPDPatients)),
  overduePatients: sum(regions.map(r => r.overduePatients)),
  overduePatientsCalled: sum(regions.map(r => r.overduePatientsCalled)),
  overduePatientsReturned: sum(regions.map(r => r.overduePatientsReturned)),
  treatmentOutcomesDenominator: sum(regions.map(r => r.treatmentOutcomesDenominator))
}

/**
 * Transform hierarchical data to dashboard format
 * @param {Object} levelData - Data for a specific level (national, region, or district)
 * @param {string} levelName - Name of the level
 * @param {Array} subLevels - Array of sub-levels (regions for national, districts for region, facilities for district)
 * @returns {Object} Dashboard data in the expected format
 */
function transformToDashboardFormat(levelData, levelName, subLevels = []) {
  const period = {
    start: '2024-05-01',
    end: '2024-07-31',
    label: '1-May-2024 to 31-Jul-2024'
  }
  
  const bpControlledPercentage = calcPercentage(
    levelData.bpControlled,
    levelData.treatmentOutcomesDenominator
  )
  
  const bpUncontrolledPercentage = calcPercentage(
    levelData.bpUncontrolled,
    levelData.treatmentOutcomesDenominator
  )
  
  const noVisit3MonthsPercentage = calcPercentage(
    levelData.noVisit3Months,
    levelData.treatmentOutcomesDenominator
  )
  
  const lostToFollowUpPercentage = calcPercentage(
    levelData.lostToFollowUp12Months,
    levelData.cumulativeRegistered
  )
  
  const opportunisticScreeningPercentage = calcPercentage(
    levelData.opportunisticScreening,
    levelData.estimatedOPDPatients
  )
  
  const overduePercentage = calcPercentage(
    levelData.overduePatients,
    levelData.patientsUnderCare
  )
  
  const overdueCalledPercentage = calcPercentage(
    levelData.overduePatientsCalled,
    levelData.overduePatients
  )
  
  const overdueReturnedPercentage = calcPercentage(
    levelData.overduePatientsReturned,
    levelData.overduePatientsCalled
  )
  
  // Transform sub-levels to subRegions format
  const subRegionsData = subLevels.map(sub => ({
    name: sub.name,
    patientsUnderCare: sub.patientsUnderCare,
    monthlyNewPatients: sub.monthlyNewPatients || sub.monthlyNewPatients,
    bpControlled: {
      count: sub.bpControlled,
      percentage: calcPercentage(sub.bpControlled, sub.treatmentOutcomesDenominator || sub.patientsUnderCare)
    },
    bpUncontrolled: {
      count: sub.bpUncontrolled,
      percentage: calcPercentage(sub.bpUncontrolled, sub.treatmentOutcomesDenominator || sub.patientsUnderCare)
    },
    noVisit3Months: {
      count: sub.noVisit3Months,
      percentage: calcPercentage(sub.noVisit3Months, sub.treatmentOutcomesDenominator || sub.patientsUnderCare)
    }
  }))
  
  return {
    regionName: levelName,
    lastUpdated: new Date().toISOString(),
    activeDashboard: 'hypertension',
    
    patientsProtected: {
      total: levelData.bpControlled,
      label: 'patients',
      description: `in ${levelName} with BP <140/90`
    },
    
    treatmentCascade: {
      estimatedHypertension: {
        count: levelData.estimatedHypertension,
        percentage: 100,
        label: 'Estimated people with hypertension'
      },
      cumulativeRegistered: {
        count: levelData.cumulativeRegistered,
        percentage: calcPercentage(levelData.cumulativeRegistered, levelData.estimatedHypertension),
        label: 'Cumulative registered patients'
      },
      patientsUnderCare: {
        count: levelData.patientsUnderCare,
        percentage: calcPercentage(levelData.patientsUnderCare, levelData.estimatedHypertension),
        label: 'Patients under care'
      },
      bpControlled: {
        count: levelData.bpControlled,
        percentage: calcPercentage(levelData.bpControlled, levelData.estimatedHypertension),
        label: 'Patients with BP controlled'
      }
    },
    
    treatmentOutcomes: {
      period: period,
      denominator: {
        count: levelData.treatmentOutcomesDenominator,
        label: `patients under care (registered before ${period.start})`
      },
      bpControlled: {
        count: levelData.bpControlled,
        percentage: bpControlledPercentage,
        label: 'BP controlled at latest visit in past 3 months',
        description: `${levelData.bpControlled.toLocaleString()} patients with BP <140/90`
      },
      bpUncontrolled: {
        count: levelData.bpUncontrolled,
        percentage: bpUncontrolledPercentage,
        label: 'BP not controlled at latest visit in past 3 months',
        description: `${levelData.bpUncontrolled.toLocaleString()} patients with BP ≥140/90`
      },
      noVisit3Months: {
        count: levelData.noVisit3Months,
        percentage: noVisit3MonthsPercentage,
        label: 'No visit in past 3 months',
        description: `${levelData.noVisit3Months.toLocaleString()} patients with no visit`
      }
    },
    
    patientsUnderCare: {
      total: levelData.patientsUnderCare,
      monthlyRegistered: {
        count: levelData.monthlyNewPatients,
        month: 'Jul-2024',
        label: 'patients registered in Jul-2024'
      },
      cumulativeRegistered: {
        count: levelData.cumulativeRegistered,
        label: `${levelData.cumulativeRegistered.toLocaleString()} cumulative registered patients`
      }
    },
    
    lostToFollowUp12Months: {
      percentage: lostToFollowUpPercentage,
      count: levelData.lostToFollowUp12Months,
      period: {
        start: 'Aug-2023',
        end: 'Jul-2024',
        label: 'from Aug-2023 to Jul-2024'
      },
      denominator: {
        count: levelData.cumulativeRegistered,
        label: `${levelData.cumulativeRegistered.toLocaleString()} cumulative registered patients`
      }
    },
    
    opportunisticScreening: {
      percentage: opportunisticScreeningPercentage,
      count: levelData.opportunisticScreening,
      month: 'Jul-2024',
      label: 'individuals screened for hypertension in Jul-2024',
      denominator: {
        count: levelData.estimatedOPDPatients,
        label: `~${levelData.estimatedOPDPatients.toLocaleString()} estimated OPD patients >18 years`
      }
    },
    
    subRegions: subRegionsData,
    
    cohorts: [
      {
        quarter: 'Q2-2023',
        patientCount: Math.floor(levelData.cumulativeRegistered * 0.07),
        resultQuarter: 'Q3-2023',
        outcomes: {
          bpControlled: 60,
          bpUncontrolled: 19,
          noVisit: 21
        }
      },
      {
        quarter: 'Q3-2023',
        patientCount: Math.floor(levelData.cumulativeRegistered * 0.11),
        resultQuarter: 'Q4-2023',
        outcomes: {
          bpControlled: 68,
          bpUncontrolled: 16,
          noVisit: 22
        }
      },
      {
        quarter: 'Q4-2023',
        patientCount: Math.floor(levelData.cumulativeRegistered * 0.08),
        resultQuarter: 'Q1-2024',
        outcomes: {
          bpControlled: 76,
          bpUncontrolled: 10,
          noVisit: 14
        }
      },
      {
        quarter: 'Q1-2024',
        patientCount: Math.floor(levelData.cumulativeRegistered * 0.10),
        resultQuarter: 'Q2-2024',
        outcomes: {
          bpControlled: 80,
          bpUncontrolled: 12,
          noVisit: 8
        }
      }
    ],
    
    overduePatients: {
      percentage: overduePercentage,
      count: levelData.overduePatients,
      month: 'Jul-2024',
      label: 'patients were overdue at the start of Jul-2024',
      denominator: {
        count: levelData.patientsUnderCare,
        label: `${levelData.patientsUnderCare.toLocaleString()} patients under care`
      },
      excluded: {
        removedFromList: Math.floor(levelData.overduePatients * 0.23),
        noPhoneNumber: Math.floor(levelData.overduePatients * 0.09)
      }
    },
    
    overduePatientsCalled: {
      percentage: overdueCalledPercentage,
      count: levelData.overduePatientsCalled,
      month: 'Jul-2024',
      label: 'patients called in Jul-2024',
      denominator: {
        count: levelData.overduePatients,
        label: `${levelData.overduePatients.toLocaleString()} overdue patients`
      }
    },
    
    overduePatientsReturned: {
      percentage: overdueReturnedPercentage,
      count: levelData.overduePatientsReturned,
      month: 'Jul-2024',
      label: 'patients returned to care in Jul-2024',
      denominator: {
        count: levelData.overduePatientsCalled,
        label: `${levelData.overduePatientsCalled.toLocaleString()} overdue patients called`
      },
      returnWindow: 15
    }
  }
}

// Export hierarchical data structure
export const hierarchicalData = {
  national,
  regions,
  districts,
  facilities
}

// Export function to get data for a specific level
export function getDashboardData(level = 'national', id = null) {
  let levelData, levelName, subLevels
  
  switch (level) {
    case 'national':
      levelData = national
      levelName = national.name
      subLevels = regions
      break
    case 'region':
      const region = id ? regions.find(r => r.id === id) : regions[0]
      if (!region) throw new Error(`Region ${id} not found`)
      levelData = region
      levelName = region.name
      subLevels = districts.filter(d => d.regionId === region.id)
      break
    case 'district':
      const district = id ? districts.find(d => d.id === id) : districts[0]
      if (!district) throw new Error(`District ${id} not found`)
      levelData = district
      levelName = district.name
      subLevels = facilities.filter(f => f.districtId === district.id)
      break
    case 'facility':
      const facility = id ? facilities.find(f => f.id === id) : facilities[0]
      if (!facility) throw new Error(`Facility ${id} not found`)
      levelData = facility
      levelName = facility.name
      subLevels = []
      break
    default:
      levelData = national
      levelName = national.name
      subLevels = regions
  }
  
  return transformToDashboardFormat(levelData, levelName, subLevels)
}

// Export for direct access
export { national, regions, districts, facilities }

