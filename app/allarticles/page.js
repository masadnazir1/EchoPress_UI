"use client";
import styles from "../Styles/Homepage.module.css";
import BackImg from "../assets/UniversalIcons/Back.png";
import ArticleCard from "../components/ArticleCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function allarticles() {
  const Router = useRouter();
  return (
    <div className={styles.page}>
      <div className={styles.HeaderArea}>
        <button className={styles.backBTN} onClick={() => Router.back()}>
          <Image src={BackImg} width={30} height={30} alt="Back" />
        </button>
      </div>
      <main className={styles.main}>
        <div style={{ width: "100%", marginTop: "50px" }}>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </main>
    </div>
  );
}
