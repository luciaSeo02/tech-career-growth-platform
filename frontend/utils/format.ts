export const getCurrency = (region?: string): string => {
  if (!region) return "€";
  const r = region.toLowerCase();
  if (r.includes("uk") || r.includes("united kingdom") || r.includes("britain"))
    return "£";
  return "€";
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
