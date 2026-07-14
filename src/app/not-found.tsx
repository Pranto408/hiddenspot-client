"use client"
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="font-display text-8xl md:text-9xl font-bold text-brand-gold">
          404
        </h1>

        {/* Divider */}
        <div className="mx-auto my-6 h-[2px] w-24 bg-brand-gold/40"></div>

        {/* Heading */}
        <h2 className="font-display text-3xl md:text-5xl text-brand-teal">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-6 text-lg text-ink-soft font-body leading-relaxed">
          The page you are looking for seems to have wandered off the path.
          Perhaps it never existed, or it has found a new home.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/"
            className="rounded-full bg-brand-teal px-8 py-3 text-paper font-medium transition-all duration-300 hover:bg-brand-teal-dark hover:scale-105"
          >
            Return Home
          </a>

          <button
            onClick={() => window.history.back()}
            className="rounded-full border border-brand-gold px-8 py-3 text-brand-teal font-medium transition-all duration-300 hover:bg-brand-gold hover:text-brand-teal-dark"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Text */}
        <p className="mt-12 font-display italic text-brand-gold/80">
          "Not all who wander are lost."
        </p>
      </div>
    </div>
  );
}
