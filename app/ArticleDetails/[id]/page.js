"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import articleService from "@/app/services/articleService";
import styles from "../../Styles/ArticleDetails.module.css";
import Image from "next/image";
import BackIcon from "../../assets/UniversalIcons/Back.png";
import { API } from "@/API_URL";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArticleDetailsSekelton from "../../Skeletons/ArticleDetailsSekelton";

export default function ArticleDetails({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling Down
        setShowHeader(false);
      } else {
        // Scrolling Up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!id) {
      setError("Invalid article ID.");
      return;
    }

    const fetchArticle = async () => {
      try {
        const res = await articleService.getArticleById(id);

        if (res) {
          const articleWithFullImage = {
            ...res,
            cover_image_url: res.cover_image_url
              ? `${API}${res.cover_image_url}`
              : null,
          };
          setArticle(articleWithFullImage);
        } else {
          setError("Article not found.");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article.");
      }
    };

    fetchArticle();
  }, [id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!article) return <ArticleDetailsSekelton />;

  return (
    <main className={styles.Main}>
      <div
        //className={styles.Head}

        className={`${styles.Head} ${showHeader ? styles.show : styles.hide}`}
      >
        <button className={styles.backbtn} onClick={() => router.back()}>
          <Image src={BackIcon} width={30} height={30} alt="back" />
        </button>
      </div>

      <div className={styles.content}>
        <h1>{article.title}</h1>
        <p className={styles.summary}>{article.summary}</p>

        {article.cover_image_url && (
          <Image
            src={article.cover_image_url}
            alt="Article Cover"
            width={800}
            height={400}
            className={styles.coverImage}
          />
        )}

        {/* Wrap ReactMarkdown inside a div to handle className */}
        <div className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.markdown_content}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
