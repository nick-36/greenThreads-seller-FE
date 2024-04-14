import React from "react";
import ProductCard from "./OrderCard";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Product = {
  name: string;
  quantity: string;
  price: string;
  img: string;
};

type Order = {
  orderId: string;
  orderDate: string;
  products: Product[];
};

type OrderListProps = {
  orders: Order[];
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="grid gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4">
      {orders.map((order: Order) => {
        return <ProductCard orderDetails={order} />;
      })}
    </div>
  );
};

export default OrderList;
