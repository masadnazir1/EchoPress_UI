"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from "../Styles/ArticleCard.module.css";
import articleService from "../services/articleService";
import ArticleCardSkeleton from "../Skeletons/ArticleCardSkeleton";
import defaultsarticle from "../assets/Defaults/defaultsarticle.webp";
import SavedArticleService from "../services/SavedArticleService";
import dots from "../assets/UniversalIcons/dots.png";
//save
import save from "../assets/UniversalIcons/save.png";
import Image from "next/image";
import { API } from "@/API_URL";
import BottomModal from "./BottomModal";

const ArticleCard = () => {
  //init the hooks
  const router = useRouter();
  //
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null); // 🆕 track selected

  //method to push to the details page
  const handleClick = (articleId) => {
    router.push(`/ArticleDetails/${articleId}`);
  };

  //method to handle the save post
  const handleSave = async () => {
    if (!selectedArticleId) return;

    const UserId = localStorage.getItem("id");
    try {
      // call your save service
      await SavedArticleService.saveArticle(UserId, selectedArticleId);

      toast.success("Article saved successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.info("This is already saved to your feed");
      //
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
  };

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
            <div key={article.id} className={styles.card}>
              <div
                className={styles.content}
                onClick={() => handleClick(article.id)}
              >
                <h2 className={styles.title}>{article.title}</h2>
                <div className={styles.meta}>
                  <span className={styles.author}>
                    Author {article.author_id}
                  </span>
                  <span>{hoursAgo} hours ago</span>
                </div>
              </div>
              <div className={styles.cover}>
                <div className={styles.ModelOptionsButtonBox}>
                  <button
                    className={styles.ModelOptionsButton}
                    onClick={() => {
                      setSelectedArticleId(article.id); // 🆕 set selected article
                      setIsModalOpen(true);
                    }}
                  >
                    <Image src={dots} alt="..." width={20} height={20} />
                  </button>
                </div>
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

      {/* The Modal */}
      <BottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Post options
        </h2>

        <button className={styles.ModelButton} onClick={handleSave}>
          <Image src={save} width={30} height={30} alt="save" />
          <div className={styles.rightButton}>
            <span>Save article</span>
            <span>Save this article to your saved feed</span>
          </div>
        </button>
      </BottomModal>
      <ToastContainer
        style={{ zIndex: "1000000" }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ArticleCard;
