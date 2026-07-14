import Hero from "@/components/Hero";
import SpotCard from "@/components/SpotCard";
import CategoryGrid from "@/components/CategoryGrid";
import HowItWorks from "@/components/HowItWorks";
import StatsChart from "@/components/StatsChart";
import CTASection from "@/components/CTASection";
import { Spot, SpotsResponse } from "@/types";

async function getFeaturedSpots(): Promise<Spot[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/spots?sort=rating&page=1`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data: SpotsResponse = await res.json();
    return data.items.slice(0, 4);
  } catch {
    return [];
  }
}

async function getAllSpotsForStats(): Promise<Spot[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/spots?page=1`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data: SpotsResponse = await res.json();
    return data.items;
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = await getFeaturedSpots();
  const allSpots = await getAllSpotsForStats();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Handpicked
            </p>
            <h2 className="font-display text-3xl font-semibold text-brand-teal">
              Top-rated hidden spots
            </h2>
          </div>
          <a
            href="/explore"
            className="hidden text-sm font-semibold text-brand-teal hover:underline md:block"
          >
            View all spots →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((spot) => (
            <SpotCard key={spot._id} spot={spot} />
          ))}
        </div>
        {featured.length === 0 && (
          <p className="text-ink-soft">
            No spots yet — make sure your backend is running on port 5000.
          </p>
        )}
      </section>

      <CategoryGrid />
      <HowItWorks />
      <StatsChart spots={allSpots} />
      <CTASection />
    </>
  );
}