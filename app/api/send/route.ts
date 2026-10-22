import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import rateLimit from "@/lib/rate-limit";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 users per hour
});
const LIMIT_PER_HOUR = 5;

const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(5000, { message: "Message must be at most 5000 characters" }),
});

export async function POST(req: NextRequest) {
  try {
    // Robust IP Extraction for Rate Limiting
    let ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    const cfIp = req.headers.get("cf-connecting-ip");
    const realIp = req.headers.get("x-real-ip");
    if (cfIp) ip = cfIp;
    else if (realIp) ip = realIp;

    try {
      await limiter.check(LIMIT_PER_HOUR, ip);
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, message } = result.data;

    // Sanitize email and message
    const safeEmail = email.replace(/[\r\n]/g, "");
    const safeMessage = message.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

    if (!resend) {
      // Local or demo mode fallback
      console.log("[CONTACT_API] Resend API key not set. Message logged safely:", {
        from: safeEmail,
        length: safeMessage.length,
      });
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Message received in sandbox mode",
      });
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <contact@mail.ayodejib.dev>",
      to: ["ayodeji@ayodejib.dev"],
      replyTo: safeEmail,
      subject: `New Signal from Portfolio: ${safeEmail}`,
      text: `Sender: ${safeEmail}\n\nMessage:\n${safeMessage}`,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json(
        { error: "Failed to transmit message via email service." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
