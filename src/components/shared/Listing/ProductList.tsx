"use client";
import React, { useRef, useState } from "react";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import { DataTable } from "@/components/shared/Table/TableV2";
import { useDataTable } from "@/hooks/useDataTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { UploadDropzone } from "@/lib/utils/uploadthing";

const ProductList = ({
  data,
  searchTerm,
  handleSearch,
  isLoading,
  handleTabChange,
  tab,
}: any) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const { mutate: bulkCreation, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      console.log("PAYLOAD", payload);
      await axiosPrivate.post("/products/bulk-upload", { fileUrl: payload });
    },
    onError: (error: any) => {
      const errorData = error.response.data;
      console.log(errorData, "ERRORDAT");
      toast({
        title: `Uh oh! ${error?.response?.status ?? "500"} `,
        description: errorData.message || "Something Went Wrong!!",
      });
    },
    onSuccess: () => {
      console.log("SUCCESS");
      setIsBulkModalOpen(false);
      setUploadedFileUrl(null);
      toast({
        title: "Great!",
        description: "Bulk Upload Started!",
      });
    },
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "previewImage",
      header: "Image",
      cell: ({ row }) => {
        const { previewImage } = row?.original;
        const srcUrl = previewImage || "/assets/placeholder.svg";
        return (
          <div className="sm:table-cell">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              height="64"
              src={srcUrl}
              width="64"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: "Name",
      cell: ({ row }) => {
        const { productName } = row?.original;
        return <div className="text-sm font-normal">{productName}</div>;
      },
    },
    {
      accessorKey: "originalPrice",
      header: "Price",
      cell: ({ row }) => {
        const { originalPrice } = row?.original;
        return (
          <>
            <div className="sm:table-cell">{originalPrice}</div>
          </>
        );
      },
    },
    {
      accessorKey: "discountPercentage",
      header: "Discount",
      cell: ({ row }) => {
        const { discountPercentage } = row?.original;
        return (
          <>
            <div className="">{discountPercentage}%</div>
          </>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const { isActive } = row?.original;
        const status = isActive ? "Active" : "Inactive";

        return (
          <div className="">
            <Badge className="text-xs" variant="secondary">
              {status}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "deliveryRange",
      header: "Delivery Range",
      cell: ({ row }) => {
        const { deliveryRange } = row?.original;
        return (
          <div className="text-sm font-normal">
            {deliveryRange?.replace(/_/g, " ")}
          </div>
        );
      },
    },

    {
      accessorKey: "isNextDayDelivery",
      header: "isNextDayDelivery",
      cell: ({ row }) => {
        const { isNextDayDelivery } = row?.original;
        const text = isNextDayDelivery ? "Yes" : "No";
        return (
          <div className="w-full flex items-center justify-center">{text}</div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const { createdAt } = row?.original;
        const formattedDate = formatDateString(createdAt);
        return <div className="text-center md:table-cell">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const { id } = row?.original;
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
                  router.push(`/products/${id}`);
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

  const { table } = useDataTable({
    data: data?.data,
    columns: columns,
    pageCount: data?.pagination?.pageCount ?? 1,
  });

  const onBulkUpload = () => {
    setIsBulkModalOpen((prev) => !prev);
  };

  return (
    <div>
      <Tabs defaultValue="all" value={tab} onValueChange={handleTabChange}>
        <div className="flex items-center p-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/products/add-product">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </Link>
            <Button
              size="sm"
              className="h-8 gap-1"
              // onClick={() => inputRef?.current?.click()}
              onClick={onBulkUpload}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Bulk Upload
              </span>
              <Input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                // onChange={(e: any) => handleFileChange(e)}
              />
            </Button>
          </div>
        </div>
        <TabsContent value={tab} className="px-6">
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
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <CardContent>
              <DataTable table={table} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={isBulkModalOpen} onOpenChange={onBulkUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload A Excel File</DialogTitle>
            <DialogDescription>Download Excel Format</DialogDescription>
          </DialogHeader>
          <UploadDropzone
            className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            endpoint="excelFileUploader"
            onClientUploadComplete={(res) => {
              // Store the uploaded file URL
              if (res?.[0]?.url) {
                setUploadedFileUrl(res[0].url);
                toast({
                  title: "File Uploaded Successfully!",
                });
              }
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Upload Failed",
                description: error.message || "Something Went Wrong!",
                variant: "destructive",
              });
            }}
          />
          <DialogFooter>
            <DialogClose
              disabled={isPending}
              type="button"
              onClick={() => {
                if (uploadedFileUrl) {
                  bulkCreation(uploadedFileUrl);
                }
              }}
              asChild
            >
              <Button type="button">
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(ProductList);
