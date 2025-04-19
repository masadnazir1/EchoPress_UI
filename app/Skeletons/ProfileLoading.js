"use client";

import styles from "./css/profile.module.css";

export default function ProfileLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        {/* Skeleton for profile picture */}
        <div className={styles.profilePicSkeleton}></div>

        {/* Skeleton for name */}
        <div className={styles.nameSkeleton}></div>

        {/* Skeleton for email */}
        <div className={styles.emailSkeleton}></div>

        {/* Skeleton for role */}
        <div className={styles.roleSkeleton}></div>

        {/* Skeleton for logout button */}
        <div className={styles.logoutBtnSkeleton}></div>
      </div>
    </div>
  );
}
