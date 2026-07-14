import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Ticket } from "lucide-react";
import { Spot } from "@/types";

export default function SpotCard({ spot }: { spot: Spot }) {
  return (
    <Link
      href={`/spots/${spot._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-teal/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden bg-brand-teal/5">
        <Image
          src={spot.images[0]}
          alt={spot.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
          unoptimized
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-teal-dark/90 px-3 py-1 text-xs font-medium text-paper">
          {spot.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold text-brand-teal line-clamp-1">
          {spot.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">
          {spot.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm text-ink-soft">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {spot.location.split(",")[0]}
          </span>
          <span className="flex items-center gap-1 font-medium text-brand-gold">
            <Star className="h-3.5 w-3.5 fill-brand-gold" />
            {spot.averageRating > 0 ? spot.averageRating.toFixed(1) : "New"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-ink-soft">
          <Ticket className="h-3.5 w-3.5" />
          {spot.entryFee > 0 ? `৳${spot.entryFee} entry` : "Free entry"}
        </div>
      </div>
    </Link>
  );
}
