"use client";

import {
  ArrowRight,
  Code2,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FolderGit2,
  History,
  Layers,
  Palette,
  Search,
  Send,
  Terminal,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useTheme } from "@/components/theme-provider";
import { PROJECTS_DATA } from "@/lib/projects-data";
import { SYSTEM_IDENTITY } from "@/lib/system-data";
import type { ThemeAccent } from "@/lib/types";

interface PaletteCommand {
  id: string;
  category: "Navigation" | "Projects" | "Theme Presets" | "Actions" | "External Links";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

let globalOpenPalette: (() => void) | null = null;

export function triggerCommandPalette() {
  if (globalOpenPalette) {
    globalOpenPalette();
  } else if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { mode, toggleMode, setAccent, accents, mounted } = useTheme();
  const currentMode = mounted ? mode : "dark";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    globalOpenPalette = () => {
      setSearch("");
      setSelectedIndex(0);
      setIsOpen(true);
    };
    return () => {
      globalOpenPalette = null;
    };
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setSearch("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setSearch("");
      setSelectedIndex(0);
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const commands: PaletteCommand[] = useMemo(() => {
    const list: PaletteCommand[] = [
      // Navigation
      {
        id: "nav-top",
        category: "Navigation",
        title: "goto /hero",
        subtitle: "Top of system telemetry",
        icon: Terminal,
        action: () => scrollTo("top"),
      },
      {
        id: "nav-arch",
        category: "Navigation",
        title: "goto /architecture",
        subtitle: "Production systems & DAG inspector",
        icon: Layers,
        action: () => scrollTo("architecture"),
      },
      {
        id: "nav-lab",
        category: "Navigation",
        title: "goto /cloud-lab",
        subtitle: "Live Azure virtualization HUD",
        icon: Cpu,
        action: () => scrollTo("cloud-lab"),
      },
      {
        id: "nav-stack",
        category: "Navigation",
        title: "goto /stack",
        subtitle: "Systems & fullstack skills matrix",
        icon: FolderGit2,
        action: () => scrollTo("stack"),
      },
      {
        id: "nav-events",
        category: "Navigation",
        title: "goto /events",
        subtitle: "Deployment history & changelog",
        icon: History,
        action: () => scrollTo("events"),
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: "goto /contact",
        subtitle: "Direct signal transmission console",
        icon: Send,
        action: () => scrollTo("contact"),
      },

      // Projects
      ...PROJECTS_DATA.map((p) => ({
        id: `project-${p.id}`,
        category: "Projects" as const,
        title: `inspect /project/${p.id}`,
        subtitle: `${p.title} (${p.category})`,
        icon: Code2,
        action: () => scrollTo(`project-${p.id}`),
      })),

      // Mode Toggle
      {
        id: "theme-toggle-mode",
        category: "Theme Presets" as const,
        title: `toggle mode /${currentMode === "dark" ? "light" : "dark"}`,
        subtitle: `Switch system to ${currentMode === "dark" ? "Light" : "Dark"} Mode`,
        icon: Palette,
        action: () => {
          toggleMode();
          toast.success(`Switched to ${currentMode === "dark" ? "Light" : "Dark"} Mode`);
          setIsOpen(false);
        },
      },

      // Theme Presets
      ...accents.map((t) => ({
        id: `theme-${t.id}`,
        category: "Theme Presets" as const,
        title: `set theme /accent/${t.id}`,
        subtitle: `${t.name} - ${t.desc}`,
        icon: Palette,
        action: () => {
          setAccent(t.id as ThemeAccent);
          toast.success(`Theme Switched to ${t.name}`);
          setIsOpen(false);
        },
      })),

      // Actions
      {
        id: "act-copy-email",
        category: "Actions",
        title: "copy /contact/email",
        subtitle: SYSTEM_IDENTITY.email,
        icon: Copy,
        action: () => {
          navigator.clipboard.writeText(SYSTEM_IDENTITY.email);
          toast.success("Copied email to clipboard");
          setIsOpen(false);
        },
      },
      {
        id: "act-download-resume",
        category: "Actions",
        title: "download /resume/resume.pdf",
        subtitle: "Download official PDF resume",
        icon: Download,
        action: () => {
          const a = document.createElement("a");
          a.href = "/resume.pdf";
          a.download = "Ayodeji_Buraimoh_Resume.pdf";
          a.click();
          toast.success("Downloading Resume PDF");
          setIsOpen(false);
        },
      },

      // External Links
      {
        id: "ext-github",
        category: "External Links",
        title: "open /github/deji-dd",
        subtitle: SYSTEM_IDENTITY.github,
        icon: GithubIcon,
        action: () => {
          window.open(SYSTEM_IDENTITY.github, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "ext-linkedin",
        category: "External Links",
        title: "open /linkedin/ayodeji-buraimoh",
        subtitle: SYSTEM_IDENTITY.linkedin,
        icon: LinkedinIcon,
        action: () => {
          window.open(SYSTEM_IDENTITY.linkedin, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "ext-lab",
        category: "External Links",
        title: "open /cloud-lab/endpoint",
        subtitle: `https://${SYSTEM_IDENTITY.host}`,
        icon: ExternalLink,
        action: () => {
          window.open(`https://${SYSTEM_IDENTITY.host}`, "_blank");
          setIsOpen(false);
        },
      },
    ];

    return list;
  }, [accents, setAccent, currentMode, toggleMode]);

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const q = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q)
    );
  }, [search, commands]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev === 0 ? filteredCommands.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-100 touch-manipulation cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div
        className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-2xl overflow-hidden font-mono text-xs flex flex-col max-h-[70vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] gap-3">
          <Search className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or theme (e.g. 'goto /arch', 'theme', 'copy')..."
            className="w-full bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none text-xs"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)]">
            ESC
          </kbd>
        </div>

        {/* Command Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-[var(--border-subtle)]">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-[var(--text-muted)] text-xs">
              No matching commands found for &quot;{search}&quot;.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  type="button"
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-all cursor-pointer text-left touch-manipulation select-none ${
                    isSelected
                      ? "bg-[var(--bg-surface-hover)] border border-[var(--border-active)] text-[var(--text-primary)]"
                      : "border border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded transition-colors ${
                        isSelected
                          ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-bold"
                          : "bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)] text-xs">
                        {cmd.title}
                      </div>
                      {cmd.subtitle && (
                        <div className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">
                          {cmd.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] uppercase">
                      {cmd.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[10px] text-[var(--text-muted)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Execute</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[var(--accent)] font-semibold">
            {filteredCommands.length} AVAILABLE
          </span>
        </div>
      </div>
    </div>
  );
}
