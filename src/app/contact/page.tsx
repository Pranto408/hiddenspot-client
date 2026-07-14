"use client";

import { useState, FormEvent } from "react";
import { Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill out all fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // No backend endpoint for contact submissions in this project —
    // this simulates a successful send. See note below in chat.
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
        <MessageCircle className="h-4 w-4" /> Contact
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-brand-teal">
        Get in touch
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Found a broken link, want to report an inappropriate spot, or just have
        feedback? Send us a message.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-brand-gold" />
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <p className="text-sm text-ink-soft">hello@hiddenspot.app</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand-gold" />
              <div>
                <p className="text-sm font-semibold text-ink">Based in</p>
                <p className="text-sm text-ink-soft">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {sent ? (
            <div className="flex items-start gap-3 rounded-2xl border border-brand-teal/10 bg-brand-teal/5 p-6">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-teal" />
              <div>
                <p className="font-semibold text-brand-teal">Message sent</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Thanks for reaching out — we&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-3 text-sm font-semibold text-brand-teal hover:underline"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-ink">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-brand-teal/15 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-brand-teal/15 p-3 text-sm focus:border-brand-gold focus:outline-none"
                  placeholder="What's on your mind?"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="rounded-full bg-brand-teal px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-teal-dark"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
