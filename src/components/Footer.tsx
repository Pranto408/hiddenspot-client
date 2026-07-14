import Link from "next/link";
import { Compass, MapPin, Mail } from "lucide-react";
import { CATEGORIES } from "@/types";

export default function Footer() {
  return (
    <footer className="border-t border-brand-teal/10 bg-brand-teal text-paper">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-brand-gold" />
              <span className="font-display text-lg font-semibold">
                HiddenSpot
              </span>
            </div>
            <p className="mt-3 text-sm text-paper/70">
              A field guide to Dhaka's hidden gems and micro-adventures — the
              places that don't make it into the guidebooks.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li>
                <Link href="/explore" className="hover:text-brand-gold">
                  All Spots
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold">
                  About HiddenSpot
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Categories
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/explore?category=${encodeURIComponent(cat)}`}
                    className="hover:text-brand-gold"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-gold" /> Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-gold" />{" "}
                hello@hiddenspot.app
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/10 pt-6 text-center text-xs text-paper/60">
          © {new Date().getFullYear()} HiddenSpot. Built for exploring Dhaka,
          one hidden corner at a time.
        </div>
      </div>
    </footer>
  );
}
