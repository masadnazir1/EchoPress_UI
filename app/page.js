"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Logo from "./assets/Logo.svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    if (localStorage.getItem("JWT")) {
      router.push("/home");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <main className={styles.mainContent}>
        <Image src={Logo} alt="ReadIn Logo" width={150} height={40} priority />
        <h1 className={styles.title}>Welcome to ReadIn</h1>
        <p className={styles.subtitle}>
          Empowering journalists, news creators, and storytellers to publish,
          grow, and monetize their content.
        </p>
        <div className={styles.buttonGroup}>
          <a href="/Login" className={styles.btnPrimary}>
            Log In
          </a>
          <a href="/Signup" className={styles.btnSecondary}>
            Sign Up
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {year} ReadIn. All rights reserved.</p>
      </footer>
    </div>
  );
}
