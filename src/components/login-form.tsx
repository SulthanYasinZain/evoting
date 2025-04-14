"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import loginUser from "@/app/action/login-user";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Login"
      )}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <div className="w-full max-w-md bg-white rounded-lg border border-gray-100 p-8 transition-all duration-300 hover:translate-y-[-2px]">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mb-4">
          <span className="text-yellow-800 text-2xl font-bold">U</span>
        </div>

        <h1 className="text-xl font-bold text-center">
          Website Pemilu Fakultas Hukum UPNVJ
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Website Pemilu Fakultas Hukum UPNVJ
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {state?.message && (
          <div
            className={`p-3 rounded-md text-sm border ${
              state.success
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {state.message}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
            NIM
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Masukkan email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />
        </div>

        <div className="pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
