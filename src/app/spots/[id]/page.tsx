"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import { Spot } from "@/types";
import StarRating from "@/components/StarRating";
import ReviewForm from "@/components/ReviewForm";
import SpotCard from "@/components/SpotCard";
import { MapPin, Ticket, Clock, Gauge, ArrowLeft } from "lucide-react";

export default function SpotDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [spot, setSpot] = useState<Spot | null>(null);
  const [related, setRelated] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const fetchSpot = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/spots/${id}`);
      setSpot(res.data.spot);
      setRelated(res.data.related);
      setActiveImage(0);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSpot();
  }, [fetchSpot]);

  if (loading) {
    return (
      <div className="px-6 py-24 text-center text-ink-soft">
        Loading spot...
      </div>
    );
  }

  if (notFound || !spot) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-ink-soft">
          This spot doesn&apos;t exist or was removed.
        </p>
        <Link
          href="/explore"
          className="mt-3 inline-block text-brand-teal hover:underline"
        >
          ← Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/explore"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand-teal"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      {/* Image gallery */}
      <div className="overflow-hidden rounded-2xl">
        <div className="relative h-72 w-full bg-brand-teal/5 sm:h-96">
          <Image
            src={spot.images[activeImage]}
            alt={spot.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        {spot.images.length > 1 && (
          <div className="mt-2 flex gap-2">
            {spot.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative h-16 w-24 overflow-hidden rounded-lg border-2 ${
                  i === activeImage ? "border-brand-gold" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
            {spot.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-teal sm:text-4xl">
            {spot.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
            <MapPin className="h-4 w-4" /> {spot.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={spot.averageRating} size={20} />
          <span className="text-sm font-medium text-ink-soft">
            {spot.averageRating > 0
              ? spot.averageRating.toFixed(1)
              : "No ratings yet"}
            {spot.reviews.length > 0 && ` (${spot.reviews.length})`}
          </span>
        </div>
      </div>

      {/* Quick facts */}
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-brand-teal/10 bg-brand-teal/5 p-5 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-sm">
          <Ticket className="h-4 w-4 text-brand-gold" />
          <span>
            {spot.entryFee > 0 ? `৳${spot.entryFee} entry fee` : "Free entry"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-brand-gold" />
          <span>{spot.bestTimeToVisit}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Gauge className="h-4 w-4 text-brand-gold" />
          <span>{spot.difficulty} difficulty</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-semibold text-brand-teal">
          About this spot
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          {spot.fullDescription}
        </p>
        <p className="mt-4 text-xs text-ink-soft">
          Added by {spot.addedByName}
        </p>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold text-brand-teal">
          Reviews {spot.reviews.length > 0 && `(${spot.reviews.length})`}
        </h2>

        <div className="mt-4 space-y-4">
          {spot.reviews.length === 0 && (
            <p className="text-sm text-ink-soft">
              No reviews yet — be the first to share your experience.
            </p>
          )}
          {spot.reviews.map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border border-brand-teal/10 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-teal">
                  {review.userName}
                </span>
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="mt-2 text-sm text-ink-soft">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <ReviewForm spotId={spot._id} onReviewAdded={fetchSpot} />
        </div>
      </div>

      {/* Related spots */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold text-brand-teal">
            More {spot.category} spots
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <SpotCard key={r._id} spot={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
