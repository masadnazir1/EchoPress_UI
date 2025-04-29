"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Styles/Explore.module.css";
import searchicon from "../assets/UniversalIcons/Search.png";
import CategoryService from "../services/CategoryService";
import Image from "next/image";
import CategoriesLoading from "../Skeletons/CategoriesLoading";

export default function Explore() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.main}>
      {isLoading ? (
        <CategoriesLoading />
      ) : (
        <div className={styles.content}>
          <h2 className={styles.Heading}>Popular Categories</h2>

          <div
            className={styles.inputWraper}
            onClick={() => router.push("/searchpage")}
          >
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

          {/* Category Grid */}
          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={styles.categoryCard}
                onClick={() => router.push(`/category/${cat.id}`)}
              >
                <Image
                  src={cat.categories_icon}
                  alt={cat.name}
                  width={40}
                  height={40}
                />
                <p className={styles.categoryName}>{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
