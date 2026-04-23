"use client";

import { useState, type FormEvent } from "react";

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; rank: number; message: string }
  | { kind: "error"; message: string };

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setResult({ kind: "loading" });

    const ref =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("ref")
        : null;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ref }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        rank?: number;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not sign up. Try again in a minute.");
      }
      setResult({
        kind: "success",
        rank: data.rank ?? 0,
        message: `You're in. Position #${data.rank}. Check your inbox.`,
      });
      setEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setResult({ kind: "error", message });
    }
  }

  return (
    <>
      <form className="waitlist-form" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="you@yourstartup.com"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={result.kind === "loading"}
        />
        <button type="submit" disabled={result.kind === "loading"}>
          {result.kind === "loading" ? "Checking..." : "Join waitlist →"}
        </button>
      </form>
      <p className="waitlist-fineprint">
        No spam. Weekly Breach Watch. Unsubscribe anytime.
      </p>
      {result.kind === "success" ? (
        <div className="waitlist-result">{result.message}</div>
      ) : null}
      {result.kind === "error" ? (
        <div className="waitlist-result waitlist-result-error">
          {result.message}
        </div>
      ) : null}
    </>
  );
}
