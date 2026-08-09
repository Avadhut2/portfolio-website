export function AboutApp() {
  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] text-gray-200 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        
        {/* Header Section */}
        <section className="flex flex-col items-center text-center pb-6 border-b border-white/10">
          <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-4xl shadow-lg border-2 border-white/10">
            👨‍💻
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Hi, I'm Avadhut! 👋</h1>
          <p className="text-lg text-blue-300 font-medium">First-Year AI/ML BTech Student</p>
        </section>

        {/* Bio Section */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>🚀</span> About Me
          </h2>
          <p className="leading-relaxed">
            I am a passionate first-year BTech student specializing in Artificial Intelligence and Machine Learning. 
            I love building things that live on the internet, from deep learning models predicting anomalies to 
            interactive web applications (like this OS you're currently exploring!).
          </p>
          <p className="leading-relaxed">
            My journey in tech is driven by curiosity. Whether it's teaching an AI to play Flappy Bird, detecting 
            brain tumors with CNNs, or crafting slick UI components, I'm always looking for the next puzzle to solve.
          </p>
        </section>

        {/* Education Section */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>🎓</span> Academic Context
          </h2>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="font-medium text-white">Bachelor of Technology (BTech)</h3>
            <p className="text-blue-300 text-sm mb-2">Specialization: Artificial Intelligence & Machine Learning</p>
            <p className="text-sm text-gray-400">
              Currently focusing on core computer science fundamentals, data structures, and foundational mathematics 
              for machine learning algorithms. Actively participating in hackathons and open-source projects outside of class.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>⚡</span> Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Languages</h4>
              <ul className="text-sm space-y-1">
                <li>Python</li>
                <li>TypeScript / JavaScript</li>
                <li>Java</li>
                <li>C / C++</li>
              </ul>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI / ML</h4>
              <ul className="text-sm space-y-1">
                <li>TensorFlow / Keras</li>
                <li>PyTorch</li>
                <li>OpenCV</li>
                <li>Scikit-Learn</li>
              </ul>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Web / Tools</h4>
              <ul className="text-sm space-y-1">
                <li>React & Vite</li>
                <li>Tailwind CSS</li>
                <li>Git & GitHub</li>
                <li>Linux / Bash</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Interests */}
        <section className="space-y-3 pb-8">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>🎯</span> When I'm Not Coding
          </h2>
          <p className="leading-relaxed">
            You'll probably find me exploring new Linux distros, reading up on the latest AI research papers, 
            or thinking about space exploration technology.
          </p>
        </section>

      </div>
    </div>
  );
}
