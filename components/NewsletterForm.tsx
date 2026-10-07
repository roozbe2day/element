"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "./ui/Icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="newsletter-email" className="text-label font-semibold uppercase text-gold">
        Newsletter
      </label>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        New listings and market notes, sent occasionally.
      </p>

      <div className="mt-4 flex items-center gap-2 border-b border-white/25 pb-2 transition-colors focus-within:border-gold">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="you@email.com"
          className="h-10 w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-transform duration-300 ease-premium hover:scale-105"
        >
          {done ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      <p
        role="status"
        className={`mt-3 text-xs text-gold transition-opacity duration-300 ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        Thank you — you are on the list.
      </p>
    </form>
  );
}
