import type {
  RunInput,
  FunctionRunResult,
  ProductVariant,
} from "../generated/api";
import { DiscountApplicationStrategy } from "../generated/api";

// Constants for discount calculation
const MIN_UNIQUE_PRODUCTS = 2; // Minimum number of unique products required for discount
const DISCOUNT_PER_PRODUCT = 5; // Percentage discount per unique product
const MAX_DISCOUNT = 20; // Maximum allowed discount percentage

// Default empty discount object when conditions are not met
const EMPTY_DISCOUNT: FunctionRunResult = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * Calculates tiered discounts based on the number of unique products in cart
 * @param input - Cart information and configuration
 * @returns Discount result object with calculated discount if applicable
 */
export function run(input: RunInput): FunctionRunResult {
  // Count unique products in cart
  const uniqueProducts = countUniqueProducts(input);

  // Return empty discount if minimum product requirement not met
  if (uniqueProducts.size < MIN_UNIQUE_PRODUCTS) {
    return EMPTY_DISCOUNT;
  }

  // Calculate discount based on unique products
  const discount = calculateDiscount(uniqueProducts.size);
  const uniqueDiscountProducts = discount / DISCOUNT_PER_PRODUCT;

  // Return discount configuration
  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        message: `Buy ${uniqueDiscountProducts} unique products and get ${discount}% off`,
        value: {
          percentage: {
            value: discount,
          },
        },
        targets: [
          {
            orderSubtotal: {
              excludedVariantIds: [],
            },
          },
        ],
      },
    ],
  };
}

/**
 * Counts unique products in the cart
 * @param input - Cart information
 * @returns Set of unique product IDs
 */
function countUniqueProducts(input: RunInput): Set<string> {
  return input.cart.lines.reduce((productIds, line) => {
    productIds.add((line.merchandise as ProductVariant).product.id);
    return productIds;
  }, new Set<string>());
}

/**
 * Calculates the discount percentage based on number of unique products
 * @param uniqueProductCount - Number of unique products
 * @returns Calculated discount percentage
 */
function calculateDiscount(uniqueProductCount: number): number {
  return Math.min(uniqueProductCount * DISCOUNT_PER_PRODUCT, MAX_DISCOUNT);
}
