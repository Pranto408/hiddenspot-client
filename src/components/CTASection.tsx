import Link from "next/link";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="rounded-3xl bg-brand-teal px-8 py-14 text-center text-paper">
        <h2 className="font-display text-3xl font-semibold">
          Know a spot nobody talks about?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-paper/75">
          Create a free account and add it to the map — your favorite hidden
          corner of Dhaka deserves to be found.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-teal-dark transition-colors hover:bg-brand-gold-light"
        >
          Add your first spot
        </Link>
      </div>
    </section>
  );
}
