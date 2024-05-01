import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function generateProductVariations(variationsData: any) {
  const generateCombinations = (
    currentVariationIndex: number,
    currentCombination: any,
    combinations: any
  ) => {
    if (currentVariationIndex === variationsData.length) {
      if (Object.keys(currentCombination).length > 0) {
        combinations.push({ ...currentCombination });
      }
      return;
    }

    const variation = variationsData[currentVariationIndex];

    variation.options.forEach((option: any) => {
      const updatedCombination = { ...currentCombination };
      updatedCombination[variation.type.toLowerCase()] = option.value;
      generateCombinations(
        currentVariationIndex + 1,
        updatedCombination,
        combinations
      );
    });
  };

  const combinations: any = [];
  generateCombinations(0, {}, combinations);
  return combinations;
}

export const generateColumns = (variationsData: any) => {
  const columns: any = [];

  // Extract all unique variation types
  const variationTypes = variationsData.reduce((types: any, variation: any) => {
    Object.keys(variation).forEach((key) => {
      if (!types.includes(key)) {
        types.push(key);
      }
    });
    return types;
  }, []);

  // Generate column objects for each variation type
  variationTypes.forEach((type: any) => {
    columns.push({
      id: type,
      accessorKey: type,
      header: type.charAt(0).toUpperCase() + type.slice(1),
    });
  });

  return columns;
};
