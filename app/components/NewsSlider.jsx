"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../Styles/NewsSlider.module.css";
import Image from "next/image";
import SliderService from "../services/SliderService";

const BASE_URL = "http://localhost:5000"; // Change if your backend runs elsewhere

export default function NewsSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 5000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Fetch slides on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const response = await SliderService.GetSlides();
      if (response) {
        setSlides(response);
      } else {
        console.error("Failed to fetch slides");
      }
    };

    fetchSlides();
  }, []);

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, delay);

    return () => resetTimeout();
  }, [current, slides]);

  if (slides.length === 0) return <p>Loading slides...</p>;

  return (
    <div className={styles.slider}>
      <div
        className={styles.sliderTrack}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            <Image
              src={`${BASE_URL}${slide.image_url}`}
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
