"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import type { ThemeAccent } from "@/lib/types";

export type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  accent: ThemeAccent;
  setAccent: (accent: ThemeAccent) => void;
  theme: ThemeAccent;
  setTheme: (accent: ThemeAccent) => void;
  accents: { id: ThemeAccent; name: string; hex: string; desc: string }[];
  mounted: boolean;
}

export const ACCENT_PRESETS: { id: ThemeAccent; name: string; hex: string; desc: string }[] = [
  { id: "orange", name: "Safety Orange", hex: "#FF4F00", desc: "Industrial alert standard" },
  { id: "green", name: "Terminal Green", hex: "#22C55E", desc: "Classic phosphor monitor" },
  { id: "cyan", name: "Cyber Cyan", hex: "#00F0FF", desc: "High-contrast telemetry" },
  { id: "amber", name: "Amber CRT", hex: "#F59E0B", desc: "Warm telemetry phosphor" },
  { id: "mono", name: "Monochrome", hex: "#FAFAFA", desc: "Stark pure monochrome" },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [accent, setAccentState] = useState<ThemeAccent>("orange");

  useEffect(() => {
    try {
      setMounted(true);
      const savedMode = localStorage.getItem("portfolio_theme_mode") as ThemeMode | null;
      if (savedMode === "light" || savedMode === "dark") {
        setModeState(savedMode);
      }
      const savedAccent = localStorage.getItem("portfolio_accent_theme") as ThemeAccent | null;
      if (savedAccent && ACCENT_PRESETS.some((t) => t.id === savedAccent)) {
        setAccentState(savedAccent);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      document.documentElement.setAttribute("data-mode", mode);
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.setAttribute("data-theme", accent);
    } catch {}
  }, [mode, accent, mounted]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_theme_mode", newMode);
        document.documentElement.setAttribute("data-mode", newMode);
        if (newMode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    } catch {}
  };

  const toggleMode = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
  };

  const setAccent = (newAccent: ThemeAccent) => {
    setAccentState(newAccent);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_accent_theme", newAccent);
        document.documentElement.setAttribute("data-theme", newAccent);
      }
    } catch {}
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        accent,
        setAccent,
        theme: accent,
        setTheme: setAccent,
        accents: ACCENT_PRESETS,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
