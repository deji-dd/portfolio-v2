import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { collectHostTelemetry } from "./lib/metrics";

declare const Bun: { version: string } | undefined;

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || "0.0.0.0";

export const app = new Elysia()
  .use(
    cors({
      origin: [
        "https://ayodejib.dev",
        "https://www.ayodejib.dev",
        "https://api.ayodejib.dev",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
      ],
      methods: ["GET", "OPTIONS"],
      credentials: true,
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "Deji Cloud // OS Telemetry & Health API",
          version: "1.0.0",
          description:
            "Real-time host OS kernel, CPU, memory, and service telemetry stream for Ayodeji B.'s cloud infrastructure.",
        },
        tags: [
          { name: "Health", description: "Healthcheck and ping endpoints" },
          { name: "Telemetry", description: "Host OS kernel and hardware telemetry metrics" },
        ],
      },
      path: "/swagger",
    })
  )
  .get(
    "/health",
    () => ({
      status: "healthy",
      timestamp: Date.now(),
      service: "@portfolio/telemetry",
      runtime: typeof Bun !== "undefined" ? `Bun ${Bun.version}` : `Node ${process.version}`,
    }),
    {
      detail: {
        tags: ["Health"],
        summary: "Check telemetry API health and runtime",
      },
    }
  )
  .get(
    "/telemetry",
    ({ set }) => {
      set.headers["Cache-Control"] = "public, max-age=1, s-maxage=2, stale-while-revalidate=5";
      return collectHostTelemetry();
    },
    {
      detail: {
        tags: ["Telemetry"],
        summary: "Retrieve a real-time host OS telemetry snapshot",
      },
    }
  )
  .get(
    "/telemetry/stream",
    () => {
      // Server-Sent Events (SSE) stream emitting every 2 seconds
      return new Response(
        new ReadableStream({
          start(controller) {
            const encoder = new TextEncoder();

            // Send initial snapshot immediately
            const initial = collectHostTelemetry();
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(initial)}\n\n`));

            const interval = setInterval(() => {
              try {
                const data = collectHostTelemetry();
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
              } catch {
                clearInterval(interval);
                controller.close();
              }
            }, 2000);

            // Clean up on disconnect
            return () => clearInterval(interval);
          },
        }),
        {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }
      );
    },
    {
      detail: {
        tags: ["Telemetry"],
        summary: "Live Server-Sent Events (SSE) telemetry stream",
      },
    }
  )
  .listen({ port: PORT, hostname: HOST }, ({ hostname, port }) => {
    console.log(`[TELEMETRY_API] Service running at http://${hostname}:${port}`);
    console.log(
      `[TELEMETRY_API] OpenAPI Swagger docs available at http://${hostname}:${port}/swagger`
    );
  });
