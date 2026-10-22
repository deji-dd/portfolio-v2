import type { SystemEventLog, TechSkill } from "./types";

export const SYSTEM_IDENTITY = {
  name: "Ayodeji B.",
  fullName: "Ayodeji AbdulHaqq Buraimoh",
  role: "Full-Stack Software Engineer & Systems Administrator",
  tagline:
    "I engineer high-throughput web applications and maintain production-grade containerized infrastructure. Experienced in deploying enterprise ERP systems, configuring Linux/Windows virtual machines, hardening network firewalls, and building modern full-stack platforms with TypeScript and Bun.",
  location: "Lagos, NG",
  coordinates: "06°31'N 03°23'E",
  timezone: "Africa/Lagos (UTC+1)",
  status: "ONLINE // OPERATIONAL",
  host: "api.ayodejib.dev",
  email: "ayodeji@ayodejib.dev",
  github: "https://github.com/deji-dd",
  linkedin: "https://www.linkedin.com/in/ayodeji-buraimoh-1368b9243/",
  resume: "/resume.pdf",
  education: "University of Ilorin (2021 - 2026) — B.Eng. Computer Engineering",
  bio: [
    "I operate at the convergence of high-density web application engineering and bare-metal/cloud infrastructure administration.",
    "My engineering discipline was honed at BT Technologies and across independent client engagements—transitioning from physical server racks, Active Directory (AD DS), and Hyper-V virtual machines to orchestrating containerized ERP deployments, ElysiaJS/Bun microservices, and edge scheduling platforms.",
    "I believe great software is architected with mechanical precision: fast, deterministic, observable, and built to survive production failures.",
  ],
  stats: [
    { label: "Systems & Web Experience", value: "4+ Years" },
    { label: "Production Clusters", value: "8+ Deployed" },
    { label: "System Reliability Target", value: "99.9%" },
    { label: "Edge Network SLA", value: "< 50ms" },
  ],
};

export const SYSTEM_EVENTS: SystemEventLog[] = [
  {
    id: "exp-bt-tech",
    year: "2024",
    date: "Aug 2024 - Present",
    role: "Full-Stack Developer & Systems Administrator",
    title: "BT Technologies, Lagos NG",
    org: "BT Technologies",
    description:
      "Redesigned corporate web platform with responsive UI and Resend inquiry pipeline. Built internal invoice tracking system to manage client billing lifecycles and centralized technical documentation portal. Deployed Frappe ERPNext & HRMS environments. Administered Windows Server AD DS infrastructure with automated GPOs and VM snapshot redundancy.",
    tags: [
      "Next.js",
      "TypeScript",
      "Frappe ERPNext",
      "Windows Server",
      "Active Directory",
      "Docker",
      "Hyper-V",
      "Resend API",
    ],
  },
  {
    id: "exp-bufferflow",
    year: "2026",
    date: "2026 - Present",
    role: "Creator & Systems Architect",
    title: "Bufferflow",
    org: "High-Throughput Ingress & Buffering Architecture",
    description:
      "Engineered a high-throughput ingress gateway and shock-absorbing buffer engine in Bun and ElysiaJS. Implemented token-bucket rate limiting, LRU idempotency deduplication, sub-10ms 202 ingress SLA, 7 dynamic load routing algorithms, circuit-breaking worker pool, DLQ replay, and real-time 250ms WebSocket telemetry streaming with an interactive React DAG pipeline.",
    tags: [
      "Bun",
      "TypeScript",
      "ElysiaJS",
      "Docker",
      "PostgreSQL",
      "Drizzle ORM",
      "WebSockets",
      "XYFlow",
      "Tailwind CSS",
    ],
  },
  {
    id: "exp-sentinel",
    year: "2025",
    date: "2025 - Present",
    role: "Creator & Systems Architect",
    title: "Sentinel v2",
    org: "Personal Architecture",
    description:
      "Architected a decoupled Bun monorepo unifying a high-throughput ElysiaJS REST API, an asynchronous Discord automation bot, and a background cron worker with C++ Resvg vector rendering and Linux systemd daemon deployment.",
    tags: [
      "Bun",
      "TypeScript",
      "ElysiaJS",
      "Drizzle ORM",
      "SQLite WAL",
      "Discord.js",
      "Resvg",
      "Systemd",
    ],
  },
  {
    id: "exp-cloud-lab",
    year: "2024",
    date: "2024 - Present",
    role: "Systems & DevOps",
    title: "Cloud Lab",
    org: "Cloud Infrastructure",
    description:
      "Provisioned and maintain production Linux VPS environment. Configured Nginx Proxy Manager as centralized reverse proxy with automated Let's Encrypt SSL renewals, hardened edge networking via Cloudflare Tunnels, and established zero-trust Tailscale WireGuard administration.",
    tags: [
      "Linux (Ubuntu)",
      "Docker",
      "Portainer",
      "Nginx Proxy Manager",
      "Tailscale",
      "Cloudflare Tunnels",
      "SSL/TLS",
    ],
  },
  {
    id: "exp-freelance",
    year: "2023",
    date: "2023 - Present",
    role: "Independent Contractor",
    title: "Freelance Full-Stack Engineering",
    org: "Client Engagements",
    description:
      "Engineered edge-backed appointment scheduling platform (Ornate Mental Health) using Cloudflare KV and automated dual-party confirmations via Resend. Built secure multi-part document intake pipeline with server-side MIME verification (Glorious Eagles) and non-profit donation platform with Donorbox (Ginoba Foundation).",
    tags: [
      "React",
      "Next.js",
      "Cloudflare KV",
      "Node.js",
      "MIME Verification",
      "Resend API",
      "Donorbox",
      "Tailwind CSS",
    ],
  },
];

