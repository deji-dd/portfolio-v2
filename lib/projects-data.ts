import type { ProjectItem } from "./types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "bufferflow",
    title: "Bufferflow",
    tagline:
      "High-throughput ingress gateway, shock-absorbing queue buffer & circuit-breaking worker pool",
    summary:
      "High-throughput ingress gateway and shock absorber buffer engine architected to shield downstream microservices and databases from catastrophic failure during high-volume traffic bursts. Features sub-10ms ingress SLA with instant 202 Accepted, token-bucket rate limiting, LRU idempotency deduplication, an in-memory queue buffer absorbing surges up to 50k+ capacity, a dynamic worker pool with 7 routing strategies (P2C, Least Connections, Consistent Hashing, etc.), tri-state circuit breakers, Dead-Letter Queue (DLQ) replay, PostgreSQL run persistence via Drizzle ORM, and live 250ms WebSocket telemetry streaming with an interactive React DAG pipeline.",
    category: "Infrastructure",
    status: "PRODUCTION",
    role: "Creator & Systems Architect",
    period: "2026 - Present",
    liveUrl: "https://bufferflow.ayodejib.dev",
    repoUrl: "https://github.com/deji-dd/bufferflow",
    stack: [
      "Bun",
      "TypeScript",
      "ElysiaJS",
      "PostgreSQL",
      "Drizzle ORM",
      "Docker",
      "WebSocket",
      "React",
      "Tailwind CSS",
      "XYFlow",
    ],
    metrics: [
      { label: "Ingress SLA", value: "< 10ms (202 Accepted)" },
      { label: "Buffer Capacity", value: "50,000+ In-Memory" },
      { label: "Routing Strategies", value: "7 Dynamic Policies" },
      { label: "Telemetry Stream", value: "250ms WebSockets" },
    ],
    preview: {
      type: "telemetry",
      headline: "BUFFERFLOW // INGRESS GATEWAY & SHOCK ABSORBER ENGINE",
      logs: [
        "[INGRESS] Token bucket rate limiter & LRU idempotency deduplication active (<10ms SLA)",
        "[BUFFER] In-memory FIFO shock absorber queue ready | Capacity: 50,000+ items",
        "[WORKERS] Dynamic worker pool active with 7 routing policies & tri-state circuit breakers",
        "[TELEMETRY] Live 250ms WebSocket telemetry broadcast & PostgreSQL test run persistence",
      ],
      highlights: [
        "Sub-10ms Ingress SLA with instant 202 Accepted, token-bucket rate limiting, and LRU idempotency deduplication",
        "Elastic in-memory shock absorber buffering traffic surges up to 50,000+ requests without downstream exhaustion",
        "7 dynamic load routing algorithms including Power of Two Choices (P2C), Least Connections, and Consistent Hashing",
        "Tri-state circuit breaker per worker (Closed, Open, Half-Open) with automated Dead-Letter Queue (DLQ) replay",
        "Real-time 250ms WebSocket telemetry stream paired with an interactive XYFlow DAG pipeline and Recharts telemetry",
        "Runtime live-ops parameter synchronization and test run history persistence using PostgreSQL and Drizzle ORM",
      ],
    },
  },
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
