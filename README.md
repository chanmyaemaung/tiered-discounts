# Tiered Product Discount Function - Shopify Extension

This Shopify Function extension implements a tiered discount system that rewards customers for purchasing multiple unique products.

## How It Works

The discount system operates based on the following rules:

- Minimum requirement: Cart must contain at least 2 unique products
- Discount rate: 5% per unique product
- Maximum discount: 20% off the order subtotal

### Discount Tiers

| Unique Products | Discount          |
| --------------- | ----------------- |
| 1 product       | No discount       |
| 2 products      | 10% off           |
| 3 products      | 15% off           |
| 4+ products     | 20% off (maximum) |

## Technical Details

- Built using Shopify Functions and TypeScript
- Automatically calculates discounts based on unique products in cart
- Implements First application strategy for discount handling
- No product exclusions - applies to all products in store

## Development

### Prerequisites

1. [Node.js](https://nodejs.org/en/download/) installed
2. [Shopify Partner account](https://partners.shopify.com/signup)
3. Shopify CLI installed
4. Development store or Shopify Plus sandbox store

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Local Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Deployment

Deploy to Shopify using:

```bash
npm run deploy
# or
yarn deploy
```

## Configuration

The discount parameters can be modified in `src/run.ts`:

```typescript
const MIN_UNIQUE_PRODUCTS = 2; // Minimum products for discount
const DISCOUNT_PER_PRODUCT = 5; // Percentage per unique product
const MAX_DISCOUNT = 20; // Maximum discount percentage
```

## Support

For issues and feature requests, please create an issue in this repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
