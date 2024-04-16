import OrderDetails from "@/components/shared/Cards/OrderDetails";
import React from "react";
import ServerPageWrapper from "../../serverPageWrapper";

const Page = (params: any) => {
  return (
    <ServerPageWrapper>
      <OrderDetails />
    </ServerPageWrapper>
  );
};

export default Page;
