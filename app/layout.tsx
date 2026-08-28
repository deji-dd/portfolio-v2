import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayodeji B. // Full Stack Engineer & Systems Administrator",
  description:
    "Production portfolio of Ayodeji B. Merging modern web architectures with resilient, containerized infrastructure. Systems Administration, Next.js, Docker, Linux, and Cloud telemetry.",
  keywords: [
    "Ayodeji B.",
    "Systems Engineer",
    "Systems Administrator",
    "Full Stack Engineer",
    "Next.js",
    "Docker",
    "Linux",
    "Cloud Architecture",
    "DevOps",
    "ERPNext",
  ],
  authors: [{ name: "Ayodeji B.", url: "https://api.ayodejib.dev" }],
  creator: "Ayodeji B.",
  openGraph: {
    title: "Ayodeji B. // Full Stack Engineer & Systems Administrator",
    description:
      "Merging modern web architectures with resilient, containerized infrastructure. Explore interactive project topologies, real-time telemetry, and production contracts.",
    url: "https://ayodejib.dev",
    siteName: "Ayodeji B. Portfolio v2",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayodeji B. // Full Stack Engineer & Systems Administrator",
    description: "Merging modern web architectures with resilient, containerized infrastructure.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="orange"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var mode = localStorage.getItem('portfolio_theme_mode');
                if (mode === 'light') {
                  document.documentElement.setAttribute('data-mode', 'light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.setAttribute('data-mode', 'dark');
                  document.documentElement.classList.add('dark');
                }
                var accent = localStorage.getItem('portfolio_accent_theme');
                if (accent) {
                  document.documentElement.setAttribute('data-theme', accent);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary selection:bg-[var(--accent)] selection:text-[var(--accent-foreground)]">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#121215",
                border: "1px solid #27272a",
                color: "#fafafa",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
