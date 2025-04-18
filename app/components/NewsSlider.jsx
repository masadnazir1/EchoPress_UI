"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../Styles/NewsSlider.module.css";
import Image from "next/image";
import SliderService from "../services/SliderService";
import ImageSliderSkeleton from "../Skeletons/ImageSliderSkeleton";

const BASE_URL = "https://apiblog.galaxydev.pk";

export default function NewsSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef(null);
  const delay = 5000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await SliderService.GetSlides();
        if (response && Array.isArray(response)) {
          const updatedSlides = response.map((slide) => ({
            ...slide,
            image_url: slide.image_url
              ? `${BASE_URL}${slide.image_url}`
              : slide.image_url,
          }));
          setSlides(updatedSlides);
        } else {
          console.error("No slides found.");
        }
      } catch (err) {
        console.error("Failed to fetch slides", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, delay);

    return () => resetTimeout();
  }, [current, slides]);

  // Show skeleton while loading
  if (isLoading) return <ImageSliderSkeleton count={1} />;

  return (
    <div className={styles.slider}>
      <div className={styles.sliderHeader}>
        <h4 className={styles.Breakingh4}>Breaking News</h4>
        <button>See All</button>
        <div className={styles.sliderHeaderLine}></div>
      </div>

      <div
        className={styles.sliderTrack}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            <Image
              src={slide.image_url}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <span className={styles.category}>{slide.category}</span>
              <div className={styles.meta}>
                <span className={styles.author}>
                  {slide.author} <span className={styles.verified}>✔</span>
                </span>
                <span className={styles.time}>
                  {new Date(slide.published_at).toLocaleTimeString()}
                </span>
              </div>
              <h2 className={styles.title}>{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.dot} ${current === idx ? styles.active : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
