"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./ui/Button";
import { Check } from "./ui/Icons";

const interests = [
  "Buying a home",
  "Selling a property",
  "Property investment",
  "Valuation or advisory",
  "Something else",
];

const fieldClass =
  "h-12 w-full rounded-[12px] border border-line bg-white px-4 text-sm text-navy placeholder:text-muted/60 transition-colors focus:border-navy focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[20px] border border-line bg-ivory/60 px-8 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-xl font-bold text-navy">Thank you — message received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          One of our advisors will be in touch within one business day.
        </p>
        <Button variant="outlineDark" className="mt-7" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] border border-line p-7 shadow-soft sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Full name
          </span>
          <input required name="name" autoComplete="name" placeholder="Jane Doe" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Email
          </span>
          <input required type="email" name="email" autoComplete="email" placeholder="jane@email.com" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Phone
          </span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="(555) 000-0000" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            I&apos;m interested in
          </span>
          <select name="interest" defaultValue={interests[0]} className={`${fieldClass} appearance-none`}>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell us what you're looking for…"
          className="w-full rounded-[12px] border border-line bg-white px-4 py-3 text-sm text-navy placeholder:text-muted/60 transition-colors focus:border-navy focus:outline-none"
        />
      </label>

      <Button type="submit" size="lg" withArrow className="mt-7 w-full sm:w-auto">
        Send Message
      </Button>
      <p className="mt-4 text-xs text-muted">
        We respond within one business day. Your details are never shared.
      </p>
    </form>
  );
}
