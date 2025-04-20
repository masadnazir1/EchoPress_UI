"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Styles/Usersaved.module.css";
import searchicon from "../assets/UniversalIcons/Search.png";
import SavedArticleService from "../services/SavedArticleService";
import { API } from "@/API_URL";
import Image from "next/image";
import saveIcon from "../assets/UniversalIcons/save.png";
import loading from "../assets/UniversalIcons/loading.png";
import defaultsarticle from "../assets/Defaults/defaultsarticle.webp";
import ArticleCardSkeleton from "../Skeletons/ArticleCardSkeleton";

export default function Usersaved() {
  //init the hooks
  const router = useRouter();
  //
  const [articles, setArticles] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [page, setPage] = useState(1); // Track the current page for pagination

  useEffect(() => {
    //
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      if (id) setUserId(id);
    }
    //
    if (!userId) {
      console.error("User id required to load the articles");
      return;
    }

    const fetchArticles = async () => {
      setisLoading(true);
      try {
        const response = await SavedArticleService.getSavedArticles(
          userId,
          page
        );
        const updatedArticles = (response.articles || []).map((article) => ({
          ...article,
          cover_image_url: article.cover_image_url
            ? `${API}${article.cover_image_url}`
            : defaultsarticle, // fallback image
        }));

        setArticles((prevArticles) => [...prevArticles, ...updatedArticles]); // Append new articles
        setisLoading(false);
      } catch (err) {
        console.error(err);
        setisLoading(false);
      }
    };

    fetchArticles();
  }, [userId, page]);

  // Function to delete the article
  const Delete = async (ArticleId) => {
    setisDeleting(true);

    if (!userId) {
      console.error("User id required to load the articles");
      setisDeleting(false);
      return;
    }

    try {
      const response = await SavedArticleService.deleteSavedArticle(
        userId,
        ArticleId
      );
      setisDeleting(false);

      // Remove the deleted article from the state
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== ArticleId)
      );
    } catch (err) {
      console.error("Error deletion", err);
      setisDeleting(false);
    } finally {
      setisDeleting(false);
    }
  };

  // Scroll event handler to load more articles when the user scrolls to the bottom
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !isLoading) {
      setPage((prevPage) => prevPage + 1); // Load next page when scrolled to the bottom
    }
  };

  //method to push to the details page
  const handleClick = (articleId) => {
    router.push(`/ArticleDetails/${articleId}`);
  };

  return isLoading ? (
    <div
      style={{
        padding: "10px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </div>
  ) : (
    <div className={styles.main} onScroll={handleScroll}>
      <div className={styles.content}>
        <h2 className={styles.Heading}>Saved Articles</h2>

        <div className={styles.inputWraper}>
          <Image
            src={searchicon}
            alt="search"
            width={30}
            height={30}
            className={styles.ImageIcon}
          />
          <input
            type="text"
            placeholder="Search articles.."
            className={styles.input}
          />
        </div>

        <div className={styles.cardContainer}>
          {articles.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No saved articles yet.
            </p>
          ) : (
            articles.map((article) => (
              <div
                className={styles.card}
                key={article.id}
                onClick={() => handleClick(article.id)}
              >
                <Image
                  src={article.cover_image_url}
                  alt={article.title}
                  width={80}
                  height={80}
                  className={styles.thumbnail}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{article.title}</h3>
                  <p className={styles.source}>Tech Weekly</p>
                  <p className={styles.readTime}>8 min read</p>
                </div>
                <button
                  className={styles.saveIcon}
                  onClick={() => Delete(article.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Image src={loading} alt="remove" width={30} height={30} />
                  ) : (
                    <Image src={saveIcon} alt="remove" width={30} height={30} />
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
