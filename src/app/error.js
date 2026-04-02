"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#ff5b06]">500</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">
        Something went wrong
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-[#ff5b06] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#e05200] transition"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-gray-300 text-gray-700 px-6 py-2.5 text-sm font-semibold hover:border-[#ff5b06] hover:text-[#ff5b06] transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
