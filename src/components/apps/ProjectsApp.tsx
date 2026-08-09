import { useState } from 'react';
import { PROJECTS } from '../../data/projects';
import type { Project } from '../../types';

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <div className="flex flex-col h-full bg-[#1e1e2e] text-white">
        {/* Detail Header */}
        <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-black/20">
          <button
            onClick={() => setSelectedProject(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Back to projects"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold">{selectedProject.title}</h1>
            <p className="text-sm text-gray-400">{selectedProject.pitch}</p>
          </div>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</h2>
              <p className="text-gray-200 leading-relaxed">{selectedProject.description}</p>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">What I Learned</h2>
              <p className="text-gray-200 leading-relaxed">{selectedProject.learnings}</p>
            </section>
            
            {(selectedProject.github || selectedProject.live) && (
              <section className="pt-4 border-t border-white/10 flex gap-4">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium">
                    View Source
                  </a>
                )}
                {selectedProject.live && (
                  <a href={selectedProject.live} target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors font-medium">
                    Live Demo
                  </a>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] text-white overflow-hidden">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-gray-400 mt-1">Stuff I've built and learned from.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col h-full shadow-md hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2 mb-4 line-clamp-2 flex-1">
                {project.pitch}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.stack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 bg-black/30 rounded-md text-gray-300">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 bg-black/30 rounded-md text-gray-300">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
