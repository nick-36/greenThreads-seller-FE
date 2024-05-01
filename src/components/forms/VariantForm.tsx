import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import MultiSelect from "../ui/MultiSelect";
import { useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";

const VariantForm = () => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  const watchVariantType = (variantIndex: number) =>
    form.watch(`variations.${variantIndex}.type`);

  const handleAddVariant = () => {
    append({ type: "", options: [] });
  };
  const handleRemoveVariant = (variantIndex: number) => {
    remove(variantIndex);
  };

  const onSubmit = (data: any) => {
    console.log(data.variations, "SUBMITTED");
  };

  const onSubmitForm = (data: any) => {
    onSubmit(data);
  };

  const variationTypes = [
    {
      label: "Size",
      value: "SIZE",
    },
    {
      label: "Color",
      value: "COLOR",
    },
    {
      label: "Material",
      value: "MATERIAL",
    },
  ];

  const getVariantOptions = (variantType: string = "SIZE") => {
    switch (variantType) {
      case "SIZE":
        return [
          {
            label: "Small",
            value: "SMALL",
          },
          {
            label: "Medium",
            value: "MEDIUM",
          },
          {
            label: "Large",
            value: "LARGE",
          },
        ];
      case "COLOR":
        return [
          {
            label: "Red",
            value: "RED",
          },
          {
            label: "Pink",
            value: "PINK",
          },
          {
            label: "Blue",
            value: "BLUE",
          },
        ];
      case "MATERIAL":
        return [
          {
            label: "Polyster",
            value: "POLYSTER",
          },
          {
            label: "Cotton",
            value: "COTTON",
          },
        ];
      default:
        return [];
    }
  };

  const getSelectedVariationOptions = (variantType: string) => {
    const type = form
      .getValues("variations")
      .find((item: any) => item.type === variantType);

    return type.options;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button
          size="sm"
          className="h-8 gap-1 max-w-40"
          onClick={handleAddVariant}
          type="button"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Variation
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {fields.map((variant, variantIndex) => {
          return (
            <>
              <FormField
                control={form.control}
                name={`variations.${variantIndex}.type`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="variantType" className="sr-only">
                        Variant Type
                      </FormLabel>
                      <FormControl>
                        <Select
                          disabled={field.value}
                          onValueChange={field.onChange}
                          {...field}
                        >
                          <SelectTrigger
                            id={`variations.${variantIndex}.type`}
                            aria-label="Select type"
                          >
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {variationTypes?.map((item, idx: number) => {
                              return (
                                <SelectItem
                                  disabled={fields?.some((opt: any) => {
                                    return item.value === opt.type;
                                  })}
                                  key={idx}
                                  value={item?.value}
                                >
                                  {item?.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {watchVariantType(variantIndex) && (
                <FormField
                  name={`variations.${variantIndex}.options`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel htmlFor="VariantOptions" className="sr-only">
                        Select Variant Options
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={getVariantOptions(
                            watchVariantType(variantIndex)
                          )}
                          placeholder=""
                          onChange={field.onChange}
                          selectedValues={getSelectedVariationOptions(
                            watchVariantType(variantIndex)
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex items-center">
                <Button
                  type="button"
                  size={"icon"}
                  variant={"ghost"}
                  className="h-full"
                  onClick={() => handleRemoveVariant(variantIndex)}
                >
                  <Trash2 />
                </Button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default VariantForm;
