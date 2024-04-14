import BusinessInfo from "@/components/shared/BusinessInfo";
import BusinessStatsCard from "@/components/shared/BusinessStatsCard";
import OrderList from "@/components/shared/OrderList";
import { HEADER_VARIANTS } from "@/lib/utils/constants";
import ServerPageWrapper from "./serverPageWrapper";
import { dummyProducts } from "@/lib/utils/constants";
import { Ratings } from "@/components/ui/rating";

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

export default function Home() {
  const headerProps = {
    variant: HEADER_VARIANTS.Enhanced,
  };
  return (
    <ServerPageWrapper headerProps={headerProps}>
      <main className="p-4">
        <BusinessInfo />
        <BusinessStatsCard statsData={dummyStatsData} />
        <OrderList products={dummyProducts} />
      </main>
    </ServerPageWrapper>
  );
}
