import React from "react";
import ProductCard from "./ProductCard";

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

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="py-4 space-y-4">
      {products.map((product: Product) => {
        return <ProductCard productDetails={product} />;
      })}
    </div>
  );
};

export default ProductList;
