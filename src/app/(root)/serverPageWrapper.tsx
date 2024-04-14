import React from "react";
import Header from "@/components/shared/Header";
import MobileFooter from "@/components/shared/Footer/MobileFooter";
import { mobileFooterLinks } from "@/lib/utils/mobileFooterLinks";
import { HeaderProps } from "@/lib/utils/types/headerType";
import DesktopSidebar from "@/components/shared/DesktopSidebar";

const ServerPageWrapper = async ({
  children,
  headerProps,
}: {
  children: React.ReactNode;
  headerProps?: HeaderProps;
}) => {
  return (
    <div className="pb-16 md:pb-0">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <DesktopSidebar />
        <div className="flex flex-col">
          <Header {...headerProps} />
          {children}
        </div>
      </div>
      <MobileFooter links={mobileFooterLinks} />
    </div>
  );
};

export default ServerPageWrapper;
