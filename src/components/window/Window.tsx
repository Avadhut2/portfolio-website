import { useRef, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../types';
import { useWindowManager } from './WindowManagerProvider';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
  isMobile: boolean;
}

const TOPBAR_HEIGHT = 36;

export function Window({ windowState, children, isMobile }: WindowProps) {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow, state } =
    useWindowManager();
  const rndRef = useRef<Rnd | null>(null);
  const isFocused = state.focusedWindowId === windowState.id;

  const handleFocus = useCallback(() => {
    if (!isFocused) {
      focusWindow(windowState.id);
    }
  }, [isFocused, focusWindow, windowState.id]);

  // Mobile: render full-screen
  if (isMobile) {
    return (
      <AnimatePresence>
        {!windowState.isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 flex flex-col"
            style={{ zIndex: windowState.zIndex, top: TOPBAR_HEIGHT }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 py-2.5"
              style={{ background: 'var(--color-os-window-header-focused)' }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--color-os-text-bright)' }}>
                {windowState.icon} {windowState.title}
              </span>
              <button
                onClick={() => closeWindow(windowState.id)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer"
                style={{ background: 'var(--color-os-close)' }}
                aria-label={`Close ${windowState.title}`}
              >
                ✕
              </button>
            </div>
            {/* Mobile content */}
            <div className="flex-1 overflow-auto" style={{ background: 'var(--color-os-window-bg)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: draggable/resizable window
  if (windowState.isMinimized) return null;

  const isMaximized = windowState.isMaximized;
  const position = isMaximized ? { x: 0, y: TOPBAR_HEIGHT } : windowState.position;
  const size = isMaximized
    ? { width: window.innerWidth, height: window.innerHeight - TOPBAR_HEIGHT - 68 }
    : { width: windowState.size.w, height: windowState.size.h };

  return (
    <Rnd
      ref={rndRef}
      position={position}
      size={size}
      minWidth={windowState.minSize.w}
      minHeight={windowState.minSize.h}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      dragHandleClassName="window-drag-handle"
      onDragStop={(_e, d) => moveWindow(windowState.id, { x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, pos) => {
        resizeWindow(windowState.id, {
          w: parseInt(ref.style.width),
          h: parseInt(ref.style.height),
        });
        moveWindow(windowState.id, { x: pos.x, y: pos.y });
      }}
      onMouseDown={handleFocus}
      style={{ zIndex: windowState.zIndex }}
      bounds="parent"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="flex flex-col w-full h-full rounded-xl overflow-hidden"
        style={{
          boxShadow: isFocused
            ? 'var(--shadow-window-focused)'
            : 'var(--shadow-window)',
          border: `1px solid ${isFocused ? 'rgba(137, 180, 250, 0.2)' : 'rgba(137, 180, 250, 0.08)'}`,
        }}
      >
        {/* Window Title Bar */}
        <div
          className="window-drag-handle flex items-center justify-between px-3 py-0 select-none cursor-grab active:cursor-grabbing"
          style={{
            background: isFocused
              ? 'var(--color-os-window-header-focused)'
              : 'var(--color-os-window-header)',
            height: '38px',
            minHeight: '38px',
            transition: 'background 0.2s ease',
          }}
          onDoubleClick={() => toggleMaximize(windowState.id)}
        >
          {/* Title */}
          <span
            className="text-xs font-medium truncate flex-1 text-center"
            style={{
              color: isFocused ? 'var(--color-os-text-bright)' : 'var(--color-os-text-dim)',
            }}
          >
            {windowState.icon} {windowState.title}
          </span>

          {/* Window Controls */}
          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(windowState.id); }}
              className="w-3.5 h-3.5 rounded-full transition-all hover:brightness-110 cursor-pointer"
              style={{ background: 'var(--color-os-minimize)' }}
              aria-label="Minimize"
            />
            <button
              onClick={(e) => { e.stopPropagation(); toggleMaximize(windowState.id); }}
              className="w-3.5 h-3.5 rounded-full transition-all hover:brightness-110 cursor-pointer"
              style={{ background: 'var(--color-os-maximize)' }}
              aria-label="Maximize"
            />
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(windowState.id); }}
              className="w-3.5 h-3.5 rounded-full transition-all hover:brightness-110 cursor-pointer"
              style={{ background: 'var(--color-os-close)' }}
              aria-label="Close"
            />
          </div>
        </div>

        {/* Window Content */}
        <div
          className="flex-1 overflow-auto"
          style={{ background: 'var(--color-os-window-bg)' }}
        >
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
