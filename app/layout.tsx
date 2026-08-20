import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { copy } from "@/content/copy";
import { THEME_COLOR } from "@/lib/tokens";

/* Self-hosted variable woff2, latin subset. */
const archivo = localFont({
  src: [
    {
      path: "../fonts/archivo-var-latin.woff2",
      weight: "400 800",
      style: "normal",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const sourceSerif = localFont({
  src: [
    {
      path: "../fonts/source-serif-4-var-latin.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
  variable: "--font-source-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: { default: copy.meta.siteTitle, template: copy.meta.titleTemplate },
  description: copy.meta.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: copy.meta.ogTitle,
    description: copy.meta.ogDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSerif.variable} h-full`}
    >
      <head>
        <meta name="theme-color" content={THEME_COLOR} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
