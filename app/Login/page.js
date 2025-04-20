"use client";
import { useState } from "react";
import styles from "./Login.module.css";

import { jwtDecode } from "jwt-decode";
import BackPNG from "../assets/UniversalIcons/Back.png";
import Image from "next/image";
import authService from "@/app/services/authService";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //
  //
  const handleLogin = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    try {
      const data = await authService.loginUser(email, password);
      // Handle successful login, redirect to dashboard or another page
      setLoading(false);

      if (data.message === "Login successful") {
        const decoded = jwtDecode(data.token);
        localStorage.setItem("id", decoded.id);

        setError("Login successful");
        router.push("/home");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  //
  return (
    <div className={styles.loginWrapper}>
      <button className={styles.Back} onClick={() => router.back()}>
        <Image src={BackPNG} width={30} height={30} alt="Back" />
      </button>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please log in to your account</p>

        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={styles.input}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.loginButton}>
            {loading ? "Loading..." : "Login"}
          </button>

          <div className={styles.divider}>or</div>
          {error && (
            <p
              className="error-message"
              style={{ color: "red", textAlign: "center" }}
            >
              {error}
            </p>
          )}

          <GoogleLoginButton />
          <p style={{ textAlign: "center" }}>
            Do not have an account?{" "}
            <span
              style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => router.push("/Signup")}
            >
              Create
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
