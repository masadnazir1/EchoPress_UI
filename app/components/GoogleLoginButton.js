"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import authService from "../services/authService";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function GoogleLoginButton() {
  const Router = useRouter();

  const [loading, setLoading] = useState(false); // ⬅️ loading state

  const handleSuccess = async (credentialResponse) => {
    setLoading(true); // Start loading
    try {
      const { credential } = credentialResponse;
      const token = credential;
      //
      // Send token to your backend to verify and generate JWT
      const res = await authService.GoogleLogin(token);

      // Save JWT (localStorage, cookie, or your auth context)
      localStorage.setItem("JWT", res.token);
      //get the user id and set in the localstorage
      const decoded = jwtDecode(res.token);
      localStorage.setItem("id", decoded.id);

      Router.push("/home");

      // Optionally redirect or update UI
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      <div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <span>Loading...</span> {/* You can replace this with a spinner */}
          </div>
        ) : (
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        )}
      </div>
    </div>
  );
}
