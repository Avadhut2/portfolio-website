import { useState, useEffect } from 'react';

const BOOT_MESSAGES = [
  '[    0.000000] Linux version 6.5.0-generic (avadhut@buildserver) (gcc (Ubuntu 11.4.0) 11.4.0) #1 SMP PREEMPT_DYNAMIC',
  '[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.5.0 root=UUID=1234 ro quiet splash',
  '[    0.023154] x86/split_lock: #AC: crashing the kernel on kernel split_locks and warning on user-space split_locks',
  '[    0.100412] Memory: 16384K/16777216K available (14336K kernel code, 2560K rwdata, 4096K rodata, 2048K init, 1024K bss, 32768K reserved)',
  '[    0.201243] Run /init as init process',
  '[    0.345123] systemd[1]: Inserted module \'autofs4\'',
  '[    0.412123] systemd[1]: systemd 249.11-0ubuntu3.9 running in system mode (+PAM +AUDIT +SELINUX +APPARMOR)',
  '[    0.432123] systemd[1]: Detected architecture x86-64.',
  '[    0.489312] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)',
  '[    0.512312] systemd[1]: Created slice system-getty.slice.',
  '[    0.583121] systemd[1]: Started Dispatch Password Requests to Console Directory Watch.',
  '[    0.621341] systemd[1]: Reached target Local Encrypted Volumes.',
  '[    0.731213] systemd[1]: Reached target Paths.',
  '[    0.812314] systemd[1]: Started Forward Password Requests to Wall Directory Watch.',
  '[    0.852132] systemd[1]: Reached target Slices.',
  '[    0.912345] systemd[1]: Reached target Swap.',
  '[    1.123124] systemd[1]: Listening on udev Control Socket.',
  '[    1.245123] systemd[1]: Listening on udev Kernel Socket.',
  '[    1.341234] udevd[102]: starting version 3.2.11',
  '[    1.512341] [ OK ] Started Show Plymouth Boot Screen.',
  '[    1.621341] [ OK ] Reached target Sound Card.',
  '[    1.731241] [ OK ] Started Load/Save Random Seed.',
  '[    1.841234] [ OK ] Started Network Manager.',
  '[    2.123451] [ OK ] Reached target Network.',
  '[    2.341234] [ OK ] Started WPA supplicant.',
  '[    2.512341] [ OK ] Started GNOME Display Manager.',
  '[    2.812341] Loading AvadhutOS desktop environment...',
  '[    3.123451] Initialization complete.',
];

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [phase, setPhase] = useState<'vendor' | 'logs' | 'fadeout'>('vendor');

  useEffect(() => {
    // 1. Show vendor logo for 1 second
    const vendorTimer = setTimeout(() => {
      setPhase('logs');
    }, 1500);

    return () => clearTimeout(vendorTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'logs') return;

    // 2. Add logs progressively
    let currentIndex = 0;
    const logTimer = setInterval(() => {
      if (currentIndex < BOOT_MESSAGES.length) {
        setMessages((prev) => [...prev, BOOT_MESSAGES[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(logTimer);
        // Wait a tiny bit then fade out
        setTimeout(() => setPhase('fadeout'), 500);
      }
    }, 70); // speed of typing

    return () => clearInterval(logTimer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'fadeout') {
      const fadeTimer = setTimeout(() => {
        onComplete();
      }, 500); // fade transition duration
      return () => clearTimeout(fadeTimer);
    }
  }, [phase, onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-black text-gray-300 font-mono text-sm z-[9999] transition-opacity duration-500 overflow-hidden flex flex-col ${
        phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={() => onComplete()} // Allow skipping
    >
      {phase === 'vendor' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🐧</div>
          <div className="text-xl font-bold tracking-widest text-white/80 uppercase">AvadhutOS</div>
        </div>
      )}

      {phase === 'logs' && (
        <div className="p-4 flex-1 flex flex-col justify-end overflow-hidden">
          <div className="flex flex-col gap-1 w-full justify-end">
            {messages.map((msg, idx) => (
              <div key={idx} className="whitespace-pre-wrap break-all">
                {msg.startsWith('[ OK ]') ? (
                  <>
                    <span className="text-green-500 font-bold">[  OK  ]</span>
                    <span>{msg.substring(6)}</span>
                  </>
                ) : (
                  msg
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
