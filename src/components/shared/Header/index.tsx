import React from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { HeaderProps } from "@/lib/utils/types/headerType";

const Header = (props: HeaderProps) => {
  return (
    <>
      {/* <div className="md:hidden">
        <MobileHeader {...props} />
      </div> */}
      <DesktopHeader />
    </>
  );
};

export default Header;
