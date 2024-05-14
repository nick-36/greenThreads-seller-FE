import React from "react";
import ServerPageWrapper from "../serverPageWrapper";
import ProductList from "@/components/shared/Listing/ProductList";
import axios, { withAuthorization } from "@/lib/utils/axios";

const fetchWithAuthorization = withAuthorization();

const Page = async () => {
  const products = await fetchWithAuthorization("/products");

  return (
    <ServerPageWrapper headerProps={{ headerTitle: "Products" }}>
      <ProductList data={products} />
    </ServerPageWrapper>
  );
};

export default Page;
