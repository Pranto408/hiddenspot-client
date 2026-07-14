"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, Compass, LogOut, User as UserIcon } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/spots/add", label: "Add Spot" },
    { href: "/spots/manage", label: "Manage Spots" },
    { href: "/about", label: "About" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-teal/10 bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-brand-gold" strokeWidth={2.2} />
          <span className="font-display text-xl font-semibold text-brand-teal">
            HiddenSpot
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-teal"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-4 md:flex">
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-ink-soft hover:text-brand-teal"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-brand-teal px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand-teal-dark"
              >
                Sign up
              </Link>
            </>
          )}
          {!loading && user && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                <UserIcon className="h-4 w-4" />
                {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-full border border-brand-teal/20 px-4 py-2 text-sm font-medium text-brand-teal transition-colors hover:bg-brand-teal hover:text-paper"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-brand-teal/10 bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink-soft"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-brand-teal/10" />
            {!loading && !user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-ink-soft"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-brand-teal"
                >
                  Sign up
                </Link>
              </>
            )}
            {!loading && user && (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-brand-teal"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
