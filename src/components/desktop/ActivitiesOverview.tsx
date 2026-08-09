import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../window/WindowManagerProvider';

export function ActivitiesOverview() {
  const { state, focusWindow, closeWindow } = useWindowManager();

  if (!state.isActivitiesOpen) return null;

  const openWindows = state.windows;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9000] flex flex-col items-center pt-24 pb-32 px-12 overflow-y-auto"
        style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        onClick={() => focusWindow(state.focusedWindowId || '')} // Close activities on background click
      >
        <div 
          className="flex flex-wrap gap-8 justify-center items-center max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()} // Prevent background click from triggering
        >
          {openWindows.length === 0 && (
            <div className="text-white/50 text-lg mt-20">No open windows</div>
          )}
          
          {openWindows.map((win) => (
            <motion.div
              key={win.id}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
              className="relative group cursor-pointer flex flex-col items-center gap-3"
              onClick={() => focusWindow(win.id)}
            >
              <div 
                className="w-64 h-40 rounded-xl border border-white/10 shadow-2xl flex items-center justify-center transition-all duration-200 group-hover:border-white/30 group-hover:scale-105"
                style={{ background: 'var(--color-os-window-bg)' }}
              >
                <div className="text-6xl">{win.icon}</div>
                
                {/* Close Button on Hover */}
                <button
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(win.id);
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <span className="text-white font-medium text-sm px-3 py-1 rounded-full bg-black/40">
                {win.title}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
