"use client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataTable from "../Table/Table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const CategoryList = () => {
  const data = [
    {
      id: "abc",
      categoryName: "Men",
      desc: "Sale",
      icon: "/assets/bell.svg",
    },
    {
      id: "728ed52f",
      categoryName: "women",
      desc: "Sale",
      icon: "/assets/bell.svg",
    },
    {
      id: "728ed52f",
      categoryName: "Clothes",
      desc: "Sale",
      icon: "/assets/bell.svg",
    },
  ];

  const columns: ColumnDef<any>[] = [
    {
      id: "categoryName",
      accessorKey: "categoryName",
      header: "Name",
      cell: ({ row }) => {
        const { categoryName } = row?.original;
        return (
          <>
            <div className="font-medium">{categoryName}</div>
          </>
        );
      },
    },
    {
      accessorKey: "categoryDesc",
      header: "Description",
      cell: ({ row }) => {
        const { desc } = row?.original;
        return (
          <>
            <div className="sm:table-cell">{desc}</div>
          </>
        );
      },
    },
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        const { icon } = row?.original;

        return (
          <div className="sm:table-cell">
            <Image src={icon} width={24} height={24} alt="catIcon" />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-3" className="border-none">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3 md:flex-row justify-between p-6 px-2 md:px-5">
            <div
              x-chunk="dashboard-05-chunk-3"
              className="flex flex-1 justify-between border-none"
            >
              <CardHeader className="p-0">
                <CardTitle>Categories</CardTitle>
                <CardDescription>All Categories</CardDescription>
              </CardHeader>
            </div>
            <div className="relative md:ml-auto flex-1 md:grow-0">
              <Link href="/categories/create">
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <Card className="border-dashed">
            <DataTable columns={columns} data={data} />
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryList;
