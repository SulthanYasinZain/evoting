/*eslint-disable @typescript-eslint/no-explicit-any*/
"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LoginUser(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { message: "Email and password are required" };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 422) {
      return { message: "Invalid credentials" };
    }
    if (response.status === 500) {
      return { message: "Server error, please try again later" };
    }
    return { message: "Login failed", success: false };
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
  cookieStore.set("token_type", token_type, options);

  redirect("/home");
}
