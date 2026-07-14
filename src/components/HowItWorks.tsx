import { Compass, MapPinned, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Discover a spot",
    description:
      "Browse real hidden gems added by explorers across Dhaka — filtered by category, difficulty, or budget.",
  },
  {
    number: "02",
    icon: MapPinned,
    title: "Plan your visit",
    description:
      "Every spot lists the real entry fee, best time to visit, and difficulty level, so you know exactly what to expect.",
  },
  {
    number: "03",
    icon: Users,
    title: "Share your find",
    description:
      "Add your own hidden spot or leave a review to help the next explorer plan their trip.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
        The process
      </p>
      <h2 className="font-display text-3xl font-semibold text-brand-teal">
        How HiddenSpot works
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative rounded-2xl border border-brand-teal/10 p-6"
          >
            <span className="font-display text-4xl font-semibold text-brand-teal/10">
              {step.number}
            </span>
            <step.icon className="mt-2 h-7 w-7 text-brand-gold" />
            <h3 className="mt-3 font-display text-lg font-semibold text-brand-teal">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-ink-soft">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
