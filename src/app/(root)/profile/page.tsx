import React from "react";
import AccountProfile from "@/components/shared/AccountProfile";
import ServerPageWrapper from "../serverPageWrapper";
const Page = () => {
  return (
    <div>
      <ServerPageWrapper headerProps={{ headerTitle: "Profile" }}>
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
      </ServerPageWrapper>
    </div>
  );
};

export default Page;
