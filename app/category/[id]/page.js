"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import SavedArticleService from "@/app/services/SavedArticleService";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import articleService from "@/app/services/articleService";
import defaultimg from "../../assets/Defaults/defaultsarticle.webp";
import ArticleCardSkeleton from "@/app/Skeletons/ArticleCardSkeleton";
import dots from "../../assets/UniversalIcons/dots.png";
import save from "../../assets/UniversalIcons/save.png";
import BottomModal from "@/app/components/BottomModal";
import { API } from "@/API_URL";
import Image from "next/image";
import styles from "../../Styles/CategoryArticles.module.css";
import Back from "../../assets/UniversalIcons/Back.png";

export default function CategoryArticles() {
  const router = useRouter();
  const { id: categoryId } = useParams(); // ⬅️ get from URL like /category/[id]
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null); // 🆕 track selected
  //

  const observer = useRef();

  const lastArticleRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchArticles = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        const res = await articleService.getAllArticlesById(
          page,
          10,
          categoryId
        );
        if (res.articles.length === 0) {
          setHasMore(false);
        } else {
          setArticles((prev) => [...prev, ...res.articles]);
        }
      } catch (err) {
        console.error("Failed to load more articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, categoryId]);

  //
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

  const renderArticleCard = (article, ref = null) => {
    const timeAgo = Math.floor(
      (new Date() - new Date(article.published_at)) / (1000 * 60 * 60)
    );
    return (
      <div className={styles.articleCard} key={article.id} ref={ref}>
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
        <div
          className={styles.articleContent}
          onClick={() => handleClick(article.id)}
        >
          <div className={styles.title}>{article.title}</div>
          <div className={styles.meta}>
            Author {article.author_id} &nbsp;&nbsp; {timeAgo} hours ago
          </div>
        </div>
        <div className={styles.imageWrapper}>
          {article.cover_image_url ? (
            <Image
              src={`${API}${article.cover_image_url}`}
              alt="cover"
              width={64}
              height={64}
            />
          ) : (
            <Image src={defaultimg} alt="no image" width={64} height={64} />
          )}
        </div>
      </div>
    );
  };

  //method to push to the details page
  const handleClick = (articleId) => {
    router.push(`/ArticleDetails/${articleId}`);
  };

  return (
    <div className={styles.articlesContainer}>
      <div className={styles.Head}>
        <Image
          src={Back}
          width={30}
          height={30}
          onClick={() => router.back()}
          style={{ cursor: "pointer" }}
          alt="Back"
        />
      </div>
      {articles.map((article, index) =>
        index === articles.length - 1
          ? renderArticleCard(article, lastArticleRef)
          : renderArticleCard(article)
      )}
      {loading && <ArticleCardSkeleton />}
      {!hasMore && <p className={styles.end}>You have reached the end.</p>}

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
}
