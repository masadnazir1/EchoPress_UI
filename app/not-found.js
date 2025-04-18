"use client";
import styles from "./Styles/not-found.module.css";
import Link from "next/link";
import Image from "next/image";
import notfountImgg from "./assets/404.png";
//
//

//

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={notfountImgg}
          alt="404 Illustration"
          width={300}
          height={300}
          className={styles.image}
        />
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.subtitle}>
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className={styles.button}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
