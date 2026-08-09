import { useState, useEffect } from 'react';
import { useWindowManager } from '../window/WindowManagerProvider';

export function TopBar() {
  const { toggleActivities, state } = useWindowManager();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 select-none"
      style={{
        height: '36px',
        background: 'var(--color-os-topbar-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: 'var(--shadow-topbar)',
        zIndex: 9999,
        borderBottom: '1px solid rgba(137, 180, 250, 0.06)',
      }}
    >
      {/* Left: Activities */}
      <button
        onClick={toggleActivities}
        className="text-xs font-medium px-3 py-1 rounded-md transition-all cursor-pointer"
        style={{
          color: state.isActivitiesOpen ? 'var(--color-os-accent)' : 'var(--color-os-text)',
          background: state.isActivitiesOpen ? 'rgba(137, 180, 250, 0.15)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = 'rgba(137, 180, 250, 0.1)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = state.isActivitiesOpen
            ? 'rgba(137, 180, 250, 0.15)'
            : 'transparent';
        }}
      >
        Activities
      </button>

      {/* Center: Clock */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-xs font-medium" style={{ color: 'var(--color-os-text)' }}>
          {formattedDate}
        </span>
        <span className="text-xs font-semibold" style={{ color: 'var(--color-os-text-bright)' }}>
          {formattedTime}
        </span>
      </div>

      {/* Right: System indicators */}
      <div className="flex items-center gap-3">
        <span className="text-xs cursor-default" title="Wi-Fi Connected">📶</span>
        <span className="text-xs cursor-default" title="Volume">🔊</span>
        <span className="text-xs cursor-default" title="Battery 87%">🔋</span>
        <span className="text-xs cursor-default" title="Power">⏻</span>
      </div>
    </div>
  );
}
