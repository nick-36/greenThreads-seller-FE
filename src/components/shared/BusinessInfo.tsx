import React from "react";
import { Icons } from "../ui/icons";
import Image from "next/image";

const BusinessInfo = () => {
  return (
    <div className="border-b border-gray-100 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-light text-[#6B6B6B]">Filter</p>
        <Icons.filter />
      </div>
      <div className="flex  items-center justify-between">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-normal">Total Revenue</p>
          <p className="text-3xl/10 font-normal">$4000.02</p>
        </div>
        <div className="space-y-2">
          <Image
            src="/assets/barChart.svg"
            alt="barChart"
            width={90}
            height={40}
          />
          <p className="text-[0.6rem] font-normal">Last 7 days revenue</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
