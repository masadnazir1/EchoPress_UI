import styles from "../Styles/Homepage.module.css";
import NewsSlider from "../components/NewsSlider";
import ArticleCard from "../components/ArticleCard";

const data = {
  id: "1064714325552103425",
  title: "How AI Is Changing Journalism",
  slug: "how-ai-is-changing-journalism",
  author_id: "2",
  published_at: "2025-04-18T07:00:00.000Z",
  updated_at: "2025-04-18T11:57:06.107Z",
  is_published: true,
  tags: ["ai", "media", "news"],
  markdown_content:
    "# The Rise of AI in Media\n\nAI is transforming how news is created and delivered.",
  summary: "A brief overview of how AI is impacting journalism today.",
  cover_image_url: "/uploads/article/c3516d4e-9184-44be-900a-15cbf143c0df.jpg",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NewsSlider />
        <ArticleCard article={data} authorName="John Doe" />
      </main>
    </div>
  );
}
