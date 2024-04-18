"use client";
import React from "react";
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomTable from "@/components/shared/Table/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const ProductList = ({ data }: any) => {
  const router = useRouter();
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const { img } = row?.original;
        return (
          <div className="sm:table-cell">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              height="64"
              src={img}
              width="64"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const { name } = row?.original;
        return <div className="font-medium">{name}</div>;
      },
    },
    {
      accessorKey: "sale",
      header: "Sale",
      cell: ({ row }) => {
        const { sale } = row?.original;
        return (
          <>
            <div className="sm:table-cell">{sale}</div>
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
      header: "Date",
      cell: ({ row }) => {
        const { date } = row?.original;
        return <div className="md:table-cell">{date}</div>;
      },
    },

    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const { price } = row?.original;
        return <div className="text-center md:table-cell">${price}</div>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/products/{row.id}`);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      <Tabs defaultValue="all">
        <div className="flex items-center p-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Inactive</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="px-6">
          <Card x-chunk="dashboard-05-chunk-3" className="border-dashed">
            <div className="flex flex-col space-y-3 md:flex-row justify-between p-6 px-4 md:px-7">
              <div
                x-chunk="dashboard-05-chunk-3"
                className="flex flex-1 justify-between border-none"
              >
                <CardHeader className="p-0">
                  <CardTitle>Products</CardTitle>
                  <CardDescription className="hidden md:flex md:text-sm">
                    Manage your products and view their sales performance.
                  </CardDescription>
                  <CardDescription className="md:hidden text-sm">
                    Manage your products
                  </CardDescription>
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
            <CardContent>
              <CustomTable columns={columns} data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductList;
