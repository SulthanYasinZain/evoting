import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  const origin = new URL(request.url).origin; // ✅ get full domain
  return NextResponse.redirect(`${origin}/login`); // ✅ absolute redirect
}
