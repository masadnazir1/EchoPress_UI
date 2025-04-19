"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Logo from "./assets/logo.png";

export default function Home() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src={Logo}
          alt="Your App Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className={styles.title}>Welcome to EchoPress</h1>
        <p className={styles.subtitle}>
          The platform that empowers news creators, journalists, and businesses
          to share their stories and build their audience.
        </p>
        <div className={styles.ctaContainer}>
          <a href="/Login" className={styles.button}>
            Log In
          </a>
          <a href="/Signup" className={styles.button}>
            Sign Up
          </a>
        </div>
      </main>

      {/* Get Started Button at the Bottom Right */}
      <div className={styles.getStartedBtn}>Get Started</div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {year} EchoPress. All rights reserved.</p>
      </footer>
    </div>
  );
}
