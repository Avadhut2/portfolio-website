export function ResumeApp() {
  return (
    <div className="flex flex-col h-full bg-[#323639]">
      <div className="flex items-center justify-between p-3 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-2 text-white">
          <span>📄</span>
          <span className="font-medium text-sm">Resume</span>
        </div>
        <div className="flex gap-2">
          <a
            href="/resume.pdf"
            download
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded transition-colors"
          >
            Download
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded transition-colors"
          >
            Open in new tab
          </a>
        </div>
      </div>
      <div className="flex-1 w-full h-full relative">
        <iframe
          src="/resume.pdf"
          className="absolute inset-0 w-full h-full border-none"
          title="Resume PDF"
        />
        {/* Helper overlay that only shows briefly or if iframe fails, but standard browsers usually show the native PDF viewer */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 text-gray-400">
          Loading PDF viewer...
        </div>
      </div>
    </div>
  );
}
