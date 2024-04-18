"use client";
import React from "react";
import { File, ListFilter, Search } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/shared/Table/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

const TransactionList = ({ data }: any) => {
  const columns: ColumnDef<any>[] = [
    {
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
        const { amount } = row?.original;
        return <div className="text-center md:table-cell">${amount}</div>;
      },
    },
  ];
  return (
    <div>
      <Tabs defaultValue="week">
        <div className="flex items-center p-6">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <TabsContent value="week" className="px-6">
          <Card x-chunk="dashboard-05-chunk-3" className="border-dashed">
            <div className="flex flex-col space-y-3 md:flex-row justify-between p-6 px-4 md:px-7">
              <div
                x-chunk="dashboard-05-chunk-3"
                className="flex flex-1 justify-between border-none"
              >
                <CardHeader className="p-0">
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    Recent transactions from your store.
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
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionList;
