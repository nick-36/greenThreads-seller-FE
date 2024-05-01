import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const ProductBasicInfo = () => {
  const form = useFormContext();
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentageValue = parseFloat(e.target.value);
    const retailPrice = parseFloat(form.getValues("retailPrice"));

    if (!isNaN(percentageValue) && !isNaN(retailPrice)) {
      const discountedPrice = (
        retailPrice -
        retailPrice * (percentageValue / 100)
      ).toFixed(2);
      form.setValue("discountedPrice", Number(discountedPrice));
    } else {
      form.setValue("discountedPrice", 0);
    }
  };
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Add Vital Product Informations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          {/* PRODUCT NAME */}
          <div className="grid col-span-3 gap-3">
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div className="grid col-span-3 gap-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="retailPrice"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="name">Retail Price</FormLabel>
                    <FormControl>
                      <Input
                        id="retailPrice"
                        type="number"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="discountPercentage">
                      Discount Percentage(%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="discountPercentage"
                        type="number"
                        className="w-full"
                        max={100}
                        min={0}
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                          handlePercentageChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="discountedPrice"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="discountedPrice">
                      Discounted Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="discountedPrice"
                        type="number"
                        className="w-full"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBasicInfo;
