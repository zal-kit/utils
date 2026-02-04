# @zal-kit/utils

A lightweight collection of TypeScript utility functions for class merging, variants, and formatting.

## Installation

```bash
npm install @zal-kit/utils
# or
yarn add @zal-kit/utils
# or
pnpm add @zal-kit/utils
```

## Features

### `cx` - Class Name Merging

Merge multiple class names efficiently with automatic filtering of falsy values.

```typescript
import { cx } from '@zal-kit/utils';

const className = cx('base', condition && 'active', 'extra');
// Result: "base active extra" (if condition is true)

// Works with arrays
const classes = cx(['flex', 'items-center'], undefined, 'gap-2');
// Result: "flex items-center gap-2"
```

### `classVariant` - Class Variance Authority (CVA)

Create type-safe variant-based class names for component styling.

```typescript
import { classVariant } from '@zal-kit/utils';

const button = classVariant({
  base: 'rounded font-semibold',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

// Usage
const className = button({ color: 'secondary', size: 'lg' });
// Result: "rounded font-semibold bg-gray-500 text-white px-6 py-3 text-lg"
```

### Formatting Utilities

**`displayText`** - Safe text display with fallback

```typescript
import { displayText } from '@zal-kit/utils';

displayText(null);           // "-"
displayText(undefined);      // "-"
displayText("");            // "-"
displayText("Hello");       // "Hello"
displayText(null, "N/A");   // "N/A"
```

**`numberFormat`** - Format numbers with locale-aware separators

```typescript
import { numberFormat } from '@zal-kit/utils';

numberFormat(1234567);  // "1,234,567"
numberFormat(0);        // "0"
```

## TypeScript

This package is written in TypeScript and includes full type definitions.

```typescript
import type { VariantPropsOf } from '@zal-kit/utils';

const button = classVariant({ /* ... */ });
type ButtonProps = VariantPropsOf<typeof button>;
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

