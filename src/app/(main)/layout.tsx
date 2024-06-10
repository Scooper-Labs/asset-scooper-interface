"use client";
import { ReactNode, useEffect } from "react";
import AppNavbar from "@/components/AppNavbar";

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
    </>
  );
};

export default MainAppLayout;
