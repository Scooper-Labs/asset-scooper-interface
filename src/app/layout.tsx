import RootProviders from "@/components/Providers";
import type { Metadata, Viewport } from "next";
import {
  SITE_DESCRIPTION,
  SITE_INFO,
  SITE_NAME,
  SITE_URL,
  SOCIAL_TWITTER,
} from "@/utils/site";
import localFont from "next/font/local";
import AppHome from ".";

import "./globals.css";

const myFont = localFont({
  src: [
    {
      path: "../assets/fonts/Moderat-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/Moderat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Moderat-Bold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} · ${SITE_INFO}`,
    template: `${SITE_NAME} · %s`,
  },
  metadataBase: new URL(SITE_URL),
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: "/opengraph-image",
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIAL_TWITTER,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: "/opengraph-image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1.0,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={myFont.className}>
        <RootProviders>
          <AppHome> {children}</AppHome>
        </RootProviders>
      </body>
    </html>
  );
}
