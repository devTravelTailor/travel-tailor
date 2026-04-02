import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Travel Tailor",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#ff5b06]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">
        Page not found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you are looking for may have been moved, deleted, or never
        existed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff5b06] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#e05200] transition"
      >
        Back to home
      </Link>
    </main>
  );
}
