import os from "node:os";

export interface HostTelemetry {
  timestamp: number;
  system: {
    hostname: string;
    platform: string;
    kernel: string;
    arch: string;
    uptimeSeconds: number;
    uptimeFormatted: string;
  };
  cpu: {
    model: string;
    cores: number;
    usagePercent: number;
    loadAverage: {
      "1m": number;
      "5m": number;
      "15m": number;
    };
  };
  memory: {
    totalBytes: number;
    freeBytes: number;
    usedBytes: number;
    totalMB: number;
    usedMB: number;
    freeMB: number;
    usagePercent: number;
    processRssMB: number;
    processHeapMB: number;
  };
  services: Array<{
    name: string;
    type: "systemd" | "container" | "runtime";
    status: "UP" | "HEALTHY" | "STANDBY";
    port?: string;
  }>;
}

// CPU usage tracking across interval ticks
let previousCpuTime = getCpuTimes();

function getCpuTimes() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      total += cpu.times[type as keyof typeof cpu.times];
    }
    idle += cpu.times.idle;
  }

  return { idle, total };
}

export function calculateCpuUsagePercent(): number {
  const current = getCpuTimes();
  const idleDiff = current.idle - previousCpuTime.idle;
  const totalDiff = current.total - previousCpuTime.total;

  previousCpuTime = current;

  if (totalDiff === 0) return 0;
  const usage = 100 - Math.floor((idleDiff / totalDiff) * 100);
  return Math.max(0, Math.min(100, usage));
}

export function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0 || d > 0) parts.push(`${h}h`);
  parts.push(`${m}m`);

  return parts.join(" ");
}

export function collectHostTelemetry(): HostTelemetry {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsagePercent = Math.round((usedMem / totalMem) * 1000) / 10;
  const loadAvg = os.loadavg();
  const uptime = Math.floor(os.uptime());
  const procMem = process.memoryUsage();

  return {
    timestamp: Date.now(),
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      kernel: os.release(),
      arch: os.arch(),
      uptimeSeconds: uptime,
      uptimeFormatted: formatUptime(uptime),
    },
    cpu: {
      model: cpus[0]?.model || "Cloud Compute vCPU",
      cores: cpus.length,
      usagePercent: calculateCpuUsagePercent(),
      loadAverage: {
        "1m": Math.round(loadAvg[0] * 100) / 100,
        "5m": Math.round(loadAvg[1] * 100) / 100,
        "15m": Math.round(loadAvg[2] * 100) / 100,
      },
    },
    memory: {
      totalBytes: totalMem,
      freeBytes: freeMem,
      usedBytes: usedMem,
      totalMB: Math.round(totalMem / (1024 * 1024)),
      usedMB: Math.round(usedMem / (1024 * 1024)),
      freeMB: Math.round(freeMem / (1024 * 1024)),
      usagePercent: memUsagePercent,
      processRssMB: Math.round(procMem.rss / (1024 * 1024)),
      processHeapMB: Math.round(procMem.heapUsed / (1024 * 1024)),
    },
    services: [
      {
        name: "sentinel-api",
        type: "systemd",
        status: "UP",
        port: ":3000",
      },
      {
        name: "sentinel-bot",
        type: "systemd",
        status: "HEALTHY",
        port: "WSS",
      },
      {
        name: "sentinel-scheduler",
        type: "systemd",
        status: "UP",
        port: "IPC",
      },
      {
        name: "caddy-reverse-proxy",
        type: "runtime",
        status: "HEALTHY",
        port: ":443",
      },
    ],
  };
}
