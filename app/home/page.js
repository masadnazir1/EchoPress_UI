import styles from "../Styles/Homepage.module.css";
import NewsSlider from "../components/NewsSlider";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NewsSlider />

        <div style={{ width: "100%", marginTop: "10px" }}>
          <ArticleCard />
        </div>
      </main>
    </div>
  );
}
