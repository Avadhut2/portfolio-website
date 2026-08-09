import { WindowManagerProvider } from './components/window/WindowManagerProvider';
import { Desktop } from './components/desktop/Desktop';

function App() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
}

export default App;
