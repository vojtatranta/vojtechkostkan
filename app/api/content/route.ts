import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function allowlist(): Set<string> {
  return new Set(
    [
      process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      "vojta.tranta@gmail.com",
      ...(process.env.ALLOWED_USERS
        ? process.env.ALLOWED_USERS.split(",")
        : []),
    ]
      .filter(Boolean)
      .map((e) => String(e).toLowerCase().trim())
  );
}

function kvConfigured() {
  const has = Boolean(
    process.env.KV_URL &&
      process.env.KV_REST_API_TOKEN &&
      process.env.KV_REST_API_READ_ONLY_TOKEN
  );
  return has;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  try {
    if (!kvConfigured()) {
      // When KV isn't configured, return null so the UI can still render placeholders
      return NextResponse.json({ value: null });
    }
    const value = await kv.get<string>(`content:${key}`);
    return NextResponse.json({ value: value ?? null });
  } catch (e) {
    return NextResponse.json({ error: "KV read error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = (session?.user?.email || "").toLowerCase();
  if (!email || !allowlist().has(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key, value } = (await request.json()) as {
    key?: string;
    value?: string;
  };
  if (!key || typeof value !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    if (!kvConfigured()) {
      return NextResponse.json(
        {
          error:
            "KV not configured. Set KV_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN in your environment.",
        },
        { status: 503 }
      );
    }
    await kv.set(`content:${key}`, value);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "KV write error" }, { status: 500 });
  }
}
