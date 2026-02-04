const cx = (...values: any[]) => {
  return values.flat().filter(Boolean).join(" ");
};

export default cx;
