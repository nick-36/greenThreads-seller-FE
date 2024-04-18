"use client";
import React from "react";
import Header from "@/components/shared/Header";
import { HeaderProps } from "@/lib/utils/types/headerType";
import DesktopSidebar from "@/components/shared/Layouts/DesktopSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeProvider";

const ServerPageWrapper = ({
  children,
  headerProps,
}: {
  children: React.ReactNode;
  headerProps?: HeaderProps;
}) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {/* <div className="pb-16 md:pb-0"> */}
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <DesktopSidebar />
          <div className="flex flex-col overflow-hidden">
            <Header {...headerProps} />
            {children}
          </div>
          {/* <MobileFooter links={mobileFooterLinks} /> */}
        </div>
        {/* </div> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default ServerPageWrapper;
