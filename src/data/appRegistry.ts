import type { AppRegistryEntry } from '../types';

export const APP_REGISTRY: AppRegistryEntry[] = [
  {
    appType: 'projects',
    title: 'Projects',
    icon: '📁',
    defaultSize: { w: 750, h: 500 },
    minSize: { w: 400, h: 300 },
  },
  {
    appType: 'about',
    title: 'About Me',
    icon: '👤',
    defaultSize: { w: 600, h: 450 },
    minSize: { w: 350, h: 300 },
  },
  {
    appType: 'resume',
    title: 'Resume',
    icon: '📄',
    defaultSize: { w: 650, h: 500 },
    minSize: { w: 400, h: 350 },
  },
  {
    appType: 'contact',
    title: 'Contact',
    icon: '✉️',
    defaultSize: { w: 500, h: 420 },
    minSize: { w: 350, h: 300 },
  },
  {
    appType: 'terminal',
    title: 'Terminal',
    icon: '🖥️',
    defaultSize: { w: 650, h: 400 },
    minSize: { w: 400, h: 250 },
  },
  {
    appType: 'settings',
    title: 'Settings',
    icon: '⚙️',
    defaultSize: { w: 600, h: 450 },
    minSize: { w: 400, h: 300 },
  },
  {
    appType: 'snake',
    title: 'Snake',
    icon: '🐍',
    defaultSize: { w: 450, h: 500 },
    minSize: { w: 350, h: 400 },
  },
  {
    appType: 'game2048',
    title: '2048',
    icon: '🎮',
    defaultSize: { w: 420, h: 520 },
    minSize: { w: 350, h: 420 },
  },
];

export function getAppEntry(appType: string): AppRegistryEntry | undefined {
  return APP_REGISTRY.find((entry) => entry.appType === appType);
}
