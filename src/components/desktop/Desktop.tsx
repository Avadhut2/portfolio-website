import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { Wallpaper } from './Wallpaper';
import { Window } from '../window/Window';
import { AppRenderer } from '../window/AppRenderer';
import { useWindowManager } from '../window/WindowManagerProvider';
import { useIsMobile } from '../../hooks/useIsMobile';

export function Desktop() {
  const { state } = useWindowManager();
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Wallpaper */}
      <Wallpaper />

      {/* Top Bar */}
      <TopBar />

      {/* Windows */}
      <div
        className="absolute inset-0"
        style={{ top: '36px', bottom: isMobile ? '56px' : '0px' }}
      >
        {state.windows.map((win) => (
          <Window key={win.id} windowState={win} isMobile={isMobile}>
            <AppRenderer appType={win.appType} />
          </Window>
        ))}
      </div>

      {/* Dock */}
      <Dock isMobile={isMobile} />
    </div>
  );
}
