"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Spot, SpotsResponse } from "@/types";
import SpotCard from "@/components/SpotCard";
import SpotCardSkeleton from "@/components/SpotCardSkeleton";
import ExploreFilters from "@/components/ExploreFilters";
import Pagination from "@/components/Pagination";
import { Compass } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || "",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [spots, setSpots] = useState<Spot[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchSpots = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), sort };
      if (search) params.search = search;
      if (category) params.category = category;
      if (difficulty) params.difficulty = difficulty;

      const res = await api.get<SpotsResponse>("/spots", { params });
      setSpots(res.data.items);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch {
      setSpots([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, difficulty, sort, page]);

  useEffect(() => {
    fetchSpots();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (difficulty) params.set("difficulty", difficulty);
    if (sort !== "newest") params.set("sort", sort);
    if (page !== 1) params.set("page", String(page));
    router.replace(`/explore${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, difficulty, sort, page]);

  // Reset to page 1 whenever a filter changes (not when page itself changes)
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, difficulty, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
          <Compass className="h-4 w-4" /> Explore
        </p>
        <h1 className="font-display text-3xl font-semibold text-brand-teal sm:text-4xl">
          Every hidden spot in Dhaka
        </h1>
        <p className="mt-1 text-ink-soft">
          {loading
            ? "Searching..."
            : `${total} spot${total !== 1 ? "s" : ""} found`}
        </p>
      </div>

      <ExploreFilters
        search={search}
        category={category}
        difficulty={difficulty}
        sort={sort}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
        onSortChange={setSort}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <SpotCardSkeleton key={i} />)}
        {!loading &&
          spots.map((spot) => <SpotCard key={spot._id} spot={spot} />)}
      </div>

      {!loading && spots.length === 0 && (
        <div className="mt-16 text-center text-ink-soft">
          No spots match your filters. Try widening your search.
        </div>
      )}

      {!loading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={<div className="px-6 py-12 text-center">Loading...</div>}
    >
      <ExploreContent />
    </Suspense>
  );
}
