// src/components/GoogleProviderClient.tsx
"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProviderClient({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
