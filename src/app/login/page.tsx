"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Compass, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login("demo@hiddenspot.com", "demo123");
      router.push("/");
    } catch {
      setError("Demo login failed. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <Compass className="mx-auto h-8 w-8 text-brand-gold" />
        <h1 className="mt-3 font-display text-3xl font-semibold text-brand-teal">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Log in to add spots and leave reviews.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-ink">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-teal py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-teal-dark disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-brand-teal/10" />
        <span className="text-xs text-ink-soft">or</span>
        <div className="h-px flex-1 bg-brand-teal/10" />
      </div>

      <button
        onClick={handleDemoLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-gold/10 disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4 text-brand-gold" />
        Try demo account
      </button>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-teal hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
