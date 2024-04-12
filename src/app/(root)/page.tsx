import BusinessInfo from "@/components/shared/BusinessInfo";
import BusinessStatsCard from "@/components/shared/BusinessStatsCard";
import ProductCard from "@/components/shared/ProductCard";
import ProductList from "@/components/shared/ProductList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ServerPageWrapper from "./serverPageWrapper";

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

const dummyProducts = [
  {
    name: "Typographic Print Hooded Sweatshirt",
    quantity: "1",
    price: "100",
    img: "/assets/dummyProduct.png",
    orderId: "sellkhJE2A",
    orderDate: "Web 22 Feb 23",
  },
  {
    name: "Typographic Print Hooded Sweatshirt",
    quantity: "1",
    price: "100",
    img: "/assets/dummyProduct.png",
    orderId: "sellkhJE2A",
    orderDate: "Web 22 Feb 23",
  },
  {
    name: "Typographic Print Hooded Sweatshirt",
    quantity: "1",
    price: "100",
    img: "/assets/dummyProduct.png",
    orderId: "sellkhJE2A",
    orderDate: "Web 22 Feb 23",
  },
];

export default function Home() {
  return (
    <ServerPageWrapper>
      <main className="p-4">
        <BusinessInfo />
        <BusinessStatsCard statsData={dummyStatsData} />
        <ProductList products={dummyProducts} />
      </main>
    </ServerPageWrapper>
  );
}
