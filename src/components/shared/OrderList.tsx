import React from "react";
import ProductCard from "./OrderCard";

type Product = {
  name: string;
  quantity: string;
  price: string;
  orderId: string;
  orderDate: string;
  img: string;
};

type ProductListProps = {
  products: Product[];
};

const OrderList = ({ products }: ProductListProps) => {
  return (
    <div className="py-4 space-y-4">
      {products.map((product: Product) => {
        return <ProductCard productDetails={product} />;
      })}
    </div>
  );
};

export default OrderList;
