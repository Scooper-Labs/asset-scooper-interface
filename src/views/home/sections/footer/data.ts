import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";

const scooperSocialLinks = [
  { icon: FaXTwitter, url: "https://x.com/assetscooper", ariaLabel: "X" },
  {
    icon: FaGithub,
    url: "https://github.com/scooper-labs",
    ariaLabel: "GitHub",
  },
  {
    icon: BiLogoTelegram,
    url: "https://t.me/assetscooper",
    ariaLabel: "Telegram",
  },
  {
    icon: SiFarcaster,
    url: "#",
    ariaLabel: "Farcaster",
  },
];

const scooperFooterSocialLinks = [
  { icon: FaXTwitter, url: "https://x.com/assetscooper", ariaLabel: "X" },
  {
    icon: FaGithub,
    url: "https://github.com/scooper-labs",
    ariaLabel: "GitHub",
  },
  {
    icon: SiFarcaster,
    url: "#",
    ariaLabel: "Farcaster",
  },
];

export { scooperSocialLinks, scooperFooterSocialLinks };
