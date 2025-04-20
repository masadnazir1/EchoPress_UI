// components/CategoriesLoading.js

import styles from "./css/CategoriesLoading.module.css";

export default function CategoriesLoading() {
  const skeletonItems = Array(6).fill(0); // Adjust count based on layout

  return (
    <div className={styles.categoriesGrid}>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={`${styles.categoryCard} ${styles.skeletonCard}`}
        >
          <div className={styles.skeletonIcon}></div>
          <div className={styles.skeletonText}></div>
        </div>
      ))}
    </div>
  );
}
