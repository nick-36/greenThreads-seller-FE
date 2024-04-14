import React from "react";
import ServerPageWrapper from "../serverPageWrapper";
import OrderList from "@/components/shared/OrderList";
import { dummyProducts } from "@/lib/utils/constants";

const Page = () => {
  return (
    <ServerPageWrapper headerProps={{ headerTitle: "Orders" }}>
      <main className="p-4">
        <OrderList products={dummyProducts} />
      </main>
    </ServerPageWrapper>
  );
};

export default Page;
