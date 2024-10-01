import { Box } from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";

import LandingHeader from "./navbar";
import HeroSection from "./hero";
import SectionOne from "./sections/SectionOne";
import SectionTwo from "./sections/SectionTwo";
import Footer from "./sections/footer";
import AnnouncementNavbar from "@/components/AnnouncementNavbar";

export default function HomeView() {
  return (
    <Box bg={COLORS.darkBG} h="full" w="full">
      <AnnouncementNavbar />
      <LandingHeader />
      <HeroSection />
      <SectionOne />
      <SectionTwo />
      <Footer />
    </Box>
  );
}
