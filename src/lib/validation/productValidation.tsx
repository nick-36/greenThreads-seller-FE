import {  z } from "zod";

export const skuSchema = z.object({
  id: z.string()?.optional(),
  stock: z.number(),
  originalPrice: z.number(),
  size: z.enum(["s", "m", "l"]),
});

export const productValidationSchema = z.object({
  productName: z.string().min(2, {
    message: "name is required field",
  }),
  description: z.string()?.optional(),
  status: z.enum(["active", "inactive"]),
  retailPrice: z.number().positive(),
  discountPercentage: z.number().min(0).max(100),
  discountedPrice: z.number().optional(),
  categoryId: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
  subCategoryId: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .optional(),
  subSubCategoryId: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .optional(),
  variations: z
    .array(
      z.object({
        id: z.string().uuid()?.optional(),
        type: z.string(),
        options: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          })
        ),
      })
    )
    ?.nullable(),
  combinations: z.record(z.string(), z.any())?.nullable(),
});

export const categoryValidationSchema = z.object({
  name: z.string().min(1, "Category Name is required"),
  description: z.string().optional(),
  parentId: z.string().optional()?.nullable(),
  categoryImg: z.string().optional()?.nullable(),
  categorySlug: z.string()?.optional(),
});

export default productValidationSchema;
