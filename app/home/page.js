"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/Homepage.module.css";
import NewsSlider from "../components/NewsSlider";
import ArticleCard from "../components/ArticleCard";
import DesktopHeader from "../components/DesktopHeader";

export default function Home() {
  const [ismobile, setismobile] = useState(false);
  console.log(ismobile);

  useEffect(() => {
    if (window.innerWidth > 786) {
      setismobile(false);
    } else {
      setismobile(true);
    }
  }, [ismobile]);

  return (
    <div className={styles.page}>
      <DesktopHeader />
      <main className={ismobile ? styles.main : styles.Mobilepage}>
        <NewsSlider />

        <div style={{ width: "100%", marginTop: "10px" }}>
          <ArticleCard />
        </div>
      </main>
    </div>
  );
}
