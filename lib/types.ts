export type ThemeAccent = "orange" | "green" | "cyan" | "amber" | "mono";

export interface TopologyNode {
  id: string;
  label: string;
  sublabel: string;
  type: "client" | "edge" | "compute" | "database" | "gateway" | "queue";
  status: "healthy" | "active" | "standby";
  runtime: string;
  protocol: string;
  role: string;
  host: string;
}

export interface TopologyEdge {
  from: string;
  to: string;
  label?: string;
  protocol: string;
  animated?: boolean;
}

export interface DataContract {
  id: string;
  title: string;
  language: "typescript" | "sql" | "json" | "yaml";
  description: string;
  code: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  category: "Infrastructure" | "Fullstack" | "DevOps & Cloud" | "Internal Tooling";
  status: "PRODUCTION" | "ACTIVE" | "ARCHIVED" | "LAB";
  role: string;
  period: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  topology?: {
    nodes: TopologyNode[];
    edges: TopologyEdge[];
  };
  contracts?: DataContract[];
  preview: {
    type: "terminal" | "telemetry" | "dashboard" | "workflow";
    headline: string;
    highlights: string[];
    logs?: string[];
  };
}

export interface SystemEventLog {
  id: string;
  year: string;
  date: string;
  role?: string;
  action?: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  metrics?: string;
}

export interface TechSkill {
  name: string;
  level: "PROD" | "ADVANCED" | "CORE";
  experience: string;
  category: "Frontend Architecture" | "Systems & Cloud" | "Data & Storage" | "Tooling & Protocols";
  highlights: string[];
}
