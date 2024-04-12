import React from "react";
import ServerPageWrapper from "../serverPageWrapper";

const Page = () => {
  return (
    <ServerPageWrapper
      headerProps={{ isEnhancedHeader: false, headerTitle: "orders" }}
    >
      <p>Orders Page</p>
    </ServerPageWrapper>
  );
};

export default Page;
