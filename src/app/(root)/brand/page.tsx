import React from "react";
import CreateBrandForm from "@/components/forms/CreateBrand";
import ServerPageWrapper from "@/app/(root)/serverPageWrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { axiosPrivate } from "@/lib/utils/axios";

const BrandPage = async () => {
  const brandInfo = await fetchBrandInfo();
  return (
    <ServerPageWrapper>
      <CreateBrandForm brandInfo={brandInfo} />
    </ServerPageWrapper>
  );
};

async function fetchBrandInfo() {
  try {
    const { userId, getToken } = auth();
    const sessionToken = await getToken();

    if (!userId || !sessionToken) {
      redirect("/sign-in");
    }

    const res = await axiosPrivate.get("/brand", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (res.data?.success) {
      return res.data?.data;
    } else {
      console.error("Failed to fetch data");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default BrandPage;
