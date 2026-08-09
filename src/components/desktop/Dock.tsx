import { motion } from 'framer-motion';
import { useWindowManager } from '../window/WindowManagerProvider';
import { APP_REGISTRY } from '../../data/appRegistry';
import type { AppType } from '../../types';

export function Dock({ isMobile }: { isMobile: boolean }) {
  const { openApp, state } = useWindowManager();

  const openAppTypes = new Set(state.windows.map((w) => w.appType));

  if (isMobile) {
    // Mobile: bottom nav
    return (
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 py-1"
        style={{
          background: 'var(--color-os-topbar-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(137, 180, 250, 0.06)',
          zIndex: 9998,
          height: '56px',
        }}
      >
        {APP_REGISTRY.map((app) => (
          <button
            key={app.appType}
            onClick={() => openApp(app.appType as AppType)}
            className="flex flex-col items-center gap-0.5 p-1 cursor-pointer"
          >
            <span className="text-xl">{app.icon}</span>
            <span className="text-[9px]" style={{ color: 'var(--color-os-text-dim)' }}>
              {app.title}
            </span>
          </button>
        ))}
      </div>
    );
  }

  // Desktop: floating dock
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-2 rounded-2xl"
      style={{
        background: 'var(--color-os-dock-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(137, 180, 250, 0.1)',
        boxShadow: 'var(--shadow-dock)',
        zIndex: 9998,
      }}
    >
      {APP_REGISTRY.map((app) => {
        const isOpen = openAppTypes.has(app.appType);
        return (
          <motion.button
            key={app.appType}
            onClick={() => openApp(app.appType as AppType)}
            whileHover={{ scale: 1.2, y: -6 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl transition-colors cursor-pointer"
            style={{
              background: isOpen ? 'rgba(137, 180, 250, 0.12)' : 'transparent',
            }}
            title={app.title}
          >
            <span className="text-2xl">{app.icon}</span>
            {/* Running indicator dot */}
            {isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 w-1 h-1 rounded-full"
                style={{ background: 'var(--color-os-accent)' }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
