type ClassValue = false | null | string | undefined;

const mergeClasses = (...parts: ClassValue[]) => {
  return parts.filter(Boolean).join(" ");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VariantPropsOf<T extends (...args: any) => any> = NonNullable<
  Parameters<T>[0]
>;

type CompoundVariant<V extends VariantRecord> = {
  className: string;
  variants: Partial<{ [K in keyof V]: boolean | keyof V[K] }>;
};

type CVAConfig<V extends VariantRecord> = {
  base?: Record<string, string | string[]> | string | string[];
  compoundVariants?: Array<CompoundVariant<V>>;
  defaultVariants?: Partial<{ [K in keyof V]: boolean | keyof V[K] }>;
  slots?: Record<string, string>;
  variants?: V;
};

type VariantProps<V extends VariantRecord> = {
  className?: string;
  slot?: string;
} & Partial<{
  [K in keyof V]: boolean | keyof V[K];
}>;

type VariantRecord = Record<string, Record<string, string>>;

export const classVariant = <V extends VariantRecord>(config: CVAConfig<V>) => {
  const {
    base,
    compoundVariants = [],
    defaultVariants = {} as Partial<Record<keyof V, boolean | string>>,
    slots,
    variants = {} as V,
  } = config;

  const normalize = (value?: string | string[]) =>
    !value ? "" : Array.isArray(value) ? value.join(" ") : value;

  const resolveBase = (slot?: string) => {
    if (typeof base === "string" || Array.isArray(base)) {
      return normalize(base);
    }
    if (base && slot) {
      return normalize(base[slot]);
    }
    return "";
  };

  const normalizeVariantValue = (value: boolean | string) =>
    typeof value === "boolean" ? String(value) : value;

  const collectVariants = (props: VariantProps<V>) => {
    const chosen: Record<string, string> = {};

    for (const key in variants) {
      const raw = props[key as keyof V] ?? defaultVariants[key as keyof V];

      if (raw !== undefined) {
        chosen[key] = normalizeVariantValue(raw as boolean | string);
      }
    }

    return chosen;
  };

  const applyVariants = (
    chosen: Record<string, string>,
    classList: string[],
  ) => {
    for (const key in chosen) {
      const map = variants[key];
      const value = map?.[chosen[key]];
      if (value) {
        classList.push(value);
      }
    }
  };

  const applyCompoundVariants = (
    chosen: Record<string, string>,
    classList: string[],
  ) => {
    for (const cv of compoundVariants) {
      const match = Object.entries(cv.variants).every(
        ([key, value]) =>
          chosen[key] === normalizeVariantValue(value as boolean | string),
      );

      if (match) {
        classList.push(cv.className);
      }
    }
  };

  const resolve = (slot: string | undefined, props: VariantProps<V>) => {
    const chosen = collectVariants(props);
    const classList: string[] = [];

    const baseClasses = resolveBase(slot);
    if (baseClasses) {
      classList.push(baseClasses);
    }

    applyVariants(chosen, classList);
    applyCompoundVariants(chosen, classList);

    if (props.className) {
      classList.push(props.className);
    }

    return mergeClasses(...classList);
  };

  const variant = (props: VariantProps<V> = {}) => {
    if (slots) {
      const result: Record<string, string> = {};

      for (const slot of Object.keys(slots)) {
        result[slot] = resolve(slot, props);
      }

      return result as unknown as string;
    }

    return resolve(props.slot, props);
  };

  return variant;
};
