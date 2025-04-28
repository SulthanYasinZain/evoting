import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Token:", token);

  const protectedPaths = ["/home", "/admin"];
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/homepage", req.url));
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/homepage/:path*", "/login"],
};
