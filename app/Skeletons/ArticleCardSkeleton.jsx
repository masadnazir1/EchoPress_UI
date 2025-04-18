import React from "react";
import styles from "../Styles/ArticleCardSkeleton.module.css";

const ArticleCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.titleSkeleton} />
        <div className={styles.metaSkeleton}>
          <div className={styles.metaItem} />
          <div className={styles.metaItem} />
        </div>
      </div>
      <div className={styles.cover}>
        <div className={styles.imageSkeleton} />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
