"use client";
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import productValidationSchema from "@/lib/validation/productValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  CalendarHeartIcon,
  CheckIcon,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  PlusCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../shared/Table/Table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VariantForm from "./VariantForm";
import Stepper from "../shared/Stepper";

type Variant = {
  label: string;
  value: string;
  variationOptions: string[];
  stock: number;
  originalPrice: number;
};

type VariantOption = {
  label: string;
  value: string;
};

const AddEditProductForm = () => {
  const [isVariantOpen, setIsVariantOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(productValidationSchema),
    defaultValues: useMemo(() => {
      return {
        variant: [],
        productName: "",
        description: "",
        status: "active",
        productImages: [],
        originalPrice: 100,
        category: "",
        discountedPrice: 50,
        subCategoy: "",
      };
    }, []),
  });

  // const { fields, append, remove } = useFieldArray({
  //   control: form?.control,
  //   name: "variations",
  // });

  // const handleVariantChange = (selectedVal: any, label: any) => {
  //   const selectedVariant: any =
  //     fields.find((variant: any) => variant.value === selectedVal) || {};
  //   form.setValue(label, selectedVariant);
  // };


  const getvariantionOptions = (variations: any[]): any[] => {
    const options: any[] = variations.map(({ label, value }) => ({
      label,
      value,
    }));
    return options;
  };

  // const variationOptions = useMemo(() => {
  //   return getvariantionOptions(fields);
  // }, [fields]);

  const onFormSubmit = (data: any) => {
    //TO DO
    console.log("SUBMITTED", data);
  };

  //FORMAT TO SHOW IN TABLE
  // {
  //   "skuId": "TS001-RD-SM",
  //   "variationOptions": [
  //     { "variationName": "Color", "optionName": "Red" },
  //     { "variationName": "Size", "optionName": "Small" }
  //   ],
  //   "availableStock": 100
  // },

  const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const;

  const variations = [
    {
      size: "SMALL",
      colors: ["RED"],
      material: "Polyster",
      stock: 100,
      originalPrice: 99.99,
    },
    {
      size: "SMALL",
      colors: ["PINK"],
      material: "Polyster",
      stock: 100,
      originalPrice: 99.99,
    },
    {
      size: "SMALL",
      colors: ["RED"],
      material: "Polyster",
      stock: 100,
      originalPrice: 99.99,
    },
    {
      size: "MEDIUM",
      colors: ["PINK"],
      material: "Cotton",
      stock: 100,
      originalPrice: 99.99,
    },
    {
      size: "LARGE",
      colors: ["BLUE"],
      stock: 100,
      originalPrice: 99.99,
      material: "Polyster",
    },
    {
      size: "LARGE",
      colors: ["RED"],
      stock: 100,
      originalPrice: 99.99,
      material: "Polyster",
    },
  ] as any;

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "Size",
      header: "Size",
      cell: ({ row }) => {
        const { size } = row?.original;
        const optionMap: any = {
          SMALL: "S",
          MEDIUM: "M",
          LARGE: "L",
        };
        return (
          <div className="sm:table-cell">
            <ToggleGroup type="single" defaultValue="s" variant="outline">
              <ToggleGroupItem value={"SMALL"}>
                {optionMap[size]}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        );
      },
    },
    {
      accessorKey: "Color",
      header: "Color",
      cell: ({ row }) => {
        const { colors } = row?.original;
        return (
          <div className="sm:table-cell">
            <ToggleGroup type="single" defaultValue="s" variant="outline">
              {colors?.map((option: any) => {
                return (
                  <ToggleGroupItem value={option}>{option}</ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        );
      },
    },
    {
      accessorKey: "Material",
      header: "Material",
      cell: ({ row }) => {
        const { material } = row?.original;
        if (!material) return;
        return (
          <div className="sm:table-cell">
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem value={material}>{material}</ToggleGroupItem>
            </ToggleGroup>
          </div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const { stock } = row?.original;
        return (
          <>
            <div className="sm:table-cell">{stock}</div>
          </>
        );
      },
    },
    // {
    //   accessorKey: "price",
    //   header: "Price",
    //   cell: ({ row }) => {
    //     const { originalPrice } = row?.original;

    //     return (
    //       <div className="sm:table-cell">
    //         <Badge className="text-xs" variant="secondary">
    //           {originalPrice}
    //         </Badge>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <Card x-chunk="dashboard-06-chunk-0 " className="border-none md:p-6">
      <Form {...form}>
        <div className="grid flex-1 p-4 items-start gap-4  sm:px-6 sm:py-0 md:gap-8">
          <form
            onSubmit={form?.handleSubmit(onFormSubmit)}
            className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
          >
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pro Controller
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                In stock
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
            <div>
              <Stepper />
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* PRODUCT NAME */}
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="productName"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <FormControl>
                                  <Input
                                    id="name"
                                    type="text"
                                    className="w-full"
                                    defaultValue="Gamer Gear Pro Controller"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        ></FormField>
                      </div>
                      {/* PRODUCT DESCRIPTION */}
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel htmlFor="description">
                                  Description
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    id="description"
                                    className="min-h-32"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Category</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? languages.find(
                                            (language) =>
                                              language.value === field.value
                                          )?.label
                                        : "Select Category"}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search Categoy..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No Category found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {languages.map((language) => (
                                          <CommandItem
                                            value={language.label}
                                            key={language.value}
                                            onSelect={() => {
                                              form.setValue(
                                                "category",
                                                language.value
                                              );
                                            }}
                                          >
                                            <CheckIcon
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                language.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {language.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="subCategoy"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Sub Category</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? languages.find(
                                            (language) =>
                                              language.value === field.value
                                          )?.label
                                        : "Select SubCategory"}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search language..." />
                                    <CommandEmpty>
                                      No language found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {languages.map((language) => (
                                          <CommandItem
                                            value={language.label}
                                            key={language.value}
                                            onSelect={() => {
                                              form.setValue(
                                                "subCategoy",
                                                language.value
                                              );
                                            }}
                                          >
                                            <CheckIcon
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                language.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {language.label}
                                          </CommandItem>
                                        ))}
                                      </CommandList>
                                    </CommandGroup>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* <div className="grid gap-3">
                        <Label htmlFor="subcategory">
                          Subcategory (optional)
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="subcategory"
                            aria-label="Select subcategory"
                          >
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirts">T-Shirts</SelectItem>
                            <SelectItem value="hoodies">Hoodies</SelectItem>
                            <SelectItem value="sweatshirts">
                              Sweatshirts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
                <Card
                  x-chunk="dashboard-07-chunk-1"
                  className="overflow-x-hidden"
                >
                  <CardHeader>
                    <CardTitle>Variations</CardTitle>
                    <CardDescription>
                      Configure Products Variations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-full flex-1 flex-col md:flex p-4">
                    <DataTable
                      columns={columns}
                      data={variations}
                      showPagination={false}
                    />
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Dialog>
                      <DialogTrigger className="flex items-center gap-1">
                        {/* <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        > */}
                        <PlusCircle className="h-3.5 w-3.5" />
                        <p>Add Variant</p>
                        {/* </Button> */}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Variations</DialogTitle>
                          <VariantForm />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {/* PRODUCT STATUS */}
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel htmlFor="status">Status</FormLabel>
                                <FormControl>
                                  <Tabs
                                    {...field}
                                    onValueChange={(val) => {
                                      form.setValue("status", val);
                                    }}
                                  >
                                    <TabsList>
                                      <TabsTrigger
                                        className="data-[state=active]:bg-cyan-400	 data-[state=active]:text-white"
                                        value="active"
                                      >
                                        Active
                                      </TabsTrigger>
                                      <TabsTrigger
                                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                                        value="inactive"
                                      >
                                        Inactive
                                      </TabsTrigger>
                                    </TabsList>
                                  </Tabs>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* PRODUCT IMAGES */}
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/assets/placeholder.svg"
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/assets/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/assets/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm" type="submit">
                  Save Product
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </Card>
  );
};

export default AddEditProductForm;

export function Category() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="subcategory">Subcategory (optional)</Label>
            <Select>
              <SelectTrigger id="subcategory" aria-label="Select subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                <SelectItem value="hoodies">Hoodies</SelectItem>
                <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
