import { useState } from 'react';
import { WindowManagerProvider } from './components/window/WindowManagerProvider';
import { Desktop } from './components/desktop/Desktop';
import { BootScreen } from './components/boot/BootScreen';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
      
      {/* We keep the desktop mounted behind the boot screen, but maybe not visible or just behind the z-index */}
      <div className={isBooting ? 'hidden' : 'block h-full w-full'}>
        <WindowManagerProvider>
          <Desktop />
        </WindowManagerProvider>
      </div>
    </>
  );
}

export default App;
