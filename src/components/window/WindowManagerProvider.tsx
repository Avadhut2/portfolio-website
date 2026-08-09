import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { WindowManagerState, WindowManagerAction, WindowState, AppType } from '../../types';
import { getAppEntry } from '../../data/appRegistry';

// ===== Initial State =====
const initialState: WindowManagerState = {
  windows: [],
  focusedWindowId: null,
  isActivitiesOpen: false,
  nextZIndex: 1,
};

// ===== Helper: generate random offset for new windows =====
function getSpawnPosition(existingWindows: WindowState[]): { x: number; y: number } {
  const baseX = 80;
  const baseY = 60;
  const offset = existingWindows.length * 30;
  return {
    x: baseX + (offset % 200),
    y: baseY + (offset % 150),
  };
}

// ===== Reducer =====
function windowManagerReducer(
  state: WindowManagerState,
  action: WindowManagerAction
): WindowManagerState {
  switch (action.type) {
    case 'OPEN_APP': {
      // If already open, focus it instead
      const existing = state.windows.find((w) => w.appType === action.appType);
      if (existing) {
        return {
          ...state,
          isActivitiesOpen: false,
          focusedWindowId: existing.id,
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: state.nextZIndex }
              : w
          ),
          nextZIndex: state.nextZIndex + 1,
        };
      }

      const entry = getAppEntry(action.appType);
      if (!entry) return state;

      const newWindow: WindowState = {
        id: `${action.appType}-${Date.now()}`,
        appType: action.appType,
        title: entry.title,
        icon: entry.icon,
        position: getSpawnPosition(state.windows),
        size: { ...entry.defaultSize },
        minSize: { ...entry.minSize },
        zIndex: state.nextZIndex,
        isMinimized: false,
        isMaximized: false,
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        focusedWindowId: newWindow.id,
        isActivitiesOpen: false,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case 'CLOSE_WINDOW': {
      const remaining = state.windows.filter((w) => w.id !== action.id);
      return {
        ...state,
        windows: remaining,
        focusedWindowId:
          state.focusedWindowId === action.id
            ? (remaining.length > 0 ? remaining[remaining.length - 1].id : null)
            : state.focusedWindowId,
      };
    }

    case 'FOCUS_WINDOW': {
      return {
        ...state,
        focusedWindowId: action.id,
        isActivitiesOpen: false,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, zIndex: state.nextZIndex, isMinimized: false }
            : w
        ),
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case 'MINIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isMinimized: true } : w
        ),
        focusedWindowId:
          state.focusedWindowId === action.id ? null : state.focusedWindowId,
      };
    }

    case 'TOGGLE_MAXIMIZE': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isMaximized: !w.isMaximized } : w
        ),
      };
    }

    case 'MOVE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, position: action.position } : w
        ),
      };
    }

    case 'RESIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, size: action.size } : w
        ),
      };
    }

    case 'TOGGLE_ACTIVITIES': {
      return {
        ...state,
        isActivitiesOpen: !state.isActivitiesOpen,
      };
    }

    case 'CLOSE_ACTIVITIES': {
      return {
        ...state,
        isActivitiesOpen: false,
      };
    }

    default:
      return state;
  }
}

// ===== Context =====
interface WindowManagerContextValue {
  state: WindowManagerState;
  dispatch: React.Dispatch<WindowManagerAction>;
  openApp: (appType: AppType) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, position: { x: number; y: number }) => void;
  resizeWindow: (id: string, size: { w: number; h: number }) => void;
  toggleActivities: () => void;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

// ===== Provider =====
export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowManagerReducer, initialState);

  const value: WindowManagerContextValue = {
    state,
    dispatch,
    openApp: (appType) => dispatch({ type: 'OPEN_APP', appType }),
    closeWindow: (id) => dispatch({ type: 'CLOSE_WINDOW', id }),
    focusWindow: (id) => dispatch({ type: 'FOCUS_WINDOW', id }),
    minimizeWindow: (id) => dispatch({ type: 'MINIMIZE_WINDOW', id }),
    toggleMaximize: (id) => dispatch({ type: 'TOGGLE_MAXIMIZE', id }),
    moveWindow: (id, position) => dispatch({ type: 'MOVE_WINDOW', id, position }),
    resizeWindow: (id, size) => dispatch({ type: 'RESIZE_WINDOW', id, size }),
    toggleActivities: () => dispatch({ type: 'TOGGLE_ACTIVITIES' }),
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

// ===== Hook =====
export function useWindowManager(): WindowManagerContextValue {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}
