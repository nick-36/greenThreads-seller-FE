"use client";
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

function generateCombinations(variations: any[]): any[] {
  const combinations: any[] = [];

  // Recursive function to generate combinations using backtracking
  function backtrack(index: number, currentOptions: any[]): void {
    if (index === variations.length) {
      // All variation options have been chosen, create a combination
      const skuId = `TS001-${currentOptions
        .map((option) => option.optionName.substring(0, 2).toUpperCase())
        .join("-")}`;
      const availableStock = Math.min(
        ...currentOptions.map((option) => {
          const variation = variations.find(
            (v) => v.name === option.variationName
          );
          const selectedOption = variation?.options.find(
            (opt: any) => opt.name === option.optionName
          );
          return selectedOption?.stock || 0;
        })
      );

      combinations.push({
        skuId,
        variationOptions: currentOptions,
        availableStock,
      });
      return;
    }

    // Choose an option from the current variation
    for (const option of variations[index].options) {
      backtrack(index + 1, [
        ...currentOptions,
        { variationName: variations[index].name, optionName: option.name },
      ]);
    }
  }

  // Start backtracking to generate all combinations
  backtrack(0, []);

  return combinations;
}

// Example usage:
const variations = [
  {
    name: "Color",
    options: [
      { name: "Red", stock: 50, price: 29.99 },
      { name: "Blue", stock: 50, price: 29.99 },
      { name: "Green", stock: 75, price: 29.99 },
    ],
  },
  {
    name: "Size",
    options: [
      { name: "Small", stock: 100, price: 29.99 },
      { name: "Medium", stock: 50, price: 29.99 },
      { name: "Large", stock: 75, price: 29.99 },
    ],
  },
  // Add more variations as needed
  {
    name: "Material",
    options: [
      { name: "Cotton", stock: 100, price: 39.99 },
      { name: "Polyester", stock: 80, price: 34.99 },
      { name: "Silk", stock: 60, price: 49.99 },
    ],
  },
];

const combinations = generateCombinations(variations);
console.log(combinations);

export default function Home() {
  return (
    <ServerPageWrapper headerProps={{ variant: HEADER_VARIANTS.Enhanced }}>
      <BusinessStatsCardList statsData={dummyStatsData} />
      <OrderList orders={dummyOrders} />
    </ServerPageWrapper>
  );
}
