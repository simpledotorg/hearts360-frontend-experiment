<template>
  <main class="main">
    <!-- Loading State -->
    <div
      v-if="store.isLoading"
      class="loading-container"
      style="text-align: center; padding: 2rem"
    >
      <p>{{ $t("common.loading") }}</p>
    </div>

    <!-- Error State -->
    <div
      v-if="store.error && !store.isLoading"
      class="error-container"
      style="text-align: center; padding: 2rem; color: red"
    >
      <p>{{ $t("common.error") }}: {{ store.error }}</p>
      <button
        @click="store.loadDashboardData()"
        style="margin-top: 1rem; padding: 0.5rem 1rem"
      >
        {{ $t("common.retry") }}
      </button>
    </div>

    <!-- Dashboard Content -->
    <template v-if="!store.isLoading && !store.error">
      <div class="header">
        <h1>{{ store.regionName }}</h1>
        <div class="date-updated">
          {{ $t("common.dataLastUpdated") }}: {{ store.formattedLastUpdated }}
        </div>
      </div>

      <!-- Section 1: Overview Indicators -->
      <h2 class="columns-header">{{ $t("sections.overviewIndicators") }}</h2>

      <div class="columns-3">
        <div class="card col-span-2">
          <div class="heading">
            <h3>
              {{ $t("overview.patientsProtected.title") }}
            </h3>
            <div class="figures">
              <p class="large-num bp-controlled">
                {{ formatNumber(store.patientsProtected.total) }}
                {{ store.patientsProtected.label }}
              </p>
              <div class="detail">
                <p>
                  {{
                    $t("overview.patientsProtected.inRegion", {
                      region: store.regionName,
                    })
                  }}
                </p>
              </div>
            </div>
            <div class="chart" style="height: 350px">
              <canvas ref="patientsProtectedChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="heading">
            <h3>{{ $t("overview.treatmentCascade.title") }}</h3>
            <p>
              {{ $t("overview.treatmentCascade.description") }}
            </p>
            <div class="info">
              <div class="info-hover-text">
                <p>
                  <b>{{
                    $t("overview.treatmentCascade.estimatedPopulation.label")
                  }}</b>
                  {{
                    $t(
                      "overview.treatmentCascade.estimatedPopulation.tooltip"
                    )
                  }}
                </p>
                <p>
                  <b>{{
                    $t("overview.treatmentCascade.cumulativeRegistered.label")
                  }}</b>
                  {{
                    $t(
                      "overview.treatmentCascade.cumulativeRegistered.tooltip"
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="body">
            <div class="coverage">
              <div class="coverage-column">
                <div class="coverage-bar">
                  <div class="coverage-bar-fill" :style="{ height: '100%' }">
                    <p class="coverage-estimated">
                      {{
                        store.treatmentCascade.estimatedHypertension
                          .percentage
                      }}%
                    </p>
                  </div>
                </div>
                <p>
                  {{
                    formatNumber(
                      store.treatmentCascade.estimatedHypertension.count
                    )
                  }}
                </p>
                <p class="text-grey label-small">
                  {{ store.treatmentCascade.estimatedHypertension.label }}
                </p>
              </div>
              <div class="coverage-column">
                <div class="coverage-bar">
                  <div
                    class="coverage-bar-fill registrations-bg"
                    :style="{
                      height:
                        store.treatmentCascade.cumulativeRegistered
                          .percentage + '%',
                    }"
                  >
                    <p class="coverage-number registrations">
                      {{
                        store.treatmentCascade.cumulativeRegistered
                          .percentage
                      }}%
                    </p>
                  </div>
                </div>
                <p>
                  {{
                    formatNumber(
                      store.treatmentCascade.cumulativeRegistered.count
                    )
                  }}
                </p>
                <p class="text-grey label-small">
                  {{ store.treatmentCascade.cumulativeRegistered.label }}
                </p>
              </div>
              <div class="coverage-column">
                <div class="coverage-bar">
                  <div
                    class="coverage-bar-fill under-care-bg"
                    :style="{
                      height:
                        store.treatmentCascade.patientsUnderCare.percentage +
                        '%',
                    }"
                  >
                    <p class="coverage-number under-care">
                      {{
                        store.treatmentCascade.patientsUnderCare.percentage
                      }}%
                    </p>
                  </div>
                </div>
                <p>
                  {{
                    formatNumber(
                      store.treatmentCascade.patientsUnderCare.count
                    )
                  }}
                </p>
                <p class="text-grey label-small">
                  {{ store.treatmentCascade.patientsUnderCare.label }}
                </p>
              </div>
              <div class="coverage-column">
                <div class="coverage-bar">
                  <div
                    class="coverage-bar-fill bp-controlled-bg"
                    :style="{
                      height:
                        store.treatmentCascade.bpControlled.percentage + '%',
                    }"
                  >
                    <p class="coverage-number bp-controlled">
                      {{ store.treatmentCascade.bpControlled.percentage }}%
                    </p>
                  </div>
                </div>
                <p>
                  {{
                    formatNumber(store.treatmentCascade.bpControlled.count)
                  }}
                </p>
                <p class="text-grey label-small">
                  {{ store.treatmentCascade.bpControlled.label }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Program Management Indicators -->
      <h2 class="columns-header spacer">
        {{ $t("sections.programManagementIndicators") }}
      </h2>

      <div class="card">
        <div class="heading">
          <h3>{{ $t("programManagement.treatmentOutcomes.title") }}</h3>
          <div class="info">
            <div class="info-hover-text">
              <p>
                <span
                  >{{
                    $t(
                      "programManagement.treatmentOutcomes.bpControlled.label"
                    )
                  }}:</span
                >
                {{
                  $t(
                    "programManagement.treatmentOutcomes.bpControlled.tooltipNumerator"
                  )
                }}
              </p>
              <p>
                <span
                  >{{
                    $t(
                      "programManagement.treatmentOutcomes.bpUncontrolled.label"
                    )
                  }}:</span
                >
                {{
                  $t(
                    "programManagement.treatmentOutcomes.bpUncontrolled.tooltipNumerator"
                  )
                }}
              </p>
              <p>
                <span
                  >{{
                    $t(
                      "programManagement.treatmentOutcomes.noVisit3Months.label"
                    )
                  }}:</span
                >
                {{
                  $t(
                    "programManagement.treatmentOutcomes.noVisit3Months.tooltipNumerator"
                  )
                }}
              </p>
              <p>
                <span>{{ $t("common.denominator") }}:</span>
                {{
                  $t("programManagement.treatmentOutcomes.tooltipDenominator")
                }}
              </p>
            </div>
          </div>
          <p>
            {{
              $t("programManagement.treatmentOutcomes.description", {
                count: formatNumber(
                  store.treatmentOutcomes.denominator.count
                ),
                startDate: formatDate(store.treatmentOutcomes.period.start),
                endDate: formatDate(store.treatmentOutcomes.period.end),
              })
            }}
          </p>

          <div class="body columns-3">
            <div class="inner-card">
              <div class="figures">
                <h4 class="bp-controlled">
                  {{ store.treatmentOutcomes.bpControlled.label }}
                </h4>
                <p class="large-num bp-controlled">
                  {{ store.treatmentOutcomes.bpControlled.percentage }}%
                </p>
                <div class="detail">
                  <p>
                    {{
                      $t(
                        "programManagement.treatmentOutcomes.bpControlled.patientsWithBP",
                        {
                          count: formatNumber(
                            store.treatmentOutcomes.bpControlled.count
                          ),
                        }
                      )
                    }}
                  </p>
                </div>
              </div>
              <div class="chart">
                <canvas ref="bpControlledChart"></canvas>
              </div>
            </div>
            <div class="inner-card">
              <div class="figures">
                <h4 class="bp-uncontrolled">
                  {{ store.treatmentOutcomes.bpUncontrolled.label }}
                </h4>
                <p class="large-num bp-uncontrolled">
                  {{ store.treatmentOutcomes.bpUncontrolled.percentage }}%
                </p>
                <div class="detail">
                  <p>
                    {{
                      $t(
                        "programManagement.treatmentOutcomes.bpUncontrolled.patientsWithBP",
                        {
                          count: formatNumber(
                            store.treatmentOutcomes.bpUncontrolled.count
                          ),
                        }
                      )
                    }}
                  </p>
                </div>
              </div>
              <div class="chart">
                <canvas ref="bpUncontrolledChart"></canvas>
              </div>
            </div>
            <div class="inner-card">
              <div class="figures">
                <h4 class="three-month-ltfu">
                  {{ store.treatmentOutcomes.noVisit3Months.label }}
                </h4>
                <p class="large-num three-month-ltfu">
                  {{ store.treatmentOutcomes.noVisit3Months.percentage }}%
                </p>
                <div class="detail">
                  <p>
                    {{
                      $t(
                        "programManagement.treatmentOutcomes.noVisit3Months.patientsWithNoVisit",
                        {
                          count: formatNumber(
                            store.treatmentOutcomes.noVisit3Months.count
                          ),
                        }
                      )
                    }}
                  </p>
                </div>
              </div>
              <div class="chart">
                <canvas ref="ltfu3MonthChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns-3">
        <div class="card">
          <div class="heading">
            <h3>{{ $t("programManagement.patientsUnderCare.title") }}</h3>
            <div class="info">
              <div class="info-hover-text">
                <p>
                  <span
                    >{{
                      $t("programManagement.patientsUnderCare.title")
                    }}:</span
                  >
                  {{
                    $t("programManagement.patientsUnderCare.tooltipUnderCare")
                  }}
                </p>
                <p>
                  <span
                    >{{
                      $t(
                        "overview.treatmentCascade.cumulativeRegistered.label"
                      )
                    }}:</span
                  >
                  {{
                    $t(
                      "programManagement.patientsUnderCare.tooltipCumulative"
                    )
                  }}
                </p>
                <p>
                  <span>{{
                    $t("programManagement.patientsUnderCare.tooltipMonthly")
                  }}</span>
                </p>
              </div>
            </div>
            <p>
              {{ $t("programManagement.patientsUnderCare.description") }}
            </p>
          </div>
          <div class="body">
            <div class="figures">
              <div>
                <p class="large-num under-care">
                  {{ formatNumber(store.patientsUnderCare.total) }}
                </p>
                <div class="detail">
                  <p>
                    {{
                      $t(
                        "programManagement.patientsUnderCare.patientsRegistered",
                        {
                          count: formatNumber(
                            store.patientsUnderCare.monthlyRegistered.count
                          ),
                          month:
                            store.patientsUnderCare.monthlyRegistered.month,
                        }
                      )
                    }}
                  </p>
                  <p class="text-grey">
                    {{ $t("common.of") }}
                    <span class="registrations"
                      >{{
                        formatNumber(
                          store.patientsUnderCare.cumulativeRegistered.count
                        )
                      }}
                      {{
                        store.patientsUnderCare.cumulativeRegistered.label
                      }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="chart">
              <canvas ref="registrationsChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="heading">
            <h3>
              {{ $t("programManagement.lostToFollowUp12Months.title") }}
            </h3>
            <div class="info">
              <div class="info-hover-text">
                <p>
                  <span>{{ $t("common.numerator") }}:</span>
                  {{
                    $t(
                      "programManagement.lostToFollowUp12Months.tooltipNumerator"
                    )
                  }}
                </p>
                <p>
                  <span>{{ $t("common.denominator") }}:</span>
                  {{
                    $t(
                      "programManagement.lostToFollowUp12Months.tooltipDenominator"
                    )
                  }}
                </p>
              </div>
            </div>
            <p>
              {{ $t("programManagement.lostToFollowUp12Months.description") }}
            </p>
          </div>
          <div class="body">
            <div class="figures">
              <p class="large-num twelve-month-ltfu">
                {{ store.lostToFollowUp12Months.percentage }}%
              </p>
              <div class="detail">
                <p>
                  {{
                    $t(
                      "programManagement.lostToFollowUp12Months.patientsWithNoVisit",
                      {
                        count: formatNumber(
                          store.lostToFollowUp12Months.count
                        ),
                        period: store.lostToFollowUp12Months.period.label,
                      }
                    )
                  }}
                </p>
                <p class="text-grey">
                  {{ $t("common.of") }}
                  <span class="registrations"
                    >{{
                      formatNumber(
                        store.lostToFollowUp12Months.denominator.count
                      )
                    }}
                    {{ store.lostToFollowUp12Months.denominator.label }}</span
                  >
                </p>
              </div>
            </div>
            <div class="chart">
              <canvas ref="ltfu12MonthsChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="heading">
            <h3>
              {{ $t("programManagement.opportunisticScreening.title") }}
            </h3>
            <div class="info">
              <div class="info-hover-text">
                <p>
                  <span>{{ $t("common.numerator") }}:</span>
                  {{
                    $t(
                      "programManagement.opportunisticScreening.tooltipNumerator"
                    )
                  }}
                </p>
                <p>
                  <span>{{ $t("common.denominator") }}:</span>
                  {{
                    $t(
                      "programManagement.opportunisticScreening.tooltipDenominator"
                    )
                  }}
                </p>
              </div>
            </div>
            <p>
              {{ $t("programManagement.opportunisticScreening.description") }}
            </p>
          </div>
          <div class="body">
            <div class="figures">
              <div>
                <p class="large-num" style="color: #34aea0">
                  {{ store.opportunisticScreening.percentage }}%
                </p>
                <div class="detail">
                  <p>
                    {{ formatNumber(store.opportunisticScreening.count) }}
                    {{ store.opportunisticScreening.label }}
                  </p>
                  <p class="text-grey">
                    {{ $t("common.of") }} ~{{
                      formatNumber(
                        store.opportunisticScreening.denominator.count
                      )
                    }}
                    {{ store.opportunisticScreening.denominator.label }}
                  </p>
                </div>
              </div>
            </div>
            <div class="chart">
              <canvas ref="screeningsChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Compare Sub-regions Table -->
      <div class="card">
        <div class="heading">
          <h3>{{ $t("compareSubRegions.title") }}</h3>
          <p>
            {{
              $t("compareSubRegions.description", {
                startDate: formatDate(store.treatmentOutcomes.period.start),
                endDate: formatDate(store.treatmentOutcomes.period.end),
              })
            }}
          </p>
        </div>
        <div class="table-container">
          <p class="table-scroll-message text-grey mobile-only">
            {{ $t("common.scrollTable") }}
          </p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr class="text-center">
                  <td></td>
                  <th scope="colgroup">
                    {{
                      $t("compareSubRegions.tableHeaders.patientsUnderCare")
                    }}
                  </th>
                  <th scope="colgroup">
                    {{
                      $t("compareSubRegions.tableHeaders.monthlyNewPatients")
                    }}
                  </th>
                  <th colspan="2" scope="colgroup">
                    {{ $t("compareSubRegions.tableHeaders.bpControlled") }}
                  </th>
                  <th colspan="2" scope="colgroup">
                    {{ $t("compareSubRegions.tableHeaders.bpUncontrolled") }}
                  </th>
                  <th colspan="2" scope="colgroup">
                    {{ $t("compareSubRegions.tableHeaders.noVisit3Months") }}
                  </th>
                </tr>
                <tr class="head-bg">
                  <th>
                    <div>{{ $t("common.subRegions") }}</div>
                  </th>
                  <th class="text-right">
                    <div>{{ $t("common.total") }}</div>
                  </th>
                  <th class="text-right">
                    <div>
                      {{ store.patientsUnderCare.monthlyRegistered.month }}
                    </div>
                  </th>
                  <th class="text-right">
                    <div>{{ $t("common.total") }}</div>
                  </th>
                  <th>
                    <div>{{ $t("common.percent") }}</div>
                  </th>
                  <th class="text-right">
                    <div>{{ $t("common.total") }}</div>
                  </th>
                  <th>
                    <div>{{ $t("common.percent") }}</div>
                  </th>
                  <th class="text-right">
                    <div>{{ $t("common.total") }}</div>
                  </th>
                  <th>
                    <div>{{ $t("common.percent") }}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(region, index) in store.subRegions"
                  :key="region.name"
                  :class="{ totals: index === 0 }"
                >
                  <th class="link" :class="{ link: index !== 0 }">
                    <b v-if="index === 0">{{ region.name }}</b>
                    <a v-else href="#">{{ region.name }}</a>
                  </th>
                  <td class="number under-care bold">
                    {{ formatNumber(region.patientsUnderCare) }}
                  </td>
                  <td class="number">
                    {{ formatNumber(region.monthlyNewPatients) }}
                  </td>
                  <td class="number">
                    {{ formatNumber(region.bpControlled.count) }}
                  </td>
                  <td class="bp-controlled bold">
                    {{ region.bpControlled.percentage }}%
                  </td>
                  <td class="number">
                    {{ formatNumber(region.bpUncontrolled.count) }}
                  </td>
                  <td class="bp-uncontrolled bold">
                    {{ region.bpUncontrolled.percentage }}%
                  </td>
                  <td class="number">
                    {{ formatNumber(region.noVisit3Months.count) }}
                  </td>
                  <td class="three-month-ltfu bold">
                    {{ region.noVisit3Months.percentage }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Cohort Reports -->
      <div class="card">
        <div class="heading">
          <h3>{{ $t("cohortReports.title") }}</h3>
          <p>
            {{ $t("cohortReports.description") }}
          </p>
        </div>
        <div class="body">
          <div class="cohort">
            <div
              v-for="cohort in store.cohorts"
              :key="cohort.quarter"
              class="cohort-quarter"
            >
              <div class="cohort-bar">
                <div
                  class="segment bp-controlled-bg"
                  :style="{ height: cohort.outcomes.bpControlled + '%' }"
                >
                  {{ cohort.outcomes.bpControlled }}%
                </div>
                <div
                  class="segment bp-uncontrolled-bg"
                  :style="{ height: cohort.outcomes.bpUncontrolled + '%' }"
                >
                  {{ cohort.outcomes.bpUncontrolled }}%
                </div>
                <div
                  class="segment three-month-ltfu-bg"
                  :style="{ height: cohort.outcomes.noVisit + '%' }"
                >
                  {{ cohort.outcomes.noVisit }}%
                </div>
              </div>
              <div class="cohort-detail">
                <b>{{
                  $t("cohortReports.cohort", { quarter: cohort.quarter })
                }}</b>
                {{
                  $t("cohortReports.patients", {
                    count: formatNumber(cohort.patientCount),
                  })
                }}
                <p class="text-grey">
                  {{
                    $t("cohortReports.resultFrom", {
                      quarter: cohort.resultQuarter,
                    })
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="key">
            <div class="key-text">
              <span class="key-color-box bp-controlled-bg"></span>
              {{ $t("cohortReports.key.bpControlled") }}
            </div>
            <div class="key-text">
              <span class="key-color-box bp-uncontrolled-bg"></span>
              {{ $t("cohortReports.key.bpUncontrolled") }}
            </div>
            <div class="key-text">
              <span class="key-color-box three-month-ltfu-bg"></span>
              {{ $t("cohortReports.key.noVisitInQuarter") }}
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Overdue Patients -->
      <h2 class="columns-header spacer">
        {{ $t("sections.overduePatients") }}
      </h2>
      <div class="columns-3">
        <div class="card normal-flow">
          <div class="heading">
            <h3>{{ $t("overdue.overduePatients.title") }}</h3>
            <div class="info">
              <div class="info-hover-text">
                <p>
                  <span>{{ $t("common.numerator") }}:</span>
                  {{ $t("overdue.overduePatients.tooltipNumerator") }}
                </p>
                <p>
                  <span>{{ $t("common.denominator") }}:</span>
                  {{ $t("overdue.overduePatients.tooltipDenominator") }}
                </p>
                <p>
                  <span>{{ $t("overdue.overduePatients.title") }}:</span>
                  {{ $t("overdue.overduePatients.tooltipOverdue") }}
                </p>
              </div>
            </div>
            <p>{{ $t("overdue.overduePatients.description") }}</p>
          </div>
          <div class="body">
            <div class="figures">
              <div>
                <p class="large-num overdue">
                  {{ store.overduePatients.percentage }}%
                </p>
                <div class="detail">
                  <p>
                    {{ formatNumber(store.overduePatients.count) }}
                    {{ store.overduePatients.label }}
                  </p>
                  <p class="text-grey">
                    {{ $t("common.of") }}
                    <span class="under-care"
                      >{{
                        formatNumber(store.overduePatients.denominator.count)
                      }}
                      {{ store.overduePatients.denominator.label }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="chart">
              <canvas ref="overdueChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card normal-flow">
          <div class="heading">
            <h3>{{ $t("overdue.overduePatientsCalled.title") }}</h3>
            <div class="info">
              <div class="info-hover-text">
                <p>
                  <span>{{ $t("common.numerator") }}:</span>
                  {{ $t("overdue.overduePatientsCalled.tooltipNumerator") }}
                </p>
                <p>
                  <span>{{ $t("common.denominator") }}:</span>
                  {{ $t("overdue.overduePatientsCalled.tooltipDenominator") }}
                </p>
              </div>
            </div>
            <p>{{ $t("overdue.overduePatientsCalled.description") }}</p>
          </div>
          <div class="body">
            <div class="figures">
              <p class="large-num overdue-called">
                {{ store.overduePatientsCalled.percentage }}%
              </p>
              <div class="detail">
                <p>
                  {{ formatNumber(store.overduePatientsCalled.count) }}
                  {{ store.overduePatientsCalled.label }}
                </p>
                <p class="text-grey">
                  {{ $t("common.of") }}
                  <span class="overdue"
                    >{{
                      formatNumber(
                        store.overduePatientsCalled.denominator.count
                      )
                    }}
                    {{ store.overduePatientsCalled.denominator.label }}</span
                  >
                </p>
              </div>
            </div>
            <div class="chart">
              <canvas ref="overdueCalledChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card normal-flow">
          <div class="heading">
            <h3>{{ $t("overdue.overduePatientsReturned.title") }}</h3>
            <div class="info">
              <div class="info-hover-text">
                <p>
                  <span>{{ $t("common.numerator") }}:</span>
                  {{ $t("overdue.overduePatientsReturned.tooltipNumerator") }}
                </p>
                <p>
                  <span>{{ $t("common.denominator") }}:</span>
                  {{
                    $t("overdue.overduePatientsReturned.tooltipDenominator")
                  }}
                </p>
              </div>
            </div>
            <p>{{ $t("overdue.overduePatientsReturned.description") }}</p>
          </div>
          <div class="body">
            <div class="figures">
              <p class="large-num" style="color: #4caf50">
                {{ store.overduePatientsReturned.percentage }}%
              </p>
              <div class="detail">
                <p>
                  {{ formatNumber(store.overduePatientsReturned.count) }}
                  {{ store.overduePatientsReturned.label }}
                </p>
                <p class="text-grey">
                  {{ $t("common.of") }}
                  <span class="overdue-called"
                    >{{
                      formatNumber(
                        store.overduePatientsReturned.denominator.count
                      )
                    }}
                    {{
                      store.overduePatientsReturned.denominator.label
                    }}</span
                  >
                </p>
              </div>
            </div>
            <div class="chart">
              <canvas ref="overdueReturnedChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </template>
    <Footer />
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { Chart, registerables } from "chart.js";
import { createChart as createChartUtil } from "../utils/charts.js";
import Footer from "./Footer.vue";
import { useDashboardStore } from "../stores/dashboard.js";

// Register store
const store = useDashboardStore();

Chart.register(...registerables);

// Helper functions for formatting
const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Chart refs
const patientsProtectedChart = ref(null);
const bpControlledChart = ref(null);
const bpUncontrolledChart = ref(null);
const ltfu3MonthChart = ref(null);
const registrationsChart = ref(null);
const ltfu12MonthsChart = ref(null);
const screeningsChart = ref(null);
const overdueChart = ref(null);
const overdueCalledChart = ref(null);
const overdueReturnedChart = ref(null);
const drugStockChart = ref(null);

// Store chart instances
const chartInstances = ref({});
const chartsInitialized = ref(false);
const isInitializing = ref(false);

// Function to initialize a chart
const initChart = (canvasRef, chartKey) => {
  if (!canvasRef?.value) {
    console.warn(`Canvas ref for ${chartKey} is not available`);
    return null;
  }

  const canvas = canvasRef.value;
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    console.warn(`Invalid canvas element for ${chartKey}`);
    return null;
  }

  // Check if Chart.js has a chart instance on this canvas and destroy it
  try {
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }
  } catch (e) {
    // Chart.getChart might throw if no chart exists, which is fine
  }

  // Also destroy from our stored instances
  if (chartInstances.value[chartKey]) {
    try {
      chartInstances.value[chartKey].destroy();
    } catch (e) {
      // Chart already destroyed or doesn't exist
    }
    chartInstances.value[chartKey] = null;
  }

  // Create new chart
  try {
    const chart = createChartUtil(canvas, chartKey);
    if (chart) {
      chartInstances.value[chartKey] = chart;
    }
    return chart;
  } catch (error) {
    console.error(`Error initializing chart ${chartKey}:`, error);
    return null;
  }
};

// Function to initialize all charts
const initAllCharts = async () => {
  if (chartsInitialized.value || isInitializing.value) {
    return; // Prevent multiple initializations
  }

  isInitializing.value = true;

  await nextTick();

  // Small delay to ensure DOM is fully rendered
  setTimeout(() => {
    initChart(patientsProtectedChart, "patientsProtected");
    initChart(bpControlledChart, "bpControlled");
    initChart(bpUncontrolledChart, "bpUncontrolled");
    initChart(ltfu3MonthChart, "ltfu3Month");
    initChart(registrationsChart, "registrations");
    initChart(ltfu12MonthsChart, "ltfu12Months");
    initChart(screeningsChart, "screenings");
    initChart(overdueChart, "overdue");
    initChart(overdueCalledChart, "overdueCalled");
    initChart(overdueReturnedChart, "overdueReturned");
    initChart(drugStockChart, "drugStock");

    chartsInitialized.value = true;
    isInitializing.value = false;
  }, 200);
};

onMounted(async () => {
  // Load dashboard data from API
  await store.loadDashboardData();

  // Initialize charts after data is loaded
  await initAllCharts();
});

// Cleanup charts on unmount
onBeforeUnmount(() => {
  // Destroy all chart instances
  Object.values(chartInstances.value).forEach((chart) => {
    if (chart) {
      try {
        chart.destroy();
      } catch (e) {
        console.warn("Error destroying chart on unmount:", e);
      }
    }
  });
  chartInstances.value = {};
  chartsInitialized.value = false;
});

// Watch for data changes and reinitialize charts if needed
watch(
  () => store.isLoading,
  (isLoading) => {
    if (!isLoading && !store.error && !chartsInitialized.value) {
      nextTick(() => {
        initAllCharts();
      });
    }
  }
);
</script>

