/** "$2.35 Million" style label used across cards and detail pages. */
export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    const millions = parseFloat((price / 1_000_000).toFixed(2));
    return `$${millions} Million`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US")}`;
}

export function formatSqft(sqft: number): string {
  return `${sqft.toLocaleString("en-US")} sq ft`;
}
