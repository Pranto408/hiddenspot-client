"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { CATEGORIES } from "@/types";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/explore${query ? `?search=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <section className="relative flex min-h-[68vh] flex-col justify-center overflow-hidden bg-brand-teal-dark px-6 text-paper">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1200 700"
        fill="none"
      >
        <path
          d="M40 600 Q 250 500 300 350 T 600 200 T 900 320 T 1160 100"
          stroke="#E8A33D"
          strokeWidth="2"
          strokeDasharray="2 14"
          strokeLinecap="round"
        />
        {[[40, 600], [300, 350], [600, 200], [900, 320], [1160, 100]].map(
          ([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="5" fill="#E8A33D" />
          )
        )}
      </svg>

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-gold">
          <MapPin className="h-4 w-4" /> Dhaka, Bangladesh
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          The city has secrets.
          <br />
          Go find them.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-paper/75">
          HiddenSpot is a growing field guide to Dhaka&apos;s hidden gems and
          micro-adventures — real places, added by real explorers, that never
          made it into the guidebooks.
        </p>

        <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rooftops, trails, cafes…"
            className="flex-1 rounded-full border border-paper/20 bg-paper/10 px-5 py-3 text-sm text-paper placeholder:text-paper/50 focus:border-brand-gold focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-teal-dark transition-colors hover:bg-brand-gold-light"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`/explore?category=${encodeURIComponent(cat)}`}
              className="rounded-full border border-paper/20 px-4 py-1.5 text-xs font-medium text-paper/80 transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              {cat}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}