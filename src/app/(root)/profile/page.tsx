import React from "react";
import AccountProfile from "@/components/shared/AccountProfile";
import ServerPageWrapper from "../serverPageWrapper";
import DesktopMain from "@/components/shared/DesktopMain";
const Page = () => {
  return (
    <div>
      <ServerPageWrapper headerProps={{ headerTitle: "Profile" }}>
        <DesktopMain headerTitle={'Profile'} >
          <div
            className="flex flex-col items-center justify-center flex-1 space-y-10 rounded-lg border border-none md:border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <AccountProfile
              user={{
                id: "x",
                objectId: "y",
                name: "Nikhil",
                username: "Nick",
                email: "abc@gmail.com",
                mobile: "5454545454",
              }}
              ctaText="Save"
            />
          </div>
        </DesktopMain>
      </ServerPageWrapper>
    </div>
  );
};

export default Page;
