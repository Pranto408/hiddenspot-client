"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { Spot } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import StarRating from "@/components/StarRating";
import { LayoutList, Trash2, ExternalLink, Plus } from "lucide-react";

function ManageSpotsContent() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchMySpots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<Spot[]>("/spots/mine");
      setSpots(res.data);
    } catch {
      setError("Failed to load your spots");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMySpots();
  }, [fetchMySpots]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.delete(`/spots/${id}`);
      setSpots((prev) => prev.filter((s) => s._id !== id));
      setConfirmId(null);
    } catch {
      setError("Failed to delete spot");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
            <LayoutList className="h-4 w-4" /> Manage spots
          </p>
          <h1 className="font-display text-3xl font-semibold text-brand-teal">
            Your contributed spots
          </h1>
        </div>
        <Link
          href="/spots/add"
          className="flex items-center gap-1.5 rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-paper hover:bg-brand-teal-dark"
        >
          <Plus className="h-4 w-4" /> Add new spot
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {loading && <p className="text-ink-soft">Loading your spots...</p>}

      {!loading && spots.length === 0 && (
        <div className="rounded-2xl border border-brand-teal/10 bg-brand-teal/5 p-10 text-center">
          <p className="text-ink-soft">You haven&apos;t added any spots yet.</p>
          <Link
            href="/spots/add"
            className="mt-3 inline-block font-semibold text-brand-teal hover:underline"
          >
            Add your first spot →
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {spots.map((spot) => (
          <div
            key={spot._id}
            className="flex flex-col gap-4 rounded-2xl border border-brand-teal/10 bg-white p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-20 w-full flex-shrink-0 overflow-hidden rounded-xl bg-brand-teal/5 sm:w-28">
              <Image
                src={spot.images[0]}
                alt={spot.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-brand-teal">
                  {spot.title}
                </h3>
                <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-teal">
                  {spot.category}
                </span>
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-ink-soft">
                {spot.shortDescription}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-ink-soft">
                <StarRating rating={spot.averageRating} size={12} />
                <span>
                  {spot.reviews.length} review
                  {spot.reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/spots/${spot._id}`}
                className="flex items-center gap-1.5 rounded-full border border-brand-teal/15 px-4 py-2 text-sm font-medium text-brand-teal hover:bg-brand-teal/5"
              >
                <ExternalLink className="h-3.5 w-3.5" /> View
              </Link>

              {confirmId === spot._id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(spot._id)}
                    disabled={deletingId === spot._id}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {deletingId === spot._id ? "Deleting..." : "Confirm"}
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="rounded-full border border-brand-teal/15 px-4 py-2 text-sm font-medium text-ink-soft"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(spot._id)}
                  className="flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ManageSpotsPage() {
  return (
    <ProtectedRoute>
      <ManageSpotsContent />
    </ProtectedRoute>
  );
}