export const TECH_SKILLS: TechSkill[] = [
  // Frontend Architecture
  {
    name: "React, Next.js & Vite",
    level: "PROD",
    experience: "3+ yrs",
    category: "Frontend Architecture",
    highlights: ["App Router & SSR", "Vite SPAs", "Client Hydration", "Geospatial Leaflet.js"],
  },
  {
    name: "TypeScript & JavaScript",
    level: "PROD",
    experience: "4+ yrs",
    category: "Frontend Architecture",
    highlights: ["Strict Type Systems", "Zod Validation", "Async Generators", "Modern ESNext"],
  },
  {
    name: "Tailwind CSS & Responsive UI",
    level: "PROD",
    experience: "4+ yrs",
    category: "Frontend Architecture",
    highlights: [
      "Industrial Layouts",
      "Dark/Light Design Tokens",
      "Container Queries",
      "Accessible A11y",
    ],
  },

  // Systems & Cloud (Backend, Cloud, DevOps & SysAdmin)
  {
    name: "Node.js, Bun & ElysiaJS",
    level: "PROD",
    experience: "3+ yrs",
    category: "Systems & Cloud",
    highlights: ["ElysiaJS REST APIs", "Express.js", "High-Throughput Ingress", "Webhooks & SSE"],
  },
  {
    name: "Python",
    level: "PROD",
    experience: "3+ yrs",
    category: "Systems & Cloud",
    highlights: ["Backend Automation", "Custom Frappe Hooks", "Data Pipelines", "Scripting"],
  },
  {
    name: "Docker, Portainer & NPM",
    level: "PROD",
    experience: "2+ yrs",
    category: "Systems & Cloud",
    highlights: ["Nginx Proxy Manager", "Container Networking", "SSL/TLS Renewals", "Portainer"],
  },
  {
    name: "Cloudflare, Tunnels & WireGuard",
    level: "PROD",
    experience: "2+ yrs",
    category: "Systems & Cloud",
    highlights: [
      "Cloudflare Workers & KV",
      "Tailscale Zero-Trust",
      "Cloudflared Tunnels",
      "No Public Open Ports",
    ],
  },
  {
    name: "Linux (Debian/Ubuntu) & GCP/Azure",
    level: "PROD",
    experience: "3+ yrs",
    category: "Systems & Cloud",
    highlights: [
      "Ubuntu Server 24.04",
      "Systemd Daemons",
      "GCP & Azure Compute",
      "Uptime Hardening",
    ],
  },
  {
    name: "Windows Server & Active Directory",
    level: "PROD",
    experience: "2+ yrs",
    category: "Systems & Cloud",
    highlights: [
      "Active Directory (AD DS)",
      "Group Policy (GPOs)",
      "Hyper-V VMs",
      "Automated Provisioning",
    ],
  },

  // Data & Storage
  {
    name: "PostgreSQL, SQLite & Drizzle ORM",
    level: "PROD",
    experience: "3+ yrs",
    category: "Data & Storage",
    highlights: ["SQLite WAL Mode", "Prisma ORM", "Drizzle Kit Migrations", "Relational Indexing"],
  },
  {
    name: "MongoDB & Supabase",
    level: "PROD",
    experience: "2+ yrs",
    category: "Data & Storage",
    highlights: ["Document Stores", "Managed Postgres", "Auth Row-Level Security", "Schema Design"],
  },
  {
    name: "Redis & Cache Layers",
    level: "PROD",
    experience: "2+ yrs",
    category: "Data & Storage",
    highlights: ["In-Memory Caching", "Cloudflare KV", "Fast Key-Value Lookup", "State Locking"],
  },

  // Tooling & Protocols
  {
    name: "GitHub Actions & CI/CD",
    level: "PROD",
    experience: "3+ yrs",
    category: "Tooling & Protocols",
    highlights: ["Self-Hosted Runners", "Automated SSH Deployments", "Bun fmt", "Build Pipelines"],
  },
  {
    name: "Resend API & Transactional Messaging",
    level: "PROD",
    experience: "2+ yrs",
    category: "Tooling & Protocols",
    highlights: ["Dual-Party Confirmations", "Inquiry Pipelines", "Dynamic Email Templates"],
  },
  {
    name: "Discord.js & Bot Automation",
    level: "PROD",
    experience: "2+ yrs",
    category: "Tooling & Protocols",
    highlights: ["WSS Gateway Events", "Resvg Native Buffer Dispatch", "Real-Time State Alerts"],
  },
];
