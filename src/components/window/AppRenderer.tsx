import type { AppType } from '../../types';
import { ProjectsApp } from '../apps/ProjectsApp';
import { AboutApp } from '../apps/AboutApp';
import { ResumeApp } from '../apps/ResumeApp';
import { ContactApp } from '../apps/ContactApp';
import { TerminalApp } from '../apps/TerminalApp';
import { SettingsApp } from '../apps/SettingsApp';
import { SnakeApp } from '../apps/SnakeApp';
import { Game2048App } from '../apps/Game2048App';

const APP_COMPONENTS: Record<AppType, React.ComponentType> = {
  projects: ProjectsApp,
  about: AboutApp,
  resume: ResumeApp,
  contact: ContactApp,
  terminal: TerminalApp,
  settings: SettingsApp,
  snake: SnakeApp,
  game2048: Game2048App,
};

export function AppRenderer({ appType }: { appType: AppType }) {
  const Component = APP_COMPONENTS[appType];
  if (!Component) return null;
  return <Component />;
}
