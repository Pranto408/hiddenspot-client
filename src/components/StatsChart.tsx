"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Spot } from "@/types";

export default function StatsChart({ spots }: { spots: Spot[] }) {
  const counts: Record<string, number> = {};
  spots.forEach((s) => {
    counts[s.category] = (counts[s.category] || 0) + 1;
  });
  const data = Object.entries(counts).map(([category, count]) => ({
    category,
    count,
  }));

  if (data.length === 0) return null;

  return (
    <section className="bg-brand-teal/5 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
          By the numbers
        </p>
        <h2 className="font-display text-3xl font-semibold text-brand-teal">
          Spots by category
        </h2>
        <div className="mt-8 h-80 rounded-2xl border border-brand-teal/10 bg-white p-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3d3e10" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 12, fill: "#4a524e" }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#4a524e" }}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#0f3d3e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
