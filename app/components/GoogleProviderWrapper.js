"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

// Replace this with your actual client ID
const GOOGLE_CLIENT_ID =
  "89965652232-nua4e80286pgl1hkpdlfsdeg7n42l7lj.apps.googleusercontent.com";

export default function GoogleProviderWrapper({ children }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}
