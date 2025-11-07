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
import { headers } from "next/headers";
import "./globals.css";

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersObj = await headers();
	const cookies = headersObj.get("cookie");

	return (
		<html lang="en">
			<head />
			<body className={myFont.className}>
				<RootProvider cookies={cookies}>
					<main>{children}</main>
				</RootProvider>
			</body>
		</html>
	);
}
