// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cx = (...values: any[]) => {
  return values.flat().filter(Boolean).join(" ");
};

export default cx;
