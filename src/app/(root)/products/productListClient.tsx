"use client";
import React, { useCallback, useState } from "react";
import ProductList from "@/components/shared/Listing/ProductList";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "next/navigation";

const useProducts = (search: string, tab: string, page: string) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["products", search, tab, page],
    queryFn: async () => {
      const response = await axiosPrivate.get("/products/by-seller", {
        params: {
          search,
          status: tab,
          page,
        },
      });
      return response?.data;
    },
  });
};

const ProductListClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const search = Object.fromEntries(searchParams);
  const page = search.page;
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 
  const [tab, setTab] = useState("all");
  const { data, isLoading } = useProducts(debouncedSearchTerm, tab, page);

  const handleSearch = useCallback((event: any) => {
    setSearchTerm(event.target.value);
  }, []); 

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };
  return (
    <ProductList
      data={data}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      handleTabChange={handleTabChange}
      tab={tab}
      isLoading={isLoading}
    />
  );
};

export default ProductListClient;
