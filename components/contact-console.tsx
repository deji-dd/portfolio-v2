"use client";

import { Check, Copy, Loader2, Send, Terminal } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { SYSTEM_IDENTITY } from "@/lib/system-data";

export function ContactConsole() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SYSTEM_IDENTITY.email);
    setCopied(true);
    toast.success("Email Copied to Clipboard", {
      description: SYSTEM_IDENTITY.email,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !message) {
      toast.error("Validation Error", {
        description: "Please provide both return address and message payload.",
      });
      return;
    }

    if (message.length < 10) {
      toast.error("Payload too short", {
        description: "Message must contain at least 10 characters.",
      });
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Encrypting & transmitting signal packet...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Transmission failed");
      }

      toast.success("Signal Packet Transmitted", {
        id: toastId,
        description: "Your message has been dispatched to the sysadmin frequency.",
      });

      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Network jitter or rate limit encountered.";
      toast.error("Transmission Exception", {
        id: toastId,
        description: `${errorMsg} - Alternatively email ${SYSTEM_IDENTITY.email}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-12 border-b border-[#27272a]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#27272a] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">
              <span>ENCRYPTED DISPATCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Contact Me
            </h2>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#121215] hover:bg-[#18181b] border border-[#27272a] hover:border-zinc-500 text-zinc-300 hover:text-white font-mono text-xs cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{SYSTEM_IDENTITY.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Form Console Full Width */}
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-5 sm:p-6 font-mono text-xs space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <Terminal className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-bold uppercase tracking-wider">SIGNAL_PAYLOAD_CONSOLE</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">256-BIT TLS INGRESS</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest flex justify-between">
                <span>Return Frequency (Your Email)</span>
                <span className="text-[var(--accent)] font-bold">* REQUIRED</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineer@company.com"
                disabled={isSubmitting}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] rounded p-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest flex justify-between">
                <span>Message Payload</span>
                <span className="text-[var(--text-muted)]">{message.length} / 5000 chars</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail project specifications, infrastructure context, or role requirements..."
                disabled={isSubmitting}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] rounded p-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 outline-none transition-all resize-y font-mono leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">
                Target: {SYSTEM_IDENTITY.email}
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--accent)] hover:opacity-90 text-[var(--accent-foreground)] font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_12px_var(--accent-glow)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Signal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
