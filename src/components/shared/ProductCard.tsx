import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Image from "next/image";

const ProductCard = ({ productDetails }: any) => {
  return (
    <Card className="max-w-sm shadow-md border-none">
      <CardContent className="p-0">
        <div className="flex flex-start gap-2 space-y-2 border-b p-2">
          <Image
            src={productDetails?.img}
            alt="order"
            width={91}
            height={92}
            className="rounded-md"
          />
          <div className="flex flex-col gap-2">
            <p className="text-base">{productDetails?.name}</p>
            <div className="flex align-center gap-6">
              <p className="text-xs font-light">
                Qty : {productDetails?.quantity}
              </p>
              <p className="text-xs font-light">$ {productDetails?.price}</p>
            </div>
          </div>
        </div>
        <div className="py-2 px-4">
          <div className="flex align-center justify-between gap-6">
            <p className="text-xs font-light">
              Order id: {productDetails?.orderId}
            </p>
            <p className="text-xs font-light">
              Order on {productDetails.orderDate}{" "}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
