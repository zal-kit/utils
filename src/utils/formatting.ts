export const displayText = (
  text: null | string | undefined,
  defaultText = "-",
) => {
  if (!Boolean(text)) return defaultText;

  return text as string;
};

export const numberFormat = (value: number): string => {
  return (value || 0).toLocaleString("en-US");
};
