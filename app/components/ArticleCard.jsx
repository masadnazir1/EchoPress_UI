"use client";

import { useState, useEffect } from "react";
import styles from "../Styles/ArticleCard.module.css";
import articleService from "../services/articleService";
import ArticleCardSkeleton from "../Skeletons/ArticleCardSkeleton";
import defaultsarticle from "../assets/Defaults/defaultsarticle.webp";
import Image from "next/image";
import { API } from "@/API_URL";

const ArticleCard = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getAllArticles();
        const updatedArticles = (response.articles || []).map((article) => ({
          ...article,
          cover_image_url: article.cover_image_url
            ? `${API}${article.cover_image_url}`
            : article.cover_image_url,
        }));

        setArticles(updatedArticles);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        console.error(err);
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.wrapper}>
      {articles.length > 0 ? (
        articles.map((article) => {
          const publishedDate = new Date(article.published_at);
          const now = new Date();
          const hoursAgo = Math.floor((now - publishedDate) / (1000 * 60 * 60));

          return (
            <div
              key={article.id}
              className={styles.card}
              onClick={() => console.log(article.id)}
            >
              <div className={styles.content}>
                <h2 className={styles.title}>{article.title}</h2>
                <div className={styles.meta}>
                  <span className={styles.author}>
                    Author {article.author_id}
                  </span>
                  <span>{hoursAgo} hours ago</span>
                </div>
              </div>
              <div className={styles.cover}>
                <Image
                  //  src={defaultsarticle}
                  width={120}
                  height={80}
                  src={
                    article.cover_image_url
                      ? article.cover_image_url
                      : defaultsarticle
                  }
                  alt={article.title}
                  className={styles.image}
                />
              </div>
            </div>
          );
        })
      ) : (
        <ArticleCardSkeleton />
      )}
    </div>
  );
};

export default ArticleCard;
