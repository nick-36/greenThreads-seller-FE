import React from "react";
import ServerPageWrapper from "../serverPageWrapper";
import OrderList from "@/components/shared/OrderList";
import { dummyOrders } from "@/lib/utils/constants";
import DesktopMain from "@/components/shared/DesktopMain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Page = () => {
  return (
    <ServerPageWrapper headerProps={{ headerTitle: "Orders" }}>
      <main className="p-4 md:hidden">
        <OrderList orders={dummyOrders} />
      </main>
      <DesktopMain headerTitle={"Orders"}>
        <Card x-chunk="dashboard-06-chunk-0" className="border-dashed">
          <OrderList orders={dummyOrders} />
        </Card>
      </DesktopMain>
    </ServerPageWrapper>
  );
};

export default Page;
