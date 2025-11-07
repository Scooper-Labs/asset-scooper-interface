import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "www.datocms-assets.com",
			},
			{
				protocol: "https",
				hostname: "logos.covalenthq.com",
			},
		],
	},
};

export default nextConfig;
