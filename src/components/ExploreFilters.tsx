"use client";

import { CATEGORIES, DIFFICULTIES } from "@/types";
import { Search, SlidersHorizontal } from "lucide-react";

interface Props {
  search: string;
  category: string;
  difficulty: string;
  sort: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onDifficultyChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

export default function ExploreFilters({
  search,
  category,
  difficulty,
  sort,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onSortChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-brand-teal/10 bg-white p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-teal">
        <SlidersHorizontal className="h-4 w-4" /> Filter & sort
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search spots..."
            className="w-full rounded-xl border border-brand-teal/15 py-2.5 pl-9 pr-3 text-sm focus:border-brand-gold focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-xl border border-brand-teal/15 px-3 py-2.5 text-sm text-ink focus:border-brand-gold focus:outline-none"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="rounded-xl border border-brand-teal/15 px-3 py-2.5 text-sm text-ink focus:border-brand-gold focus:outline-none"
        >
          <option value="">Any difficulty</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-brand-teal/15 px-3 py-2.5 text-sm text-ink focus:border-brand-gold focus:outline-none"
        >
          <option value="newest">Newest first</option>
          <option value="rating">Highest rated</option>
          <option value="priceLow">Entry fee: Low to High</option>
          <option value="priceHigh">Entry fee: High to Low</option>
        </select>
      </div>
    </div>
  );
}
