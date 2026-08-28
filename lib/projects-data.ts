import type { ProjectItem } from "./types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "sentinel-monorepo",
    title: "Sentinel v2",
    tagline:
      "Decoupled Bun monorepo unifying ElysiaJS REST API, Discord.js bot, and background scheduler",
    summary:
      "Decoupled Bun monorepo architecture unifying a high-throughput ElysiaJS REST API (@sentinel/api), an asynchronous Discord automation bot (@sentinel/bot with @resvg/resvg-js vector rendering), a background cron worker (@sentinel/scheduler), and 3 React web dashboards (@sentinel/user-dashboard, @sentinel/bot-dashboard, @sentinel/tt-selector). Features OpenAPI TypeScript schema generation and Drizzle ORM SQLite persistence.",
    category: "Fullstack",
    status: "PRODUCTION",
    role: "Creator & Systems Architect",
    period: "2025 - Present",
    repoUrl: "https://github.com/deji-dd/sentinel-v2",
    stack: [
      "Bun",
      "TypeScript",
      "ElysiaJS",
      "Drizzle ORM",
      "SQLite",
      "Discord.js",
      "Resvg",
      "Systemd",
    ],
    metrics: [
      { label: "Monorepo Workspaces", value: "9 Packages & Services" },
      { label: "P99 API Latency", value: "< 3.5ms" },
      { label: "Vector Renderer", value: "Resvg Native SVG->PNG" },
      { label: "Deployment", value: "Linux Systemd" },
    ],
    preview: {
      type: "terminal",
      headline: "SENTINEL V2 // DECOUPLED BUN MONOREPO",
      logs: [
        "[SENTINEL] Monorepo services initialized: @sentinel/api, @sentinel/bot, @sentinel/scheduler",
        "[ELYSIA] API running at http://0.0.0.0:3000 | Swagger docs at /swagger",
        "[DRIZZLE] SQLite WAL engine connected | Tables: worker_schedules, system_alerts",
        "[DISCORD] Bot gateway connected with Resvg vector territory rasterizer",
      ],
      highlights: [
        "Decoupled Bun monorepo architecture with 9 workspaces (@sentinel/*)",
        "High-throughput ElysiaJS REST API with automatic OpenAPI Swagger documentation",
        "Resvg C++ native vector SVG rasterizer for PNG alert dispatches",
        "Drizzle ORM + SQLite WAL-mode engine & Systemd daemon deployment",
      ],
    },
  },
];
