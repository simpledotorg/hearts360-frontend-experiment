# HEARTS360 Vue 3 Dashboard

A Vue 3 single-page application replicating the HEARTS360 Hypertension Dashboard structure.

## Features

- Complete dashboard layout matching the original HEARTS360 design
- Interactive charts using Chart.js
- Responsive design for desktop and mobile
- Region navigation
- Multiple dashboard sections:
  - Overview indicators
  - Program management indicators
  - Overdue patients tracking
  - Drug stock and BP monitor inventory
  - Cohort reports
  - Sub-region comparison tables

## Getting Started

### Installation

```bash
cd vue3-dashboard
npm install
```

### Development

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
vue3-dashboard/
├── index.html          # Entry HTML file
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.js        # Vue app entry point
│   ├── App.vue        # Main dashboard component
│   └── style.css      # Global styles
└── README.md
```

## Technologies

- **Vue 3** - Progressive JavaScript framework
- **Chart.js** - Charting library for data visualization
- **Vite** - Fast build tool and development server

## Dashboard Sections

1. **Overview Indicators**
   - Patients protected from heart attacks and strokes
   - Hypertension treatment cascade visualization

2. **Program Management Indicators**
   - Hypertension treatment outcomes
   - Patients under care tracking
   - 12 month lost to follow-up
   - Opportunistic screening metrics

3. **Overdue Patients**
   - Overdue patients percentage
   - Overdue patients called
   - Patients that returned to care

4. **Drug Stock and BP Monitor Inventory**
   - Anti-hypertensive drug stock levels
   - Blood pressure monitor availability

## Notes

This is a single-page Vue 3 application that replicates the structure and layout of the HEARTS360 Hypertension Dashboard. The charts use sample data for demonstration purposes.

