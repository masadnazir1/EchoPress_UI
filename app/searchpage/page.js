"use client";

import { useState } from "react";
import { API } from "@/API_URL";
import styles from "../Styles/Searchpage.module.css";
import SearchService from "../services/SearchService";
import Back from "../assets/UniversalIcons/Back.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Searchpage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await SearchService.SearchArticles(query, 1, 20, true);
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Search failed:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <button className={styles.BackBtn} onClick={() => router.back()}>
        <Image src={Back} width={30} height={30} alt="back" />
      </button>
      <h2 className={styles.heading}>Search Articles</h2>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      {isLoading && <p className={styles.status}>Searching...</p>}

      {!isLoading && hasSearched && articles.length === 0 && (
        <p className={styles.status}>No articles found.</p>
      )}

      {!isLoading &&
        articles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <div className={styles.articleContent}>
              <h3 className={styles.title}>{article.title}</h3>
              <div className={styles.meta}>
                <span>Author {article.author_id}</span>
                <span>
                  {Math.floor(
                    (Date.now() - new Date(article.updated_at)) /
                      (1000 * 60 * 60)
                  )}{" "}
                  hours ago
                </span>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img
                src={
                  article.cover_image_url
                    ? `${API}${article.cover_image_url}`
                    : "/placeholder.jpg"
                }
                alt={article.title}
                className={styles.thumbnail}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
