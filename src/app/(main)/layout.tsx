"use client";
import { ReactNode } from "react";
import AppNavbar from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";

interface MainAppLayoutProps {
  children: ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <>
      <nav>
        <AppNavbar />
      </nav>
      {children}
      <footer>
        <AppFooter />
      </footer>
    </>
  );
};

export default MainAppLayout;
