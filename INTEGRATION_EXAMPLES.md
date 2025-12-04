# Integration Examples

This document provides practical examples of how to integrate the HEARTS360 Dashboard into various platforms.

## 1. Web Components (Vanilla HTML/JavaScript)

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="./dist/web-components/index.js"></script>
</head>
<body>
  <hearts360-dashboard 
    data-source='{"type":"rest","url":"https://api.example.com/data"}'
    theme="light"
  ></hearts360-dashboard>
</body>
</html>
```

### With Configuration Object

```html
<hearts360-dashboard id="dashboard"></hearts360-dashboard>

<script type="module">
  import '@hearts360/dashboard';
  
  const dashboard = document.getElementById('dashboard');
  dashboard.config = {
    dataSource: {
      type: 'rest',
      url: 'https://api.example.com/data',
      headers: {
        'Authorization': 'Bearer token123'
      }
    },
    theme: 'dark',
    locale: 'en'
  };
</script>
```

## 2. React Integration

### Installation

```bash
npm install @hearts360/dashboard-react
```

### Basic Usage

```jsx
import React from 'react';
import { Hearts360Dashboard } from '@hearts360/dashboard-react';

function App() {
  const config = {
    dataSource: {
      type: 'rest',
      url: 'https://api.example.com/data',
    },
    theme: 'light',
  };

  return (
    <div>
      <Hearts360Dashboard config={config} />
    </div>
  );
}

export default App;
```

### With Props

```jsx
<Hearts360Dashboard
  dataSource={{
    type: 'rest',
    url: 'https://api.example.com/data',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }}
  theme="dark"
  locale="en"
/>
```

## 3. Vue.js Integration

### Installation

```bash
npm install @hearts360/dashboard-vue
```

### Basic Usage

```vue
<template>
  <Hearts360Dashboard :config="dashboardConfig" />
</template>

<script setup>
import { Hearts360Dashboard } from '@hearts360/dashboard-vue';
import { ref } from 'vue';

const dashboardConfig = ref({
  dataSource: {
    type: 'rest',
    url: 'https://api.example.com/data',
  },
  theme: 'light',
});
</script>
```

### With Reactive Props

```vue
<template>
  <Hearts360Dashboard
    :data-source="dataSource"
    :theme="theme"
    :locale="locale"
  />
</template>

<script setup>
import { Hearts360Dashboard } from '@hearts360/dashboard-vue';
import { ref } from 'vue';

const dataSource = ref({
  type: 'rest',
  url: 'https://api.example.com/data',
});

const theme = ref('light');
const locale = ref('en');
</script>
```

## 4. Angular Integration

### Installation

```bash
npm install @hearts360/dashboard-angular
```

### Module Setup

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Hearts360DashboardModule } from '@hearts360/dashboard-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    Hearts360DashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Component Usage

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <hearts360-dashboard
      [config]="dashboardConfig"
    ></hearts360-dashboard>
  `
})
export class AppComponent {
  dashboardConfig = {
    dataSource: {
      type: 'rest',
      url: 'https://api.example.com/data',
    },
    theme: 'light',
  };
}
```

## 5. iframe Embedding

### Basic iframe

```html
<iframe 
  src="https://dashboard.hearts360.org/embed?config=%7B%22dataSource%22%3A%7B%22type%22%3A%22rest%22%2C%22url%22%3A%22https%3A%2F%2Fapi.example.com%2Fdata%22%7D%7D"
  width="100%" 
  height="600"
  frameborder="0"
  allow="fullscreen"
></iframe>
```

### With JavaScript Configuration

```html
<iframe id="dashboard-iframe" width="100%" height="600" frameborder="0"></iframe>

<script>
  const config = {
    dataSource: {
      type: 'rest',
      url: 'https://api.example.com/data',
    },
    theme: 'light',
  };
  
  const iframe = document.getElementById('dashboard-iframe');
  iframe.src = `https://dashboard.hearts360.org/embed?config=${encodeURIComponent(JSON.stringify(config))}`;
</script>
```

## 6. DHIS2 Integration

### Using DHIS2 API

```javascript
const config = {
  dataSource: {
    type: 'dhis2',
    url: 'https://dhis2.example.org',
    headers: {
      'username': 'admin',
      'password': 'district'
    }
  },
  theme: 'light',
};
```

### As DHIS2 App

```javascript
// In DHIS2 app manifest.json
{
  "name": "hearts360-dashboard",
  "version": "1.0.0",
  "entryPoints": {
    "app": "index.html"
  }
}
```

```html
<!-- index.html in DHIS2 app -->
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.hearts360.org/dashboard.js"></script>
</head>
<body>
  <hearts360-dashboard
    data-source='{"type":"dhis2","url":"/api"}'
  ></hearts360-dashboard>
</body>
</html>
```

## 7. Electron Desktop App

```javascript
// main.js
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="./node_modules/@hearts360/dashboard/dist/web-components/index.js"></script>
</head>
<body>
  <hearts360-dashboard
    data-source='{"type":"rest","url":"https://api.example.com/data"}'
  ></hearts360-dashboard>
</body>
</html>
```

## 8. Custom Data Adapter

```javascript
const config = {
  dataSource: {
    type: 'custom',
    url: 'https://api.example.com/custom-format',
    adapter: (rawData) => {
      // Transform custom data format to dashboard format
      return {
        metrics: rawData.stats.map(stat => ({
          id: stat.id,
          label: stat.name,
          value: stat.count,
          unit: 'cases'
        })),
        charts: [],
        lastUpdated: new Date()
      };
    }
  }
};
```

## 9. Dynamic Configuration

```javascript
// Update dashboard configuration dynamically
const dashboard = document.querySelector('hearts360-dashboard');

// Method 1: Update config object
dashboard.config = {
  ...dashboard.config,
  theme: 'dark',
  dataSource: {
    ...dashboard.config.dataSource,
    url: 'https://new-api.example.com/data'
  }
};

// Method 2: Update individual properties
dashboard.setAttribute('theme', 'dark');
dashboard.setAttribute('data-source', JSON.stringify({
  type: 'rest',
  url: 'https://new-api.example.com/data'
}));
```

## 10. Multiple Dashboards on Same Page

```html
<div class="dashboard-container">
  <hearts360-dashboard
    id="dashboard1"
    data-source='{"type":"rest","url":"https://api.example.com/data1"}'
    theme="light"
  ></hearts360-dashboard>
</div>

<div class="dashboard-container">
  <hearts360-dashboard
    id="dashboard2"
    data-source='{"type":"rest","url":"https://api.example.com/data2"}'
    theme="dark"
  ></hearts360-dashboard>
</div>
```

## Best Practices

1. **Error Handling**: Always handle errors when fetching data
2. **Loading States**: Show loading indicators while data is being fetched
3. **Caching**: Consider implementing data caching for better performance
4. **Security**: Never expose API keys or credentials in client-side code
5. **Responsive Design**: Ensure the dashboard works on all screen sizes
6. **Accessibility**: Test with screen readers and keyboard navigation
7. **Performance**: Use lazy loading for large datasets
8. **Updates**: Implement polling or WebSocket connections for real-time updates



