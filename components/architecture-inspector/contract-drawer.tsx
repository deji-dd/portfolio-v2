"use client";

import { Check, Copy, FileCode } from "lucide-react";
import { useState } from "react";

import type { DataContract } from "@/lib/types";

interface ContractDrawerProps {
  contracts: DataContract[];
}

export function ContractDrawer({ contracts }: ContractDrawerProps) {
  const [activeTabId, setActiveTabId] = useState<string>(contracts[0]?.id || "");
  const [copied, setCopied] = useState<boolean>(false);

  const activeContract = contracts.find((c) => c.id === activeTabId) || contracts[0];

  const handleCopy = () => {
    if (!activeContract) return;
    navigator.clipboard.writeText(activeContract.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeContract) return null;

  const lines = activeContract.code.split("\n");

  return (
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg overflow-hidden font-mono text-xs">
      {/* Tab Navigation Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] px-3 py-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {contracts.map((contract) => {
            const isSelected = contract.id === activeContract.id;
            return (
              <button
                key={contract.id}
                onClick={() => setActiveTabId(contract.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                }`}
              >
                <FileCode
                  className={`w-3.5 h-3.5 ${isSelected ? "text-[var(--accent)]" : "text-zinc-500"}`}
                />
                <span>{contract.title}</span>
              </button>
            );
          })}
        </div>

        {/* Copy Action */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-[11px]"
          title="Copy Contract Code"
          aria-label="Copy Contract Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span>COPY CONTRACT</span>
            </>
          )}
        </button>
      </div>

      {/* Description Strip */}
      <div className="px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
        <span>{activeContract.description}</span>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
          {lines.length} lines • {activeContract.language}
        </span>
      </div>

      {/* Formatted Code Block with Line Numbers */}
      <div className="p-4 overflow-x-auto max-h-96 text-[12px] leading-relaxed text-[var(--text-secondary)] selection:bg-[var(--accent)] selection:text-[var(--accent-foreground)]">
        <pre className="font-mono">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row group">
                <span className="table-cell pr-4 text-right text-zinc-500 select-none text-[11px] w-8">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre font-mono text-[var(--text-primary)]">
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
