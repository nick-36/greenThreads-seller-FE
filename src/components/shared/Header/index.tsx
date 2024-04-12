import React from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const Header = (props: any) => {
  return (
    <div>
      <div className="md:hidden">
        <MobileHeader headerProps={props} />
      </div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
    </div>
  );
};

export default Header;
