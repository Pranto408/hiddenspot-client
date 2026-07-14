import Link from "next/link";
import {
  Mountain,
  Coffee,
  Trees,
  Landmark,
  Building2,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { CATEGORIES, SpotCategory } from "@/types";

const ICONS: Record<SpotCategory, React.ElementType> = {
  Viewpoint: Mountain,
  Cafe: Coffee,
  Park: Trees,
  Heritage: Landmark,
  Rooftop: Building2,
  "Street Food": UtensilsCrossed,
  Lake: Waves,
};

export default function CategoryGrid() {
  return (
    <section className="bg-brand-teal/5 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
          Browse by mood
        </p>
        <h2 className="font-display text-3xl font-semibold text-brand-teal">
          What kind of adventure today?
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat];
            return (
              <Link
                key={cat}
                href={`/explore?category=${encodeURIComponent(cat)}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-brand-teal/10 bg-white p-6 text-center transition-colors hover:border-brand-gold"
              >
                <Icon className="h-7 w-7 text-brand-teal" />
                <span className="text-sm font-medium text-ink">{cat}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
