import React from "react";
import styles from "./css/ArticleDetails.module.css"; // Make sure to import the corresponding CSS file

function ArticleDetails() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonSummary}></div>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}></div>
    </div>
  );
}

export default ArticleDetails;
