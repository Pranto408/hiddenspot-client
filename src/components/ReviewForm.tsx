"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Star } from "lucide-react";
import Link from "next/link";

export default function ReviewForm({
  spotId,
  onReviewAdded,
}: {
  spotId: string;
  onReviewAdded: () => void;
}) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="rounded-2xl border border-brand-teal/10 bg-brand-teal/5 p-6 text-center">
        <p className="text-sm text-ink-soft">
          <Link
            href="/login"
            className="font-semibold text-brand-teal hover:underline"
          >
            Log in
          </Link>{" "}
          to leave a review for this spot.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please write a short comment");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await api.post(`/spots/${spotId}/reviews`, { rating, comment });
      setComment("");
      setRating(5);
      onReviewAdded();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-brand-teal/10 bg-white p-6"
    >
      <h3 className="font-display text-lg font-semibold text-brand-teal">
        Leave a review
      </h3>

      <div className="mt-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            type="button"
            key={i}
            onClick={() => setRating(i)}
            aria-label={`Rate ${i} stars`}
          >
            <Star
              className={`h-6 w-6 ${i <= rating ? "fill-brand-gold text-brand-gold" : "text-brand-teal/15"}`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What made this spot worth visiting?"
        rows={3}
        className="mt-3 w-full rounded-xl border border-brand-teal/15 p-3 text-sm focus:border-brand-gold focus:outline-none"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-3 rounded-full bg-brand-teal px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand-teal-dark disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
