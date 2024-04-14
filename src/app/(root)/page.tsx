// import BusinessInfo from "@/components/shared/BusinessInfo";
import BusinessStatsCardList from "@/components/shared/BusinessStatsCard";
import OrderList from "@/components/shared/OrderList";
// import ServerPageWrapper from "./serverPageWrapper";
import { HEADER_VARIANTS, dummyOrders } from "@/lib/utils/constants";
// import { Ratings } from "@/components/ui/rating";
import { Card } from "@/components/ui/card";

const dummyStatsData = [
  {
    title: "Today Orders",
    subTitle: "02",
    icon: "/assets/orders.svg",
  },
  {
    title: "Today Revenue",
    subTitle: "$4",
    icon: "/assets/revenue.svg",
  },
  {
    title: "Today Deliveries",
    subTitle: "04",
    icon: "/assets/delivery.svg",
  },
];

// export default function Home() {
//   const headerProps = {
//     variant: HEADER_VARIANTS.Enhanced,
//   };
//   return (
//     <ServerPageWrapper headerProps={headerProps}>
//       <main className="p-4">
//         <BusinessInfo />
//         <BusinessStatsCard statsData={dummyStatsData} />
//         <OrderList products={dummyProducts} />
//       </main>
//     </ServerPageWrapper>
//   );
// }

import DesktopHeader from "@/components/shared/Header/DesktopHeader";
import DesktopMain from "@/components/shared/DesktopMain";
import DesktopSidebar from "@/components/shared/DesktopSidebar";
import ServerPageWrapper from "./serverPageWrapper";
import { Button } from "@/components/ui/button";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function Home() {
  return (
    <ServerPageWrapper headerProps={{ variant: HEADER_VARIANTS.Enhanced }}>
      <DesktopMain headerTitle={"Dashboard"}>
        <Card x-chunk="dashboard-06-chunk-0" className="border-dashed">
          <BusinessStatsCardList statsData={dummyStatsData} />
          <OrderList orders={dummyOrders} />
        </Card>
      </DesktopMain>
    </ServerPageWrapper>
  );
}
