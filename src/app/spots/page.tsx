"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { CATEGORIES, DIFFICULTIES } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Plus, X, MapPinPlus } from "lucide-react";

function AddSpotForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [images, setImages] = useState<string[]>([""]);
  const [location, setLocation] = useState("");
  const [entryFee, setEntryFee] = useState("0");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateImage = (index: number, value: string) => {
    const next = [...images];
    next[index] = value;
    setImages(next);
  };

  const addImageField = () => setImages([...images, ""]);
  const removeImageField = (index: number) =>
    setImages(images.filter((_, i) => i !== index));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanImages = images.map((i) => i.trim()).filter(Boolean);
    if (cleanImages.length === 0) {
      setError("Please add at least one image URL");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/spots", {
        title,
        shortDescription,
        fullDescription,
        category,
        images: cleanImages,
        location,
        entryFee: Number(entryFee),
        bestTimeToVisit,
        difficulty,
      });
      router.push(`/spots/${res.data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create spot");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
          <MapPinPlus className="h-4 w-4" /> Add a spot
        </p>
        <h1 className="font-display text-3xl font-semibold text-brand-teal">
          Share a hidden gem
        </h1>
        <p className="mt-1 text-ink-soft">
          Add a real place — the next explorer will thank you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-ink">Title</label>
          <input
            required
            minLength={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sunset Point at Hatirjheel"
            className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink">
            Short description{" "}
            <span className="text-ink-soft">(max 160 characters)</span>
          </label>
          <input
            required
            minLength={10}
            maxLength={160}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="One sentence that hooks the reader"
            className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink">
            Full description
          </label>
          <textarea
            required
            minLength={30}
            rows={4}
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            placeholder="What makes this spot worth finding? What should visitors know?"
            className="mt-1 w-full rounded-xl border border-brand-teal/15 p-3 text-sm focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-ink">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className="mt-1 w-full rounded-xl border border-brand-teal/15 px-3 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as typeof difficulty)
              }
              className="mt-1 w-full rounded-xl border border-brand-teal/15 px-3 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-ink">
            Location / area
          </label>
          <input
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Dhanmondi, Dhaka"
            className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-ink">
              Entry fee (৳)
            </label>
            <input
              type="number"
              min={0}
              required
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
              className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">
              Best time to visit
            </label>
            <input
              required
              value={bestTimeToVisit}
              onChange={(e) => setBestTimeToVisit(e.target.value)}
              placeholder="e.g. Sunset, weekday mornings"
              className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-ink">Image URLs</label>
          <div className="mt-1 space-y-2">
            {images.map((img, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={img}
                  onChange={(e) => updateImage(i, e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(i)}
                    className="rounded-xl border border-brand-teal/15 px-3 text-ink-soft hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:underline"
          >
            <Plus className="h-4 w-4" /> Add another image
          </button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-teal py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand-teal-dark disabled:opacity-50"
        >
          {submitting ? "Publishing..." : "Publish spot"}
        </button>
      </form>
    </div>
  );
}

export default function AddSpotPage() {
  return (
    <ProtectedRoute>
      <AddSpotForm />
    </ProtectedRoute>
  );
}
