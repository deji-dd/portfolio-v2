"use client";

import {
  Check,
  ChevronDown,
  Cpu,
  Download,
  FolderGit2,
  History,
  Layers,
  Moon,
  Palette,
  Send,
  Sun,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { triggerCommandPalette } from "@/components/command-palette";
import { useTheme } from "@/components/theme-provider";

export function SystemHeader() {
  const { mode, toggleMode, accent, setAccent, accents, mounted } = useTheme();
  const currentMode = mounted ? mode : "dark";
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMode = () => {
    toggleMode();
  };

  const handleOpenCommandPalette = () => {
    triggerCommandPalette();
  };

  const handleToggleThemeDropdown = () => {
    setThemeDropdownOpen((prev) => !prev);
  };

  const navLinks = [
    { label: "Architecture", href: "#architecture", icon: Layers },
    { label: "Cloud Lab", href: "#cloud-lab", icon: Cpu },
    { label: "Stack Matrix", href: "#stack", icon: FolderGit2 },
    { label: "Changelog", href: "#events", icon: History },
    { label: "Transmit", href: "#contact", icon: Send },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-150 border-b backdrop-blur-md ${
        scrolled
          ? "bg-[var(--bg-primary)]/90 border-[var(--border-subtle)] shadow-lg"
          : "bg-[var(--bg-primary)]/75 border-[var(--border-subtle)]/40"
      }`}
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between font-mono text-xs">
        {/* Left: System Beacon & Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors group"
          >
            <span className="font-bold tracking-tight text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)]">
              AYODEJI.DEV
            </span>
            <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline-block border-l border-[var(--border-subtle)] pl-2">
              v2.4
            </span>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md px-1.5 py-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors uppercase tracking-wider text-[11px]"
              >
                <Icon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Actions & Theme Controls */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={handleToggleMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 h-9 rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer touch-manipulation select-none active:opacity-75"
            title={`Switch to ${currentMode === "dark" ? "Light" : "Dark"} Mode`}
            aria-label={`Switch to ${currentMode === "dark" ? "Light" : "Dark"} Mode`}
          >
            {currentMode === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
            )}
            <span className="hidden xl:inline text-[11px] uppercase tracking-wider font-semibold">
              {currentMode === "dark" ? "LIGHT" : "DARK"}
            </span>
          </button>

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={handleOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 h-9 rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer group touch-manipulation select-none active:opacity-75"
            title="Open Command Palette (Cmd + K)"
            aria-label="Open Command Palette"
          >
            <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Cmd</span>
            <kbd className="px-1 py-0.2 rounded bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] font-mono">
              K
            </kbd>
          </button>

          {/* Theme Accent Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={handleToggleThemeDropdown}
              className="flex items-center gap-1.5 px-2.5 py-1.5 h-9 rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer touch-manipulation select-none active:opacity-75"
              title="Change Theme Accent"
              aria-label="Change Theme Accent"
              aria-expanded={themeDropdownOpen}
            >
              <div
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
            </button>

            {themeDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 cursor-pointer"
                  onClick={() => setThemeDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-48 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-100 touch-manipulation">
                  <div className="px-2 py-1.5 text-[10px] text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-subtle)] mb-1 flex items-center gap-1.5">
                    <Palette className="w-3 h-3" />
                    <span>Signal Accent</span>
                  </div>
                  {accents.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setAccent(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-left text-[11px] transition-colors cursor-pointer touch-manipulation select-none active:opacity-75 ${
                        accent === t.id
                          ? "bg-[var(--bg-surface-hover)] text-[var(--text-primary)] font-medium"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: t.hex }}
                        />
                        <span>{t.name}</span>
                      </div>
                      {accent === t.id && <Check className="w-3 h-3 text-[var(--accent)]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Resume Download Button */}
          <a
            href="/resume.pdf"
            download="Ayodeji_Buraimoh_Resume.pdf"
            className="flex items-center gap-1.5 px-2.5 py-1.5 h-9 rounded bg-[var(--accent-subtle)] hover:bg-[var(--accent)] border border-[var(--accent)]/30 hover:border-[var(--accent)] text-[var(--accent)] hover:text-[var(--accent-foreground)] font-semibold transition-all cursor-pointer touch-manipulation"
            title="Download Full Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] uppercase tracking-wider">Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
