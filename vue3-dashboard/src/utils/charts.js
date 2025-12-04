// Chart.js configurations for HEARTS360 Dashboard
// Based on https://www.chartjs.org/

import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

// [plugin] vertical intersect line
const dynamicChartSegementDashed = (
  ctx,
  numberOfXAxisTicks,
  numberOfDashedSegments = 1
) => {
  const dashStyle = [4, 3];
  const segmentStartIndex = ctx.p0DataIndex;
  return isSegmentDashed(
    segmentStartIndex,
    numberOfXAxisTicks,
    numberOfDashedSegments
  )
    ? dashStyle
    : undefined;
};

function isSegmentDashed(
  segmentStartIndex,
  numberOfXAxisTicks,
  segmentsToDashFromEnd
) {
  return segmentStartIndex >= numberOfXAxisTicks - (segmentsToDashFromEnd + 1);
}

export function dashboardReportsChartJSColors() {
  return {
    darkGreen: "rgba(0, 122, 49, 1)",
    mediumGreen: "rgba(0, 184, 73, 1)",
    lightGreen: "rgba(242, 248, 245, 0.5)",
    darkRed: "rgba(184, 22, 49, 1)",
    mediumRed: "rgba(255, 51, 85, 1)",
    lightRed: "rgba(255, 235, 238, 0.5)",
    darkPurple: "rgba(83, 0, 224, 1)",
    lightPurple: "rgba(169, 128, 239, 0.5)",
    darkBlue: "rgba(12, 57, 102, 1)",
    mediumBlue: "rgba(0, 117, 235, 1)",
    lightBlue: "rgba(233, 243, 255, 0.75)",
    darkGrey: "rgba(108, 115, 122, 1)",
    mediumGrey: "rgba(173, 178, 184, 1)",
    lightGrey: "rgba(240, 242, 245, 0.9)",
    white: "rgba(255, 255, 255, 1)",
    amber: "rgba(250, 190, 70, 1)",
    darkAmber: "rgba(223, 165, 50, 1)",
    transparent: "rgba(0, 0, 0, 0)",
    teal: "rgba(48, 184, 166, 1)",
    darkTeal: "rgba(34,140,125,1)",
    maroon: "rgba(71, 0, 0, 1)",
    darkMaroon: "rgba(60,0,0,1)",
    orange: "rgb(223,104,15)",
    lightOrange: "rgba(255,156,8,0.15)",
  };
}

const intersectDataVerticalLine = {
  id: "intersectDataVerticalLine",
  beforeDraw: (chart) => {
    // Check if tooltip exists and has active elements
    if (!chart.tooltip || !chart.tooltip._active || !chart.tooltip._active.length) {
      return;
    }

    const ctx = chart.ctx;
    const activePoint = chart.tooltip._active[0];
    const chartArea = chart.chartArea;

    // Validate that we have the necessary data
    if (!activePoint || !activePoint.element || !chartArea) {
      return;
    }

    ctx.save();

    // grey vertical hover line - full chart height
    ctx.beginPath();
    ctx.moveTo(activePoint.element.x, chartArea.top);
    ctx.lineTo(activePoint.element.x, chartArea.bottom);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0,0,0, 0.1)";
    ctx.stroke();
    ctx.restore();

    // colored vertical hover line - ['node' point to chart bottom] - only for line graphs (graphs with 1 data point)
    if (chart.tooltip._active.length === 1) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(activePoint.element.x, activePoint.element.y);
      ctx.lineTo(activePoint.element.x, chartArea.bottom);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
  },
};

export function baseLineChartConfig() {
  const colors = dashboardReportsChartJSColors();

  return {
    type: "line",
    options: {
      animation: false,
      clip: false,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 26,
          bottom: 0,
        },
      },
      elements: {
        point: {
          pointStyle: "circle",
          pointBackgroundColor: colors.white,
          hoverBackgroundColor: colors.white,
          borderWidth: 2,
          hoverRadius: 4,
          hoverBorderWidth: 2,
        },
        line: {
          tension: 0.4,
          borderWidth: 2,
          fill: true,
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
          caretPadding: 6,
        },
      },
      scales: {
        x: {
          stacked: false,
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false,
            color: colors.darkGrey,
            font: {
              size: 11,
            },
            padding: 6,
            showLabelBackdrop: true,
          },
        },
        y: {
          stacked: false,
          border: {
            display: false,
          },
          ticks: {
            autoSkip: false,
            color: colors.darkGrey,
            font: {
              size: 10,
            },
            padding: 8,
            stepSize: 25,
          },
          min: 0,
          max: 100,
        },
      },
    },
    plugins: [intersectDataVerticalLine],
  };
}

const percentageLabel = (context) => {
  return `${context.dataset.label}: ${context.parsed.y}%`;
};

const stockLabel = (context) => {
  return `${context.dataset.label}: ${context.parsed.y}%`;
};

