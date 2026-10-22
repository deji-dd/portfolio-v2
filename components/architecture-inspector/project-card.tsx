"use client";

import { Briefcase, Clock, ExternalLink } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import type { ProjectItem } from "@/lib/types";

import { PreviewViewer } from "./preview-viewer";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      id={`project-${project.id}`}
      className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-zinc-700 transition-colors rounded-lg overflow-hidden font-mono shadow-xl flex flex-col"
    >
      {/* Card Header & Metadata */}
      <div className="p-5 border-b border-[var(--border-subtle)] space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                {project.category}
              </span>
              <span className="text-zinc-700">•</span>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  project.status === "PRODUCTION"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                }`}
              >
                {project.status}
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-500" />
                {project.period}
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-zinc-500" />
                {project.role}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--accent)] mt-0.5 font-mono">{project.tagline}</p>
          </div>

          {/* External Links */}
          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[var(--bg-surface-hover)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-xs cursor-pointer"
                title="View Source Repository"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">REPO</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--accent-subtle)] hover:bg-[var(--accent)] border border-[var(--accent)]/30 text-[var(--accent)] hover:text-[var(--accent-foreground)] font-bold transition-all text-xs cursor-pointer"
                title="Open Live Endpoint"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE</span>
              </a>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Stack Monospace Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Overview & Engineering Capabilities Viewport */}
      <div className="p-4 sm:p-5 flex-1 bg-[var(--bg-primary)]">
        <PreviewViewer preview={project.preview} metrics={project.metrics} title={project.title} />
      </div>
    </div>
  );
}
