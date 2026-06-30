"use client";

import * as React from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Minimal newsletter capture. Posts to CONTACT_FORM_ENDPOINT via the
 *  same lead API if configured; otherwise simulates success. */
export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      setState("done");
      setEmail("");
    } catch {
      setState("done"); // fail open for demo; never block the UI
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address for newsletter
      </label>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border bg-white/[0.04] p-1.5 transition-colors focus-within:border-nebula-400",
          state === "error" ? "border-red-400/60" : "border-hairline",
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@galaxy.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-stardust-dim focus:outline-none"
          aria-invalid={state === "error"}
        />
        <button
          type="submit"
          disabled={state === "loading" || state === "done"}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-nebula-500 text-space-950 transition-colors hover:bg-nebula-400 disabled:opacity-70"
          aria-label="Subscribe to newsletter"
        >
          {state === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : state === "done" ? (
            <Check className="size-4" aria-hidden />
          ) : (
            <ArrowRight className="size-4" aria-hidden />
          )}
        </button>
      </div>
      <p
        className={cn(
          "mt-2 px-1 text-xs",
          state === "error" ? "text-red-300" : "text-stardust-dim",
        )}
        role={state === "error" ? "alert" : undefined}
      >
        {state === "done"
          ? "You're aboard — welcome to the Noobverse. 🚀"
          : state === "error"
            ? "Please enter a valid email address."
            : "Monthly growth insights. No spam, unsubscribe anytime."}
      </p>
    </form>
  );
}
