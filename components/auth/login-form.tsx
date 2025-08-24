"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError("Neplatné přihlašovací údaje");
      } else {
        // Redirect to home
        window.location.href = "/";
      }
    } catch (e) {
      setError("Chyba přihlášení");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Heslo</label>
        <input
          type="password"
          className="mt-1 w-full rounded border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Přihlašuji…" : "Přihlásit se"}
      </button>
    </form>
  );
}
