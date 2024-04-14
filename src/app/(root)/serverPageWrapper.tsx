import React from "react";
import Header from "@/components/shared/Header";
import MobileFooter from "@/components/shared/Footer/MobileFooter";
import { mobileFooterLinks } from "@/lib/utils/mobileFooterLinks";
import { HeaderProps } from "@/lib/utils/types/headerType";

const ServerPageWrapper = ({
  children,
  headerProps,
}: {
  children: React.ReactNode;
  headerProps?: HeaderProps;
}) => {
  return (
    <>
      <Header {...headerProps} />
      {children}
      <MobileFooter links={mobileFooterLinks} />
    </>
  );
};

export default ServerPageWrapper;
