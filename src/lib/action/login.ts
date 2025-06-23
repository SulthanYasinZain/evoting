/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginResponse {
  error?: string;
  success: boolean;
}

export default async function Login(
  prevState: any,
  formData: FormData
): Promise<LoginResponse> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "Email and password are required",
      success: false,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-cache",
    });

    if (!response.ok) {
      return {
        error: "Invalid email or password",
        success: false,
      };
    }

    const data = await response.json();

    if (!data.token || !data.token_type) {
      return {
        error: "Invalid server response",
        success: false,
      };
    }

    const cookieStore = await cookies();
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    };

    cookieStore.set("token", data.token, options);
    cookieStore.set("token_type", data.token_type, options);
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      error: "An error occurred during login. Please try again later.",
      success: false,
    };
  }
  redirect("/homepage");
}
