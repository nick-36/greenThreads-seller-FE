import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetails = ({ product }: any) => {
  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0 " className="border-dashed p-0">
        <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
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
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue="Gamer Gear Pro Controller"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="w-[100px]">Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-001
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-1" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-1"
                              type="number"
                              defaultValue="100"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-1" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-1"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-002
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-2" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-2"
                              type="number"
                              defaultValue="143"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-2" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-2"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="m"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-003
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-3"
                              type="number"
                              defaultValue="32"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="price-3"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Tabs defaultValue="active">
                          <TabsList className="">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </Card>
    </div>
  );
};

export default ProductDetails;

<Table className="overflow-auto">
  <TableHeader>
    <TableRow>
      {/* <TableHead className="w-[100px]">SKU</TableHead> */}
      <TableHead>Size</TableHead>
      <TableHead>Color</TableHead>
      <TableHead className="w-[100px]">Stock</TableHead>
      <TableHead className="w-[100px]">Price</TableHead>
      <TableHead className="w-[100px]">Remove</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {fields?.map((variant: any, index) => {
      return (
        <TableRow key={index}>
          {/* <TableCell className="font-semibold">
          {sku?.id}
        </TableCell> */}
          <TableCell>
            <FormField
              control={form.control}
              name={`variations.${index}.name`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="variantName" className="sr-only">
                      {variant.label}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) =>
                          handleVariantChange(val, variant.label)
                        }
                      >
                        <SelectTrigger
                          id="variantName"
                          aria-label="Select VariantName"
                        >
                          <SelectValue
                            {...field}
                            placeholder="Select VariantName"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {variationOptions?.map(
                            (variant: any, idx: number) => {
                              return (
                                <SelectItem key={idx} value={variant?.value}>
                                  {variant.label}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </TableCell>

          <TableCell>
            <FormField
              control={form.control}
              name={`variations.${index}.options`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="variantOptions" className="sr-only">
                      Color
                    </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger
                          id="variantOptions"
                          aria-label="Select variantOptions"
                        >
                          <SelectValue
                            {...field}
                            placeholder="Select variantOptions"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {selectedVariant?.options &&
                          selectedVariant.options.map(
                            (
                              option: any,
                              index: number
                            ) => (
                              <SelectItem
                                key={index}
                                value={option}
                              >
                                {option}
                              </SelectItem>
                            )
                          )} */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </TableCell>
          {/* <TableCell>
          <FormField
            control={form.control}
            name={`variations.${index}.stock`}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="stock">
                    Stock
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`variations.${index}.stock`}
                      type="number"
                      defaultValue="100"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </TableCell>
        <TableCell>
          <FormField
            control={form.control}
            name={`variations.${index}.originalPrice`}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="description">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`variations.${index}.originalPrice`}
                      type="number"
                      defaultValue="99.99"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </TableCell>
        <TableCell>
          <FormField
            control={form.control}
            name={`variations.${index}.remove`}
            render={({}) => {
              return (
                <FormItem>
                  <FormLabel className="sr-only">
                    Remove
                  </FormLabel>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">
                      Move to trash
                    </span>
                  </Button>
                </FormItem>
              );
            }}
          />
        </TableCell> */}
        </TableRow>
      );
    })}
  </TableBody>
</Table>;
