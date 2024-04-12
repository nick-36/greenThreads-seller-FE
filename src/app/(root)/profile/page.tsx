import React from "react";
import AccountProfile from "@/components/shared/AccountProfile";
const Page = () => {
  return (
    <div>
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
  );
};

export default Page;
