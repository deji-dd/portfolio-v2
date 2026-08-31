import { ArchitectureInspectorSection } from "@/components/architecture-inspector";
import { CommandPalette } from "@/components/command-palette";
import { ContactConsole } from "@/components/contact-console";
import { HeroTelemetry } from "@/components/hero-telemetry";
import { SystemEventsLog } from "@/components/system-events-log";
import { SystemFooter } from "@/components/system-footer";
import { SystemHeader } from "@/components/system-header";
import { TechStackMatrix } from "@/components/tech-stack-matrix";

export default function Home() {
  return (
    <div
      id="top"
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col relative selection:bg-[var(--accent)] selection:text-[var(--accent-foreground)]"
    >
      {/* Fixed Ambient Background Grid Pattern */}
      <div className="fixed inset-0 bg-industrial-grid opacity-20 pointer-events-none z-0" />

      {/* Main UI Components */}
      <div className="relative z-10 flex flex-col flex-1">
        <SystemHeader />

        <main className="flex-1 flex flex-col">
          <HeroTelemetry />
          <ArchitectureInspectorSection />
          <TechStackMatrix />
          <SystemEventsLog />
          <ContactConsole />
        </main>

        <SystemFooter />
      </div>

      {/* Global Interactive Command Palette (Cmd + K) */}
      <CommandPalette />
    </div>
  );
}
