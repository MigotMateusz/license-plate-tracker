"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const name = form.get("name") as string;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm px-6">
        <div className="mb-8 text-center">
          <Link href="/" className="font-mono text-sm font-bold tracking-wider text-zinc-100">
            PLATEHUNT
          </Link>
          <p className="mt-4 text-2xl font-bold">Create account</p>
          <p className="mt-1 text-sm text-zinc-500">Start tracking plates today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" type="text" placeholder="Name (optional)" autoComplete="name" />
          <Input name="email" type="email" placeholder="Email" required autoComplete="email" />
          <Input
            name="password"
            type="password"
            placeholder="Password (min 8 chars)"
            required
            minLength={8}
            autoComplete="new-password"
            error={error || undefined}
          />
          <Button type="submit" className="w-full" loading={loading}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-zinc-300 hover:text-zinc-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
