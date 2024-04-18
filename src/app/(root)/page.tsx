import BusinessStatsCardList from "@/components/shared/Listing/StatsCardList";
import OrderList from "@/components/shared/Listing/OrderList";
import { HEADER_VARIANTS, dummyOrders } from "@/lib/utils/constants";
import ServerPageWrapper from "./serverPageWrapper";

const dummyStatsData = [
  {
    title: "Today Orders",
    subTitle: "02",
    icon: "/assets/shoppingBag.svg",
  },
  {
    title: "Today Revenue",
    subTitle: "$4",
    icon: "/assets/doller.svg",
  },
  {
    title: "Today Deliveries",
    subTitle: "04",
    icon: "/assets/delivery.svg",
  },
  // {
  //   title: "View More",
  //   subTitle: "04",
  //   icon: "/assets/activity.svg",
  // },
];

export default function Home() {
  return (
    <ServerPageWrapper headerProps={{ variant: HEADER_VARIANTS.Enhanced }}>
      <BusinessStatsCardList statsData={dummyStatsData} />
      <OrderList orders={dummyOrders} />
    </ServerPageWrapper>
  );
}
