import React from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { HeaderProps } from "@/lib/utils/types/headerType";

const Header = (props: HeaderProps) => {
  return (
    <div>
      <div className="md:hidden">
        <MobileHeader {...props} />
      </div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
    </div>
  );
};

export default Header;
