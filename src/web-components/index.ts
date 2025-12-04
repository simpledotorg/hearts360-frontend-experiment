/**
 * Web Components wrapper
 * This allows the dashboard to be used in any framework or vanilla HTML
 */

import { defineCustomElement } from 'vue';
import Hearts360Dashboard from '../vue/Hearts360Dashboard.vue';

// Convert Vue component to Web Component
const Hearts360DashboardElement = defineCustomElement(Hearts360Dashboard);

// Register the custom element
customElements.define('hearts360-dashboard', Hearts360DashboardElement);

export { Hearts360DashboardElement };
export default Hearts360DashboardElement;



