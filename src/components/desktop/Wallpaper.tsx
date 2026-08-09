export function Wallpaper() {
  return (
    <div
      className="fixed inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(137, 180, 250, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(203, 166, 247, 0.1) 0%, transparent 40%),
          radial-gradient(ellipse at 60% 80%, rgba(166, 227, 161, 0.08) 0%, transparent 40%),
          linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 70%, #0f0f1a 100%)
        `,
        zIndex: 0,
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(137, 180, 250, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(137, 180, 250, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
