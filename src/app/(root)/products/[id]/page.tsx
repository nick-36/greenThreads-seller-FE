import React from "react";
import ServerPageWrapper from "../../serverPageWrapper";
import ProductDetails from "@/components/shared/Cards/ProductDetails";

const Page = ({}) => {
  return (
    <ServerPageWrapper headerProps={{ headerTitle: "Orders" }}>
      <ProductDetails />
    </ServerPageWrapper>
  );
};

export default Page;
