/**
 * Fake API service for HEARTS360 Dashboard
 * Simulates API calls with delays to mimic real network requests
 */

// Simulate network delay
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Fetch dashboard data from fake API
 * @param {string} region - Optional region filter
 * @returns {Promise<Object>} Dashboard data
 */
export async function fetchDashboardData(region = null) {
  await delay(800) // Simulate network delay

  // Return mock data that matches the store structure
  return {
    regionName: 'River District',
    lastUpdated: new Date().toISOString(),
    activeDashboard: 'hypertension',
    
    patientsProtected: {
      total: 4808,
      label: 'patients',
      description: 'in River District with BP <140/90'
    },

    treatmentCascade: {
      estimatedHypertension: {
        count: 250800,
        percentage: 100,
        label: 'Estimated people with hypertension'
      },
      cumulativeRegistered: {
        count: 12213,
        percentage: 5,
        label: 'Cumulative registered patients'
      },
      patientsUnderCare: {
        count: 10632,
        percentage: 4,
        label: 'Patients under care'
      },
      bpControlled: {
        count: 4808,
        percentage: 2,
        label: 'Patients with BP controlled'
      }
    },

    treatmentOutcomes: {
      period: {
        start: '2024-05-01',
        end: '2024-07-31',
        label: '1-May-2024 to 31-Jul-2024'
      },
      denominator: {
        count: 7882,
        label: 'patients under care (registered before 1-May-2024)'
      },
      bpControlled: {
        count: 4808,
        percentage: 61,
        label: 'BP controlled at latest visit in past 3 months',
        description: '4,808 patients with BP <140/90'
      },
      bpUncontrolled: {
        count: 1340,
        percentage: 17,
        label: 'BP not controlled at latest visit in past 3 months',
        description: '1,340 patients with BP ≥140/90'
      },
      noVisit3Months: {
        count: 1734,
        percentage: 22,
        label: 'No visit in past 3 months',
        description: '1,734 patients with no visit'
      }
    },

    patientsUnderCare: {
      total: 10632,
      monthlyRegistered: {
        count: 1043,
        month: 'Jul-2024',
        label: 'patients registered in Jul-2024'
      },
      cumulativeRegistered: {
        count: 12213,
        label: '12,213 cumulative registered patients'
      }
    },

    lostToFollowUp12Months: {
      percentage: 10,
      count: 1562,
      period: {
        start: 'Aug-2023',
        end: 'Jul-2024',
        label: 'from Aug-2023 to Jul-2024'
      },
      denominator: {
        count: 12213,
        label: '12,213 cumulative registered patients'
      }
    },

    opportunisticScreening: {
      percentage: 23,
      count: 6900,
      month: 'Jul-2024',
      label: 'individuals screened for hypertension in Jul-2024',
      denominator: {
        count: 30000,
        label: '~30,000 estimated OPD patients >18 years'
      }
    },

    subRegions: [
      {
        name: 'River District',
        patientsUnderCare: 10539,
        monthlyNewPatients: 1043,
        bpControlled: {
          count: 4808,
          percentage: 61
        },
        bpUncontrolled: {
          count: 1340,
          percentage: 17
        },
        noVisit3Months: {
          count: 1734,
          percentage: 22
        }
      },
      {
        name: 'Cherry Blossom County',
        patientsUnderCare: 1100,
        monthlyNewPatients: 139,
        bpControlled: {
          count: 450,
          percentage: 50
        },
        bpUncontrolled: {
          count: 145,
          percentage: 16
        },
        noVisit3Months: {
          count: 212,
          percentage: 34
        }
      },
      {
        name: 'Fern Grove County',
        patientsUnderCare: 505,
        monthlyNewPatients: 106,
        bpControlled: {
          count: 245,
          percentage: 84
        },
        bpUncontrolled: {
          count: 12,
          percentage: 4
        },
        noVisit3Months: {
          count: 56,
          percentage: 12
        }
      }
    ],

    cohorts: [
      {
        quarter: 'Q2-2023',
        patientCount: 892,
        resultQuarter: 'Q3-2023',
        outcomes: {
          bpControlled: 60,
          bpUncontrolled: 19,
          noVisit: 21
        }
      },
      {
        quarter: 'Q3-2023',
        patientCount: 1315,
        resultQuarter: 'Q4-2023',
        outcomes: {
          bpControlled: 68,
          bpUncontrolled: 16,
          noVisit: 22
        }
      },
      {
        quarter: 'Q4-2023',
        patientCount: 941,
        resultQuarter: 'Q1-2024',
        outcomes: {
          bpControlled: 76,
          bpUncontrolled: 10,
          noVisit: 14
        }
      },
      {
        quarter: 'Q1-2024',
        patientCount: 1281,
        resultQuarter: 'Q2-2024',
        outcomes: {
          bpControlled: 80,
          bpUncontrolled: 12,
          noVisit: 8
        }
      }
    ],

    overduePatients: {
      percentage: 26,
      count: 2800,
      month: 'Jul-2024',
      label: 'patients were overdue at the start of Jul-2024',
      denominator: {
        count: 10800,
        label: '10,800 patients under care'
      },
      excluded: {
        removedFromList: 647,
        noPhoneNumber: 241
      }
    },

    overduePatientsCalled: {
      percentage: 42,
      count: 1176,
      month: 'Jul-2024',
      label: 'patients called in Jul-2024',
      denominator: {
        count: 2800,
        label: '2,800 overdue patients'
      }
    },

    overduePatientsReturned: {
      percentage: 35,
      count: 411,
      month: 'Jul-2024',
      label: 'patients returned to care in Jul-2024',
      denominator: {
        count: 1176,
        label: '1,176 overdue patients called'
      },
      returnWindow: 15
    }
  }
}

/**
 * Fetch chart data from fake API
 * @param {string} chartType - Type of chart data to fetch
 * @returns {Promise<Object>} Chart data
 */
export async function fetchChartData(chartType) {
  await delay(500) // Simulate network delay
  
  // In a real app, this would return chart-specific data
  // For now, we'll return null as charts are handled by charts.js
  return null
}

/**
 * Update dashboard data (simulate PUT/PATCH request)
 * @param {Object} updates - Data to update
 * @returns {Promise<Object>} Updated data
 */
export async function updateDashboardData(updates) {
  await delay(600)
  
  // In a real app, this would send updates to the server
  return {
    success: true,
    message: 'Dashboard data updated successfully',
    data: updates
  }
}

