import { useEffect, useState } from "react";

interface IScreen {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useScreenSize = () => {
  const mobileBreakpoint = 640;
  const tabletBreakpoint = 768;

  const [screenType, setScreenType] = useState<IScreen>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenType({
        isMobile: window.innerWidth <= mobileBreakpoint,
        isTablet:
          window.innerWidth > mobileBreakpoint &&
          window.innerWidth <= tabletBreakpoint,
        isDesktop: window.innerWidth > tabletBreakpoint,
      });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return screenType;
};

export default useScreenSize;
