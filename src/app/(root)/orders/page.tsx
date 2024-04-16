import React from "react";
import ServerPageWrapper from "../serverPageWrapper";
import OrderList from "@/components/shared/Listing/OrderList";
import { dummyOrders } from "@/lib/utils/constants";

const Page = () => {
  return (
    <ServerPageWrapper headerProps={{ headerTitle: "Orders" }}>
      <OrderList orders={dummyOrders} />
    </ServerPageWrapper>
  );
};

export default Page;
