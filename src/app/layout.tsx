import type { Metadata } from "next";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SITE_NAME_URL,
  SITE_IMAGE_CLOUDINARY_URL,
} from "@/utils/site";
import localFont from "next/font/local";
import { RootProvider } from "@/provider";

import { cookieToInitialState } from "wagmi";
import { WALLETCONNECT_CONFIG } from "@/constants/config";
import { headers } from "next/headers";
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
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "base",
    "scooper",
    "scooper labs",
    "sweep token",
    "Aggregate low-value assets",
    "valuable",
    "labs",
    "Optimism",
    "Mode",
    "Ethereum",
    "base",
    "onchain summer",
    "single transaction",
    "blockRepo",
    "assetscooper",
    "warpcast",
    "build onchain",
    "onchain",
    "superchain",
    "building the future of onchain",
    "onchain economy",
    "base builder rounds",
    "blockRepo base database",
  ],
  applicationName: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: SITE_IMAGE_CLOUDINARY_URL,
        width: 1200,
        height: 630,
      },
    ],
    siteName: SITE_NAME_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE_CLOUDINARY_URL,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    WALLETCONNECT_CONFIG,
    headers().get("cookie")
  );

  return (
    <html lang="en">
      <head />
      <body className={myFont.className}>
        <RootProvider initialState={initialState}>
          <main>{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