// Chart data configurations
export const chartConfigs = {
  // Patients Protected
  patientsProtected: {
    data: {
      labels: [
        "Aug-2021", "Sep-2021", "Oct-2021", "Nov-2021", "Dec-2021",
        "Jan-2022", "Feb-2022", "Mar-2022", "Apr-2022", "May-2022",
        "Jun-2022", "Jul-2022", "Aug-2022", "Sep-2022", "Oct-2022",
        "Nov-2022", "Dec-2022", "Jan-2023", "Feb-2023", "Mar-2023",
        "Apr-2023", "May-2023", "Jun-2023", "Jul-2023", "Aug-2023",
        "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023", "Jan-2024",
        "Feb-2024", "Mar-2024", "Apr-2024", "May-2024", "Jun-2024",
        "Jul-2024",
      ],
      datasets: [
        {
          label: "Patients with BP <140/90",
          data: [
            10, 120, 140, 160, 130, 120, 150, 200, 260, 310, 400, 450, 500, 550,
            600, 650, 700, 710, 720, 750, 800, 830, 880, 908, 1244, 1412, 1646,
            1800, 2644, 2809, 3087, 3245, 3688, 3867, 4106, 4808,
          ],
          borderColor: "#3BB231",
          backgroundColor: "rgba(69, 205, 57, 0.1)",
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.patientsProtected.data;
      config.options.scales.y.grid = { drawTicks: false };
      config.options.scales.y.ticks.display = true;
      config.options.scales.y.ticks.count = 10;
      config.options.scales.y.max = 5000;
      config.options.scales.y.ticks.stepSize = 500;
      return config;
    },
  },

  // BP Controlled
  bpControlled: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "BP controlled",
          data: [
            28, 23, 32, 34, 43, 34, 43, 44, 46, 43, 52, 57, 57, 59, 56, 60, 61, 55,
          ],
          borderColor: "#3BB231",
          backgroundColor: "rgba(69, 205, 57, 0.1)",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.bpControlled.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: percentageLabel,
      };
      return config;
    },
  },

  // BP Uncontrolled
  bpUncontrolled: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "BP uncontrolled",
          data: [
            54, 51, 46, 45, 44, 47, 37, 33, 36, 37, 30, 28, 24, 24, 18, 17, 17, 20,
          ],
          borderColor: "#D19600",
          backgroundColor: "rgba(255, 201, 63, 0.1)",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.bpUncontrolled.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: percentageLabel,
      };
      return config;
    },
  },

  // 3 Month LTFU
  ltfu3Month: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "No visit in past 3 months",
          data: [
            18, 26, 22, 21, 13, 19, 20, 23, 18, 20, 18, 15, 19, 17, 26, 21, 22, 25,
          ],
          borderColor: "#ed6300",
          backgroundColor: "rgba(230, 137, 70, 0.1)",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.ltfu3Month.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: percentageLabel,
      };
      return config;
    },
  },

  // Registrations
  registrations: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "Cumulative registrations",
          data: [
            3074, 3719, 3989, 4308, 4958, 5338, 5705, 5975, 6284, 6762, 7019, 7523,
            8043, 8941, 9906, 11062, 12105, 12213,
          ],
          borderColor: "#007ee4",
          backgroundColor: "transparent",
          yAxisID: "y",
        },
        {
          label: "Patients under care",
          data: [
            3063, 3716, 3984, 4301, 4903, 5217, 5505, 5678, 5895, 6223, 6438, 6768,
            7146, 7882, 8649, 9648, 10539, 10632,
          ],
          borderColor: "#b51bdc",
          backgroundColor: "transparent",
          yAxisID: "y",
        },
        {
          type: "bar",
          label: "Monthly registrations",
          data: [
            786, 303, 270, 319, 650, 380, 285, 270, 309, 362, 257, 504, 520, 604,
            965, 1156, 1043, 236,
          ],
          borderColor: "#BEDFF9",
          backgroundColor: "#BEDFF9",
          yAxisID: "yMonthlyRegistrations",
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.registrations.data;
      config.options.scales.y.grid = { drawTicks: false };
      config.options.scales.y.ticks.display = false;
      config.options.scales.y.ticks.count = 3;
      config.options.scales.y.max = 12105;
      config.options.scales.y.ticks.stepSize = 6052;
      config.options.scales.yMonthlyRegistrations = {
        display: false,
        min: 0,
        max: 1156,
      };
      config.options.plugins.tooltip.displayColors = true;
      config.options.plugins.tooltip.callbacks = {
        labelColor: function (context) {
          return {
            borderColor: "#fff",
            backgroundColor: context.dataset.borderColor,
            borderWidth: 1,
          };
        },
      };
      return config;
    },
  },

  // 12 Month LTFU
  ltfu12Months: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "12 month lost to follow-up",
          data: [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 6, 6, 7, 8, 9, 10, 10],
          borderColor: "#FF3355",
          backgroundColor: "rgba(255, 51, 85, 0.1)",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.ltfu12Months.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: percentageLabel,
      };
      return config;
    },
  },

  // Screenings
  screenings: {
    data: {
      labels: [
        "Mar-2022", "Apr-2022", "May-2022", "Jun-2022", "Jul-2022",
        "Aug-2022", "Sep-2022", "Oct-2022", "Nov-2022", "Dec-2022",
        "Jan-2023", "Feb-2023", "Mar-2023", "Apr-2023", "May-2023",
        "Jun-2023", "Jul-2023", "Aug-2023",
      ],
      datasets: [
        {
          label: "% of patients screened",
          data: [
            10, 15, 16, 12, 11, 10, 9, 11, 14, 20, 22, 23, 23, 24, 23, 24, 23, 6,
          ],
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
          borderColor: "#34AEA0",
          backgroundColor: "transparent",
          yAxisID: "y",
        },
        {
          type: "bar",
          label: "Monthly screenings",
          data: [
            2000, 2200, 2300, 2200, 1600, 1800, 3400, 3600, 3900, 5800, 5700, 5600,
            6600, 6200, 6000, 6500, 6900, 500,
          ],
          borderColor: "#C5E5E2",
          backgroundColor: "#C5E5E2",
          yAxisID: "yMonthlyscreenings",
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.screenings.data;
      config.options.scales.y.grid = { drawTicks: false };
      config.options.scales.y.ticks.display = false;
      config.options.scales.y.ticks.count = 5;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.scales.y.max = 100;
      config.options.scales.yMonthlyscreenings = {
        display: false,
        min: 0,
        max: 7000,
      };
      config.options.plugins.tooltip.displayColors = true;
      config.options.plugins.tooltip.callbacks = {
        labelColor: function (context) {
          return {
            borderColor: "#fff",
            backgroundColor: context.dataset.borderColor,
            borderWidth: 1,
          };
        },
      };
      return config;
    },
  },

  // Drug Stock
  drugStock: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "Facilities with >30 days of Step 1 drugs",
          data: [
            96, 94, 90, 80, 70, 70, 71, 72, 73, 74, 75, 76, 78, 86, 96, 95, 94, 94,
          ],
          borderColor: "#222",
          backgroundColor: "transparent",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
        {
          label: "Facilities with >30 days of Step 2 drugs",
          data: [
            86, 84, 80, 70, 40, 30, 31, 32, 33, 34, 30, 46, 48, 46, 56, 55, 64, 64,
          ],
          borderColor: "#D8DB56",
          backgroundColor: "transparent",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
        {
          label: "Facilities with >30 days of Step 3 drugs",
          data: [
            90, 92, 92, 90, 90, 90, 91, 92, 93, 94, 90, 96, 98, 92, 94, 92, 92, 90,
          ],
          borderColor: "#18D6A8",
          backgroundColor: "transparent",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.drugStock.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: stockLabel,
      };
      config.options.plugins.tooltip.displayColors = true;
      config.options.plugins.tooltip.callbacks = {
        label: stockLabel,
        labelColor: function (context) {
          return {
            borderColor: "#fff",
            backgroundColor: context.dataset.borderColor,
            borderWidth: 1,
          };
        },
      };
      return config;
    },
  },

  // Overdue
  overdue: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "Overdue patients",
          data: [
            58, 54, 53, 52, 44, 39, 37, 40, 38, 37, 31, 28, 25, 28, 29, 30, 26, 25,
          ],
          borderColor: "#E77215",
          backgroundColor: "#E7721525",
          yAxisID: "y",
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.overdue.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: percentageLabel,
      };
      return config;
    },
  },

  // Overdue Called
  overdueCalled: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "Overdue patients called",
          data: [0, 5, 0, 0, 8, 12, 16, 22, 12, 10, 14, 25, 30, 22, 20, 21, 42, 10],
          borderColor: "#edbe00",
          backgroundColor: "#edbe0025",
          yAxisID: "y",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18),
          },
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.overdueCalled.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: percentageLabel,
      };
      return config;
    },
  },

  // Overdue Returned
  overdueReturned: {
    data: {
      labels: [
        "Mar-2023", "Apr-2023", "May-2023", "Jun-2023", "Jul-2023",
        "Aug-2023", "Sep-2023", "Oct-2023", "Nov-2023", "Dec-2023",
        "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024",
        "Jun-2024", "Jul-2024", "Aug-2024",
      ],
      datasets: [
        {
          label: "Called overdue patients that returned to care",
          data: [
            0, 25, 0, 0, 10, 12, 22, 40, 24, 55, 60, 62, 44, 50, 33, 36, 58, 15,
          ],
          borderColor: "#5300e0",
          backgroundColor: "#5300e010",
          yAxisID: "y",
          segment: {
            borderDash: (ctx) =>
              dynamicChartSegementDashed(ctx, 18, 2),
          },
        },
      ],
    },
    getConfig: () => {
      const config = baseLineChartConfig();
      config.data = chartConfigs.overdueReturned.data;
      config.options.scales.y.ticks.callback = (val) => val + "%";
      config.options.plugins.tooltip.callbacks = {
        label: percentageLabel,
      };
      return config;
    },
  },
};

export function createChart(canvas, chartKey) {
  if (!canvas || !chartConfigs[chartKey]) return null;
  const config = chartConfigs[chartKey].getConfig();
  return new Chart(canvas, config);
}

