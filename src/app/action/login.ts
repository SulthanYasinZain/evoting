"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login(prevstate: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "Email and password are required",
      success: false,
    };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return {
      error: "Invalid email or password",
      success: false,
    };
  }

  const { token, token_type } = await response.json();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  };

  const cookieStore = await cookies();
  cookieStore.set("token", token, options);
  //   cookieStore.set("token_type", token_type, options);

  redirect("/homepage");
}
