import styles from "../Styles/Homepage.module.css";
import NewsSlider from "../components/NewsSlider";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NewsSlider />
      </main>
    </div>
  );
}
