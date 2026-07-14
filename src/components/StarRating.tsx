import { Star } from "lucide-react";

export default function StarRating({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={
            i <= Math.round(rating)
              ? "fill-brand-gold text-brand-gold"
              : "text-brand-teal/15"
          }
        />
      ))}
    </div>
  );
}
