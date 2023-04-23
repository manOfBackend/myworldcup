import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getDecodedToken } from "./auth/util";

export const config = {
  matcher: ["/", "/chat", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};

export async function middleware(req: NextRequest) {
  const userToken = req.cookies.get("userToken");
  const url = req.nextUrl.clone();

  const decodedToken: DecodedIdToken | null = await getDecodedToken(userToken?.value ?? "");

  if (url.pathname === "/") {
    url.pathname = "/chat";
    return NextResponse.redirect(url);
  }

  if (url.pathname !== "/signin" && url.pathname !== "/signup" && !decodedToken) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "signup" && decodedToken) {
    url.pathname = "/chat";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/signin" && decodedToken) {
    url.pathname = "/chat";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}
