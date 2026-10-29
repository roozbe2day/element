import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/lib/favorites";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Exceptional Homes & Investments`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://horizonproperties.com"),
  openGraph: {
    title: `${site.name} — Exceptional Homes & Investments`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1F3B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
