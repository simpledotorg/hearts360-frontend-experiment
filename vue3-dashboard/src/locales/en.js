export default {
  // Navigation
  nav: {
    chooseRegion: 'Choose region or facility...',
    searchPlaceholder: 'Search regions or facilities...',
    national: 'National',
    appleState: 'Apple State',
    hearts360: 'HEARTS',
    uploadData: 'Upload data',
    hypertensionDashboard: 'Hypertension dashboard',
    diabetesDashboard: 'Diabetes dashboard',
    overduePatientsList: 'Overdue patients list',
    selectLanguage: 'Select language',
    language: 'Language',
    english: 'English',
    indonesian: 'Indonesian'
  },

  // Common
  common: {
    loading: 'Loading dashboard data...',
    error: 'Error',
    retry: 'Retry',
    dataLastUpdated: 'Data last updated',
    scrollTable: 'scroll table →',
    of: 'of',
    patients: 'patients',
    total: 'Total',
    percent: 'Percent',
    subRegions: 'Sub-regions',
    numerator: 'Numerator',
    denominator: 'Denominator'
  },

  // Sections
  sections: {
    overviewIndicators: '1. Overview indicators',
    programManagementIndicators: '2. Program management indicators',
    overduePatients: '3. Overdue patients'
  },

  // Overview Indicators
  overview: {
    patientsProtected: {
      title: 'Patients protected from heart attacks and strokes with world-class treatment',
      inRegion: 'in {region} with BP <140/90'
    },
    treatmentCascade: {
      title: 'Hypertension treatment cascade',
      description: 'Estimated adults (>30) in River District with hypertension who are registered, under care, and controlled.',
      estimatedPopulation: {
        label: 'Estimated people with hypertension',
        tooltip: 'Estimated population with hypertension is derived from a STEPS Community Survey conducted in 2022.'
      },
      cumulativeRegistered: {
        label: 'Cumulative registered patients',
        tooltip: 'Patients under care are patients with hypertension with at least 1 visit in the past 12 months.'
      },
      patientsUnderCare: {
        label: 'Patients under care'
      },
      bpControlled: {
        label: 'Patients with BP controlled'
      }
    }
  },

  // Program Management Indicators
  programManagement: {
    treatmentOutcomes: {
      title: 'Hypertension treatment outcomes',
      description: 'Outcomes for {count} patients under care (registered before {startDate}) between {startDate} to {endDate}',
      bpControlled: {
        label: 'BP controlled at latest visit in past 3 months',
        patientsWithBP: '{count} patients with BP <140/90',
        tooltipNumerator: 'Numerator for BP controlled: Patients with BP <140 AND <90 at their latest visit in the past 3 months.'
      },
      bpUncontrolled: {
        label: 'BP not controlled at latest visit in past 3 months',
        patientsWithBP: '{count} patients with BP ≥140/90',
        tooltipNumerator: 'Numerator for BP uncontrolled: Patients with BP ≥140 OR ≥90 at their latest visit in the past 3 months.'
      },
      noVisit3Months: {
        label: 'No visit in past 3 months',
        patientsWithNoVisit: '{count} patients with no visit',
        tooltipNumerator: 'Numerator for No visit in 3 months: Patients with no visit in the past 3 months.'
      },
      tooltipDenominator: 'Denominator: Patients with hypertension registered before the past 3 months. Dead patients (205) and 12 month lost to follow-up patients (1,562) are excluded.'
    },
    patientsUnderCare: {
      title: 'Patients under care',
      description: 'Patients with hypertension with at least 1 visit in the past 12 months',
      patientsRegistered: '{count} patients registered in {month}',
      tooltipUnderCare: 'Patients under care: Registered patients with hypertension with at least 1 visit in the past 12 months. Dead patients (205) and 12 month lost to follow-up patients (1,562) are excluded.',
      tooltipCumulative: 'Cumulative registered patients: All patients with hypertension registered. Dead patients (205) are excluded.',
      tooltipMonthly: 'Monthly registered patients: Patients with hypertension registered each month.'
    },
    lostToFollowUp12Months: {
      title: '12 month lost to follow-up',
      description: 'Patients with hypertension with no visit in the past 12 months',
      patientsWithNoVisit: '{count} patients with no visit {period}',
      tooltipNumerator: 'Numerator: Patients with no visit in the past 12 months.',
      tooltipDenominator: 'Denominator: Registered patients with hypertension. Dead patients (205) are excluded.'
    },
    opportunisticScreening: {
      title: 'Opportunistic screening',
      description: '% of estimated adult OPD patients screened for hypertension',
      tooltipNumerator: 'Numerator: Patients screened for hypertension.',
      tooltipDenominator: 'Denominator: Approximate adult patients OPD per month.'
    }
  },

  // Compare Sub-regions
  compareSubRegions: {
    title: 'Compare sub-regions',
    description: 'Treatment outcomes for patients with hypertension at their latest visit from {startDate} to {endDate}',
    tableHeaders: {
      patientsUnderCare: 'Patients under care',
      monthlyNewPatients: 'Monthly new patients registered',
      bpControlled: 'BP controlled',
      bpUncontrolled: 'BP uncontrolled',
      noVisit3Months: 'No visit in past 3 months'
    }
  },

  // Cohort Reports
  cohortReports: {
    title: 'Cohort reports',
    description: 'Outcomes for patients registered in each quarter, shown by their latest visit in the following quarter',
    cohort: '{quarter} cohort',
    patients: '{count} patients',
    resultFrom: 'Result from latest visit in {quarter}',
    key: {
      bpControlled: 'BP controlled',
      bpUncontrolled: 'BP uncontrolled',
      noVisitInQuarter: 'No visit in quarter'
    }
  },

  // Overdue Patients
  overdue: {
    overduePatients: {
      title: 'Overdue patients',
      description: 'Patients that are overdue at the start of the month.',
      tooltipNumerator: 'Numerator: Patients that are overdue on the 1st of the month. Patients marked \'Removed from list\' (647) and patients with no phone number (241) are excluded.',
      tooltipDenominator: 'Denominator: Patients under care. Dead patients (205) and 12 months lost to follow-up (1,562) are excluded.',
      tooltipOverdue: 'Overdue patient: Patient with a scheduled visit date which has passed with no visit.'
    },
    overduePatientsCalled: {
      title: 'Overdue patients called',
      description: 'Patients called during the month.',
      tooltipNumerator: 'Numerator: Unique overdue patients called during the month.',
      tooltipDenominator: 'Denominator: Patients that are overdue on the 1st of the month. Patients marked \'Removed from list\' (647) and patients with no phone number (241) are excluded.'
    },
    overduePatientsReturned: {
      title: 'Overdue patients that returned to care',
      description: 'Patients that returned to care within 15 days of being called.',
      tooltipNumerator: 'Numerator: Patients that returned to care within 15 days of their first call.',
      tooltipDenominator: 'Denominator: The number of unique overdue patients called during the month.'
    }
  }
}

