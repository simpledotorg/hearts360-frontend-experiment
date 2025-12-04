/**
 * React wrapper
 * Use this when integrating into React applications
 */

import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import Hearts360Dashboard from '../vue/Hearts360Dashboard.vue';
import type { DashboardConfig } from '../types';

interface Hearts360DashboardProps {
  config?: DashboardConfig;
  dataSource?: DashboardConfig['dataSource'];
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
}

export const Hearts360Dashboard: React.FC<Hearts360DashboardProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create Vue app instance
    const app = createApp(Hearts360Dashboard, {
      config: props.config,
      dataSource: props.dataSource,
      theme: props.theme,
      locale: props.locale,
    });

    app.mount(containerRef.current);
    appRef.current = app;

    return () => {
      if (appRef.current) {
        appRef.current.unmount();
      }
    };
  }, [props.config, props.dataSource, props.theme, props.locale]);

  return <div ref={containerRef}></div>;
};

export default Hearts360Dashboard;
export type * from '../types';



