import React from "react";
import ServerPageWrapper from "../serverPageWrapper";
import ProductList from "@/components/shared/Listing/ProductList";

const Page = () => {
  const data = [
    {
      id: "728ed52f",
      name: "Laser Lemonade Machine",
      sale: "24",
      status: "Active",
      email: "m@example.com",
      price: 100,
      date: "2023-06-23",
      img: "/assets/dummyProduct.png",
    },
    {
      id: "728ed52f",
      name: "Laser Lemonade Machine",
      sale: "24",
      status: "Inactive",
      email: "m@example.com",
      price: 100,
      date: "2023-06-23",
      img: "/assets/dummyProduct.png",
    },
    {
      id: "728ed52f",
      name: "Laser Lemonade Machine",
      sale: "24",
      status: "Active",
      email: "m@example.com",
      price: 1100,
      date: "2023-06-23",
      img: "/assets/dummyProduct.png",
    },
    {
      id: "728ed52f",
      name: "Laser Lemonade Machine",
      sale: "24",
      status: "Inactive",
      email: "olivia@example.com",
      price: 200,
      date: "2023-06-23",
      img: "/assets/dummyProduct.png",
    },
    {
      id: "728ed52f",
      name: "Laser Lemonade Machine",
      sale: "24",
      status: "Active",
      email: "m@example.com",
      price: 200,
      date: "2023-06-23",
      img: "/assets/dummyProduct.png",
    },
    {
      id: "728ed52f",
      name: "Laser Lemonade Machine",
      sale: "24",
      status: "Active",
      email: "m@example.com",
      price: 200,
      date: "2023-06-23",
      img: "/assets/dummyProduct2.png",
    },
    {
      id: "728ed52f",
      name: "AeroGlow Desk Lamp",
      sale: "24",
      status: "Active",
      email: "m@example.com",
      price: 200,
      img: "/assets/dummyProduct2.png",
      date: "2023-06-23",
    },
  ];

  return (
    <ServerPageWrapper headerProps={{ headerTitle: "Products" }}>
      <ProductList data={data} />
    </ServerPageWrapper>
  );
};

export default Page;
