import React from "react";
import styles from "./css/ImageSliderSkeleton.module.css";

const ImageSliderSkeleton = ({ count = 4 }) => {
  return (
    <div className={styles.sliderWrapper}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.slideSkeleton} />
      ))}
    </div>
  );
};

export default ImageSliderSkeleton;
