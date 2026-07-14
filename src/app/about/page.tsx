import { Compass, Heart, Users, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
        <Compass className="h-4 w-4" /> About
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-brand-teal">
        A field guide to Dhaka&apos;s hidden corners
      </h1>

      <p className="mt-6 leading-relaxed text-ink-soft">
        Dhaka is one of the densest cities on Earth, and most of what makes it
        interesting never makes it into a guidebook. Behind the traffic and the
        noise are centuries-old courtyards, rooftop cafes with no sign on the
        street, wetlands that fill with migratory birds every winter, and street
        food alleys that only locals know to look for.
      </p>

      <p className="mt-4 leading-relaxed text-ink-soft">
        HiddenSpot started as a simple idea: what if the people who actually
        live here could map the places worth finding? Every spot on this site
        was added by someone who has actually been there — not scraped from a
        travel blog, not generated, not guessed at.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-brand-teal/10 p-6 text-center">
          <MapPin className="mx-auto h-6 w-6 text-brand-gold" />
          <p className="mt-3 font-display text-2xl font-semibold text-brand-teal">
            Real places
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Every spot is a real, visitable location in and around Dhaka.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-teal/10 p-6 text-center">
          <Users className="mx-auto h-6 w-6 text-brand-gold" />
          <p className="mt-3 font-display text-2xl font-semibold text-brand-teal">
            Community-built
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Anyone can add a spot and share what they know about it.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-teal/10 p-6 text-center">
          <Heart className="mx-auto h-6 w-6 text-brand-gold" />
          <p className="mt-3 font-display text-2xl font-semibold text-brand-teal">
            No fluff
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Real entry fees, real difficulty, real best-time-to-visit info.
          </p>
        </div>
      </div>

      <div className="mt-14 rounded-2xl bg-brand-teal/5 p-8">
        <h2 className="font-display text-xl font-semibold text-brand-teal">
          Why &quot;hidden&quot;?
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          We&apos;re not talking about Dhaka&apos;s major landmarks — those are
          already easy to find. HiddenSpot focuses on micro-adventures: the
          alley cafe, the quiet lake trail, the rooftop view that only a handful
          of people know about. If it&apos;s already on every top-10 list, it
          probably doesn&apos;t belong here.
        </p>
      </div>
    </div>
  );
}
