"use client";

import {
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Info,
  Layers,
  Radio,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";

import type { TopologyEdge, TopologyNode } from "@/lib/types";

interface TopologyViewerProps {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  projectTitle: string;
}

export function TopologyViewer({ nodes, edges, projectTitle }: TopologyViewerProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0]?.id || "");

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const getNodeIcon = (type: TopologyNode["type"]) => {
    switch (type) {
      case "client":
        return Globe;
      case "edge":
        return Zap;
      case "compute":
        return Cpu;
      case "database":
        return Database;
      case "gateway":
        return Radio;
      default:
        return Server;
    }
  };

  return (
    <div className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-4 font-mono text-xs space-y-4">
      {/* Top Topology Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-2 text-[11px]">
        <div className="flex items-center gap-2 text-zinc-400">
          <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="uppercase font-semibold text-zinc-200">
            System Topology DAG // {projectTitle}
          </span>
        </div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive Nodes (Hover or Click)</span>
        </div>
      </div>

      {/* Main Node Diagram Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-2">
        {nodes.map((node, index) => {
          const Icon = getNodeIcon(node.type);
          const isSelected = activeNode?.id === node.id;

          return (
            <div
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              className={`relative p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? "bg-[#18181b] border-[var(--accent)] shadow-[0_0_15px_var(--accent-subtle)]"
                  : "bg-[#121215] border-[#27272a] hover:border-zinc-500"
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded ${
                      isSelected
                        ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-bold"
                        : "bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    NODE_0{index + 1}
                  </span>
                </div>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                    node.status === "healthy" || node.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {node.status}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white tracking-tight">{node.label}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{node.sublabel}</p>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                <span>{node.protocol.split(" ")[0]}</span>
                <span className="text-[var(--accent)] font-semibold truncate max-w-[120px] text-right">
                  {node.host}
                </span>
              </div>

              {/* Edge arrow indicator if not last */}
              {index < nodes.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 items-center justify-center pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node HUD Specification Overlay */}
      {activeNode && (
        <div className="mt-4 p-4 rounded-lg bg-[#121215] border border-[#27272a] text-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
              <span className="font-bold text-white uppercase tracking-wider">
                Node Specification: {activeNode.label}
              </span>
              <span className="text-[10px] text-zinc-500">[{activeNode.id}]</span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-zinc-500">RUNTIME:</span>
              <span className="text-zinc-200 font-bold">{activeNode.runtime}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            <div className="p-2 rounded bg-[#09090b] border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">Protocol</span>
              <span className="text-zinc-200 font-semibold">{activeNode.protocol}</span>
            </div>
            <div className="p-2 rounded bg-[#09090b] border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">Host Environment</span>
              <span className="text-zinc-200 font-semibold">{activeNode.host}</span>
            </div>
            <div className="p-2 rounded bg-[#09090b] border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">Architectural Role</span>
              <span className="text-zinc-200">{activeNode.role}</span>
            </div>
            <div className="p-2 rounded bg-[#09090b] border border-zinc-900">
              <span className="text-[9px] text-zinc-500 block uppercase">Topology Class</span>
              <span className="text-[var(--accent)] font-bold uppercase">{activeNode.type}</span>
            </div>
          </div>

          {/* Interconnection flow notes */}
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 pt-1">
            <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>
              Connected via {edges.map((e) => `${e.from} → ${e.to} (${e.protocol})`).join(" | ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
