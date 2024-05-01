import DataTable from "@/components/shared/Table/Table";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCombinations = ({ isDisabled = false }: any) => {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "combinations",
  });

  const generateColumns = (variationsData: any) => {
    const columns: any = [];

    const idColumnIndex = variationsData.findIndex(
      (column: any) => column === "id"
    );

    if (idColumnIndex !== -1 && idColumnIndex !== 0) {
      const idColumn = variationsData.splice(idColumnIndex, 1)[0];
      variationsData.unshift(idColumn);
    }

    // Extract all unique variation types
    const variationTypes = variationsData.reduce((types: any, column: any) => {
      if (!types.includes(column)) {
        types.push(column);
      }
      return types;
    }, []);

    // Generate column objects for each variation type
    variationTypes.forEach((type: any) => {
      if (type === "stock") {
        columns.push({
          id: type,
          accessorKey: type,
          header: type.charAt(0).toUpperCase() + type.slice(1),
          cell: (props: any) => {
            return <EditableCell {...props} />;
          },
        });
      } else if (type === "action") {
        const removeRow = (row: any, table: any) => {
          remove(row.index);
          table.options.meta?.removeRow(row.index);
        };
        columns.push({
          id: type,
          accessorKey: type,
          header: type.charAt(0).toUpperCase() + type.slice(1),
          cell: ({ row, table }: any) => {
            return (
              <Button variant={"ghost"} disabled={isDisabled}>
                <Trash2
                  onClick={() => {
                    removeRow(row, table);
                  }}
                />
              </Button>
            );
          },
        });
      } else if (type === "id") {
        columns.push({
          id: type,
          accessorKey: type,
          header: type.charAt(0).toUpperCase() + type.slice(1),
          cell: ({ row }: any) => {
            const { id } = row?.original;
            const shortId = id.replace(/-/g, "").substring(0, 6);
            return <p>{shortId}</p>;
          },
        });
      } else if (type === "name") {
        columns.push({
          id: type,
          accessorKey: type,
          header: type.charAt(0).toUpperCase() + type.slice(1),
          cell: ({ row }: any) => {
            const { name } = row?.original;
            return <p>{name}</p>;
          },
        });
      } else {
        columns.push({
          id: type,
          accessorKey: type,
          header: type.charAt(0).toUpperCase() + type.slice(1),
        });
      }
    });

    return columns;
  };

  const EditableCell: any = React.memo(
    ({ table, row: { index, id: rowId }, column: { id } }: any) => {
      const { getValues } = useFormContext();
      const formValue = getValues(`combinations.${rowId}.stock`);
      const [value, setValue] = React.useState(formValue);

      const handleChange = (e: any) => {
        setValue(Number(e.target.value));
      };

      const onBlur = (field: any) => {
        table.options.meta?.updateData(index, id, value);
        field.onChange(value);
      };

      React.useEffect(() => {
        setValue(formValue);
      }, [formValue]);

      return (
        <FormField
          name={`combinations.${rowId}.stock`}
          control={form.control}
          render={({ field }: any) => (
            <FormItem className="col-span-1 md:max-w-28">
              <FormLabel
                htmlFor={`combinations.${rowId}.stock`}
                className="sr-only"
              >
                stock
              </FormLabel>
              <FormControl>
                <Input
                  id={`combinations.${rowId}.stock`}
                  type="number"
                  onChange={handleChange}
                  defaultValue={0}
                  onBlur={(filed) => {
                    onBlur(field);
                  }}
                  value={value}
                  disabled={isDisabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    }
  );

  const columsToGenerated = React.useMemo(() => {
    const defaultColumns: { [key: string]: string } = {
      ...fields?.[0],
      stock: "stock",
    };
    if (fields.length > 1) {
      defaultColumns["action"] = "action";
    }
    return defaultColumns;
  }, [fields]);

  const columns = React.useMemo(
    () => generateColumns(Object.keys(columsToGenerated)),
    [fields]
  );

  return <DataTable columns={columns} data={fields} showPagination={false} />;
};

export default ProductCombinations;
