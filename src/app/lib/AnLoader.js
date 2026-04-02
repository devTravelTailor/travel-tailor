"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AnalyticsInner = dynamic(() => import("./Analytics"), {
  ssr: false,
  loading: () => null,
});

const GtagInner = dynamic(() => import("./Gtag"), {
  ssr: false,
  loading: () => null,
});

export default function AnalyticsLoader() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
      <GtagInner />
    </Suspense>
  );
}
