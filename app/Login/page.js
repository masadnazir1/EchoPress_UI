"use client";
import { useState } from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import GoogleLogo from "../assets/GLogo.webp";
import authService from "@/app/services/authService";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      //  setError(data.message)
      // Redirect example:
      // Router.push('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  //
  return (
    <div className={styles.loginWrapper}>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
