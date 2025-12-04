# HEARTS360 Dashboard Package

A flexible, embeddable health data dashboard that can be easily integrated into various systems including web applications, desktop apps, DHIS2, and other platforms.

## Features

- 🎯 **Framework-Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
- 📦 **Multiple Distribution Formats** - Web Components, ES Modules, iframe, and framework-specific packages
- 🎨 **Customizable** - Theme support and configuration-driven design
- 🔌 **Flexible Data Sources** - REST APIs, GraphQL, DHIS2, and custom adapters
- 📱 **Responsive** - Works on desktop, tablet, and mobile devices
- ♿ **Accessible** - WCAG compliant

## Installation

### Web Components (Recommended for Maximum Compatibility)

```html
<script type="module" src="https://cdn.hearts360.org/dashboard.js"></script>
<hearts360-dashboard 
  data-source="https://api.example.com/data"
  theme="light"
></hearts360-dashboard>
```

### React

```bash
npm install @hearts360/dashboard-react
```

```jsx
import { Hearts360Dashboard } from '@hearts360/dashboard-react';

<Hearts360Dashboard 
  dataSource={data}
  config={config}
/>
```

### Vue

```bash
npm install @hearts360/dashboard-vue
```

```vue
<template>
  <Hearts360Dashboard :data-source="data" :config="config" />
</template>

<script>
import { Hearts360Dashboard } from '@hearts360/dashboard-vue';
</script>
```

### Angular

```bash
npm install @hearts360/dashboard-angular
```

```typescript
import { Hearts360DashboardModule } from '@hearts360/dashboard-angular';
```

### iframe Embedding

```html
<iframe 
  src="https://dashboard.hearts360.org/embed?config=..."
  width="100%" 
  height="600"
  frameborder="0"
></iframe>
```

## Configuration

The dashboard accepts configuration through props, attributes, or a configuration object:

```javascript
{
  dataSource: {
    type: 'rest', // 'rest' | 'graphql' | 'dhis2' | 'custom'
    url: 'https://api.example.com/data',
    // ... other options
  },
  theme: 'light', // 'light' | 'dark' | 'auto'
  locale: 'en',
  charts: {
    // Chart configuration
  },
  // ... more options
}
```

## Development

See [FRAMEWORK_ANALYSIS.md](./FRAMEWORK_ANALYSIS.md) for detailed framework comparison and architecture decisions.

## License

MIT



