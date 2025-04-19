"use client";

import { useState } from "react";
import styles from "./Signup.module.css"; // Adjust the path to your CSS module
import authService from "@/app/services/authService";
import { useRouter } from "next/navigation";
import BackPNG from "../assets/UniversalIcons/Back.png";
import Image from "next/image";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const data = await authService.registerUser(name, email, password);
      // Handle successful registration (e.g., show success message or redirect)

      // Redirect after successful registration (using next/router or window.location)
      // Router.push('/login');
    } catch (err) {
      setError(err.message); // Show the error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <button className={styles.Back} onClick={() => router.back()}>
        <Image src={BackPNG} width={30} height={30} alt="Back" />
      </button>
      <div className={styles.registerBox}>
        <h1 className={styles.title}>Register</h1>
        <p className={styles.subtitle}>Create your account</p>
        <form className={styles.form} onSubmit={handleRegister}>
          <div>
            <label>Name</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className={styles.divider}>or</div>

        <div style={{ width: "100%" }}>
          <GoogleLoginButton />
        </div>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Have an account?{" "}
          <span
            style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => router.push("/Login")}
          >
            Create
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
