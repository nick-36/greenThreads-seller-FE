"use client";
import useMultiStep from "@/hooks/useMultiStep";
import React, { useMemo, useState } from "react";
import ProductBasicInfo from "@/components/forms/Products/ProductBasicInfo";
import ProductCategoryInfo from "@/components/forms/Products/ProductCategoryInfo";
import ProductVariations from "@/components/forms/Products/ProductVariations";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productValidationSchema from "@/lib/validation/productValidation";
import { Form } from "@/components/ui/form";
import z from "zod";
import ProductCombinations from "./ProductCombinations";
import { generateProductVariations } from "@/lib/utils";
import ProductImages from "./ProductImages";
import DetailsPreview from "@/components/forms/Products/Preview";
import Stepper from "@/components/shared/Stepper";
import ConfirmationModal from "@/components/forms/Products/Confirmation";

type ProductFormData = z.infer<typeof productValidationSchema>;

const MultiStepsForm = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDisacardModalOpen, setIsDisCardModalOpen] = useState(false);
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      productName: "",
      description: "",
      status: "active",
      retailPrice: 100,
      discountPercentage: 0,
      discountedPrice: 0,
      variations: null,
      combinations: null,
    },
  });
  const {
    step,
    currentStepIndex,
    steps,
    next,
    customNext,
    previous,
    isLastStep,
    isFirstStep,
    goTo,
  } = useMultiStep({
    steps: [
      {
        step: <ProductBasicInfo />,
        fields: ["productName"],
        name: "Basic Info",
      },
      {
        step: <ProductCategoryInfo />,
        fields: ["categoryId"],
        name: "Categories",
      },
      {
        step: <ProductVariations />,
        nextFunction: () => generateCombinations(),
        fields: [],
        name: "Variations",
      },
      {
        step: <ProductCombinations />,
        fields: [],
        name: "Inventory",
      },

      {
        step: <ProductImages />,
        fields: [],
        name: "Images",
      },
      {
        step: (
          <DetailsPreview
            onSave={() => setIsConfirmationOpen(true)}
            onDiscard={() => setIsDisCardModalOpen(true)}
          />
        ),
        fields: [],
        name: "Preview",
      },
    ],
    form,
    submitHandlder: () => setIsConfirmationOpen(true),
  });

  console.log(form.formState.errors);

  const generateCombinations = () => {
    const selectedVariations = form.watch("variations");
    const allCombinations = generateProductVariations(selectedVariations);
    if (!allCombinations.length) {
      const data = [
        {
          name: form.getValues("productName"),
          stock: "0",
        },
      ];
      form.setValue("combinations", data);
    } else {
      form.setValue("combinations", allCombinations);
    }
  };

  const onFormSubmit = async (data: ProductFormData) => {
    console.log(data, "FORMMM");
    form.reset();
    setIsConfirmationOpen(false);
  };

  const onDiscardConfirm = () => {
    form.reset();
    setIsDisCardModalOpen(false);
    goTo(0);
  };

  return (
    <div
      x-chunk="dashboard-06-chunk-0 "
      className="border-none shadow-none md:p-6"
    >
      <Form {...form}>
        <Stepper steps={steps} goTo={goTo} />
        <form
          onSubmit={form?.handleSubmit(onFormSubmit)}
          className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4 h-full py-6"
        >
          {step}
          <div className="flex justify-between items-center">
            <Button type="button" onClick={previous} disabled={isFirstStep}>
              Previous
            </Button>
            <Button
              type="button"
              disabled={isLastStep}
              onClick={() => {
                if (customNext) {
                  customNext();
                } else {
                  next();
                }
              }}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
      <ConfirmationModal
        isOpen={isDisacardModalOpen}
        subTitle="Please confirm once before proceeding"
        onContinue={onDiscardConfirm}
        onCancel={() => setIsDisCardModalOpen(false)}
      />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        subTitle="Please make sure all the information is accurate before
        proceeding."
        onContinue={() => onFormSubmit(form.getValues())}
        onCancel={() => setIsConfirmationOpen(false)}
      />
    </div>
  );
};

export default MultiStepsForm;
