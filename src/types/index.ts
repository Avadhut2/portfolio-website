// ===== App Types =====
export type AppType =
  | 'projects'
  | 'about'
  | 'terminal'
  | 'resume'
  | 'contact'
  | 'settings'
  | 'snake'
  | 'game2048';

// ===== Window State =====
export interface WindowState {
  id: string;
  appType: AppType;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  minSize: { w: number; h: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

// ===== Window Manager State =====
export interface WindowManagerState {
  windows: WindowState[];
  focusedWindowId: string | null;
  isActivitiesOpen: boolean;
  nextZIndex: number;
}

// ===== Window Manager Actions =====
export type WindowManagerAction =
  | { type: 'OPEN_APP'; appType: AppType }
  | { type: 'CLOSE_WINDOW'; id: string }
  | { type: 'FOCUS_WINDOW'; id: string }
  | { type: 'MINIMIZE_WINDOW'; id: string }
  | { type: 'TOGGLE_MAXIMIZE'; id: string }
  | { type: 'MOVE_WINDOW'; id: string; position: { x: number; y: number } }
  | { type: 'RESIZE_WINDOW'; id: string; size: { w: number; h: number } }
  | { type: 'TOGGLE_ACTIVITIES' }
  | { type: 'CLOSE_ACTIVITIES' };

// ===== App Registry Entry =====
export interface AppRegistryEntry {
  appType: AppType;
  title: string;
  icon: string;
  defaultSize: { w: number; h: number };
  minSize: { w: number; h: number };
}

// ===== Project Data =====
export interface Project {
  id: string;
  title: string;
  pitch: string;
  stack: string[];
  description: string;
  learnings: string;
  github?: string;
  live?: string;
  image?: string;
}
