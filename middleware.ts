import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only consider the root path. Do not interfere with other routes.
  if (pathname !== "/") return NextResponse.next();

  const accept = req.headers.get("accept-language") || "";
  // If the browser is not Czech or Slovak, redirect root to /en
  const firstLang = accept.split(",")[0]?.trim().toLowerCase() || "";
  const isCzech = firstLang.startsWith("cs");
  const isSlovak = firstLang.startsWith("sk");
  if (!isCzech && !isSlovak) {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  // Default locale (cs) stays on root
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
