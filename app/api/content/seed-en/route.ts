import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CONTENT_KEYS } from "@/lib/contentKeys";

function allowlist(): Set<string> {
  return new Set(
    [
      process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      "vojta.tranta@gmail.com",
      ...(process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(",") : []),
    ]
      .filter(Boolean)
      .map((e) => String(e).toLowerCase().trim())
  );
}

function kvConfigured() {
  return Boolean(
    process.env.KV_URL &&
      process.env.KV_REST_API_TOKEN &&
      process.env.KV_REST_API_READ_ONLY_TOKEN
  );
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = (session?.user?.email || "").toLowerCase();
  if (!email || !allowlist().has(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!kvConfigured()) {
    return NextResponse.json(
      { error: "KV not configured" },
      { status: 503 }
    );
  }

  const { overwrite } = (await request.json().catch(() => ({}))) as {
    overwrite?: boolean;
  };

  const results: { key: string; from?: string | null; to?: string | null; status: string }[] = [];

  for (const key of CONTENT_KEYS) {
    const csKey = `content:${key}`;
    const enKey = `content:en:${key}`;

    const [csVal, enVal] = await Promise.all([
      kv.get<string>(csKey),
      kv.get<string>(enKey),
    ]);

    if (overwrite || enVal == null) {
      if (csVal != null) {
        await kv.set(enKey, csVal);
        results.push({ key, from: csVal, to: csVal, status: overwrite ? "overwritten" : "seeded" });
      } else {
        results.push({ key, from: null, to: null, status: "skipped_no_cs_value" });
      }
    } else {
      results.push({ key, status: "kept_existing_en" });
    }
  }

  return NextResponse.json({ ok: true, count: results.length, results });
}
