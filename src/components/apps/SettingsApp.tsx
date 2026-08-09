import React from 'react';

const SystemInfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex py-3 border-b border-white/5">
    <div className="w-1/3 text-gray-400 font-medium text-sm">{label}</div>
    <div className="w-2/3 text-gray-200 text-sm">{value}</div>
  </div>
);

export function SettingsApp() {
  return (
    <div className="flex h-full text-white bg-[#1e1e2e]">
      {/* Sidebar */}
      <div className="w-48 bg-black/20 border-r border-white/5 flex flex-col py-4">
        <div className="px-4 py-2 font-medium bg-white/10 mx-2 rounded-lg cursor-default">
          About
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-lg mb-4">
              💻
            </div>
            <h1 className="text-2xl font-semibold">Avadhut's Portfolio</h1>
          </div>
          
          {/* Info Card */}
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden px-6 py-2">
            <SystemInfoRow label="Hardware Model" value="Web Browser Environment" />
            <SystemInfoRow label="Memory" value="16.0 GiB" />
            <SystemInfoRow label="Processor" value="AI/ML Brain v1" />
            <SystemInfoRow label="Graphics" value="WebGL API" />
            <SystemInfoRow label="Disk Capacity" value="Infinite" />
          </div>

          <h2 className="text-sm font-semibold text-gray-400 mt-8 mb-4 uppercase tracking-wider px-2">Software</h2>
          
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden px-6 py-2">
            <SystemInfoRow label="OS Name" value="AvadhutOS 24.04 LTS" />
            <SystemInfoRow label="OS Type" value="64-bit" />
            <SystemInfoRow label="Windowing System" value="React/Framer Motion" />
            <SystemInfoRow label="Kernel Version" value="React 19" />
          </div>
        </div>
      </div>
    </div>
  );
}
