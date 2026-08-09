import { useEffect } from 'react';
import { useWindowManager } from '../components/window/WindowManagerProvider';

export function useKeyboardShortcuts() {
  const { state, toggleActivities, closeActivities, closeWindow } = useWindowManager();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Activities with the Super/Windows/Meta key
      if (e.key === 'Meta') {
        toggleActivities();
        return;
      }

      // Escape key behavior
      if (e.key === 'Escape') {
        if (state.isActivitiesOpen) {
          // If activities overview is open, just close it
          closeActivities();
        } else if (state.focusedWindowId) {
          // If no activities overview but a window is focused, close it
          closeWindow(state.focusedWindowId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isActivitiesOpen, state.focusedWindowId, toggleActivities, closeActivities, closeWindow]);
}
