"use client";

import { useMemo, useState } from "react";
import type { Property, PropertyType } from "@/lib/types";
import { properties, propertyTypes } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import { Button } from "./ui/Button";
import { Search, Sliders } from "./ui/Icons";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "largest";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest built" },
  { value: "largest", label: "Largest area" },
];

const priceSteps = [2_000_000, 3_000_000, 4_000_000, 5_000_000, 6_000_000, 7_500_000];

const cities = Array.from(new Set(properties.map((p) => p.city))).sort();

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full appearance-none rounded-[12px] border border-line bg-white px-4 text-sm text-navy transition-colors focus:border-navy focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

export function PropertiesBrowser({
  initialType = "",
  initialQuery = "",
}: {
  initialType?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState("");
  const [type, setType] = useState<string>(
    propertyTypes.includes(initialType as PropertyType) ? initialType : ""
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = properties.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      const matchesCity = !city || p.city === city;
      const matchesType = !type || p.type === type;
      const matchesMin = !minPrice || p.price >= Number(minPrice);
      const matchesMax = !maxPrice || p.price <= Number(maxPrice);
      const matchesBeds = !beds || p.beds >= Number(beds);
      const matchesBaths = !baths || p.baths >= Number(baths);
      return (
        matchesQuery &&
        matchesCity &&
        matchesType &&
        matchesMin &&
        matchesMax &&
        matchesBeds &&
        matchesBaths
      );
    });

    return list.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return b.year - a.year;
        case "largest":
          return b.sqft - a.sqft;
        default:
          return Number(b.featured) - Number(a.featured) || b.price - a.price;
      }
    });
  }, [query, city, type, minPrice, maxPrice, beds, baths, sort]);

  const activeFilters = [city, type, minPrice, maxPrice, beds, baths].filter(Boolean).length;

  function reset() {
    setQuery("");
    setCity("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setBeds("");
    setBaths("");
    setSort("featured");
  }

  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="shell">
        {/* Search + sort */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex h-14 flex-1 items-center gap-3 rounded-[14px] border border-line bg-white px-5 transition-colors focus-within:border-navy">
            <Search className="h-5 w-5 shrink-0 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, location or type…"
              aria-label="Search properties"
              className="h-full w-full bg-transparent text-sm text-navy placeholder:text-muted/70 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              className="inline-flex h-14 items-center gap-2.5 rounded-[14px] border border-line px-5 text-sm font-semibold text-navy transition-colors hover:border-navy lg:hidden"
            >
              <Sliders className="h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-navy px-1.5 text-[0.7rem] text-white">
                  {activeFilters}
                </span>
              )}
            </button>

            <label className="hidden items-center gap-3 rounded-[14px] border border-line px-5 lg:flex lg:h-14">
              <span className="whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                Sort
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort properties"
                className="h-full appearance-none bg-transparent pr-1 text-sm font-medium text-navy focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Filters */}
        <div className={`mt-6 ${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="grid gap-5 rounded-[18px] border border-line bg-ivory/60 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Select label="Location" value={city} onChange={setCity}>
              <option value="">All locations</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            <Select label="Property type" value={type} onChange={setType}>
              <option value="">All types</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>

            <Select label="Min price" value={minPrice} onChange={setMinPrice}>
              <option value="">No minimum</option>
              {priceSteps.map((p) => (
                <option key={p} value={p}>
                  ${(p / 1_000_000).toFixed(1)}M
                </option>
              ))}
            </Select>

            <Select label="Max price" value={maxPrice} onChange={setMaxPrice}>
              <option value="">No maximum</option>
              {priceSteps.map((p) => (
                <option key={p} value={p}>
                  ${(p / 1_000_000).toFixed(1)}M
                </option>
              ))}
            </Select>

            <Select label="Bedrooms" value={beds} onChange={setBeds}>
              <option value="">Any</option>
              {[3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}+ beds
                </option>
              ))}
            </Select>

            <Select label="Bathrooms" value={baths} onChange={setBaths}>
              <option value="">Any</option>
              {[3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}+ baths
                </option>
              ))}
            </Select>
          </div>

          <div className="mt-5 lg:hidden">
            <Select label="Sort by" value={sort} onChange={(v) => setSort(v as SortKey)}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-10 flex items-center justify-between gap-4 border-b border-line pb-5">
          <p className="text-sm text-muted">
            <span className="font-semibold text-navy">{results.length}</span>{" "}
            {results.length === 1 ? "property" : "properties"}
            {activeFilters > 0 && " matching your filters"}
          </p>
          {(activeFilters > 0 || query) && (
            <Button variant="ghost" size="sm" onClick={reset} className="!px-0">
              Clear all
            </Button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property: Property) => (
              <li key={property.id}>
                <PropertyCard property={property} className="h-full" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-16 flex flex-col items-center rounded-[20px] border border-dashed border-line py-20 text-center">
            <h3 className="text-lg font-bold text-navy">No properties match your search</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Try widening the price range or removing a filter.
            </p>
            <Button onClick={reset} className="mt-6">
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
