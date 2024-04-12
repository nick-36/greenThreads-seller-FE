import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type BusinessStatsData = {
  title: string;
  subTitle: string;
  icon: string;
};

const BusinessStatsCard = ({
  statsData,
}: {
  statsData: BusinessStatsData[];
}) => {
  return (
    <div className="flex justify-center gap-2 py-4 border-b border-gray-100">
      {statsData?.map((item: BusinessStatsData) => (
        <Card className="max-w-sm h-auto shadow-md">
          <CardContent className="flex flex-col space-y-2 p-2 min-w-28">
            <p className="text-[0.6rem]">{item?.title}</p>
            <div className="flex justify-between space-y-2">
              <p className="text-2xl font-light">{item?.subTitle}</p>
              <Image src={item?.icon} alt="order" width={34} height={45} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessStatsCard;
