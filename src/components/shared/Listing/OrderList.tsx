"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/OrderCard";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
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

import { Input } from "@/components/ui/input";
import useSearchFetch from "@/hooks/useSearchFetch";
import useDebounce from "@/hooks/useDebounce";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../Table/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedInputValue = useDebounce(searchTerm, 1000);

  const { results } = useSearchFetch(
    `https://jsonplaceholder.typicode.com/posts?q=${debouncedInputValue}`
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const data = [
    {
      id: "728ed52f",
      name: "Noah Williams",
      type: "Sale",
      status: "pending",
      email: "m@example.com",
      amount: 100,
      date: "2023-06-23",
    },
    {
      id: "728ed52f",
      name: "Noah Williams",
      type: "Sale",
      status: "pending",
      email: "m@example.com",
      amount: 100,
      date: "2023-06-23",
    },
    {
      id: "728ed52f",
      name: "Noah Williams",
      type: "Refund",
      status: "pending",
      email: "m@example.com",
      amount: 1100,
      date: "2023-06-23",
    },
    {
      id: "728ed52f",
      name: "Noah Williams",
      type: "Sale",
      status: "pending",
      email: "olivia@example.com",
      amount: 200,
      date: "2023-06-23",
    },
    {
      id: "728ed52f",
      name: "Noah Williams",
      type: "Sale",
      status: "Declined",
      email: "m@example.com",
      amount: 200,
      date: "2023-06-23",
    },
    {
      id: "728ed52f",
      name: "Noah Williams",
      type: "Sale",
      status: "Refund",
      email: "m@example.com",
      amount: 200,
      date: "2023-06-23",
    },
    {
      id: "728ed52f",
      name: "Noah Williams",
      type: "Sale",
      status: "Fulfilled",
      email: "m@example.com",
      amount: 200,
      date: "2023-06-23",
    },
  ];

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const { name, email } = row?.original;
        return (
          <>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground md:inline">
              {email}
            </div>
          </>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const { type } = row?.original;
        return (
          <>
            <div className="sm:table-cell">{type}</div>
          </>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row?.original;

        return (
          <div className="sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              {status}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: () => {
        return <div className="hidden md:table-cell">Date</div>;
      },
      cell: ({ row }) => {
        const { date } = row?.original;
        return <div className="hidden md:table-cell">{date}</div>;
      },
    },

    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const { amount } = row?.original;
        return <div className="text-center md:table-cell">${amount}</div>;
      },
    },
    {
      id: "more",
      accessorKey: "more",
      header: "Details",
      cell: ({ row }) => {
        const { amount } = row?.original;
        return (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/orders/abc">
              <p className="hidden md:flex">View More</p>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        );
      },
    },
  ];

  return (
    <Card x-chunk="dashboard-05-chunk-3" className="border-none">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3 md:flex-row justify-between p-6 px-2 md:px-7">
          <div
            x-chunk="dashboard-05-chunk-3"
            className="flex flex-1 justify-between border-none"
          >
            <CardHeader className="p-0">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
          </div>
          <div className="relative md:ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </div>
        <Card className="border-dashed">
          <DataTable columns={columns} data={data} />
        </Card>
      </CardContent>
    </Card>
  );
};

export default OrderList;
