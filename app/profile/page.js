"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "../Styles/profile.module.css";
import ProfileLoading from "../Skeletons/ProfileLoading";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT
        console.log(decoded);
        localStorage.setItem("pic", decoded.pic);
        setUser({
          profilePicture: decoded.pic,
          name: decoded.name || "Anonymous User",
          email: decoded.email,
          role: decoded.role,
        });
      } catch (err) {
        console.error("Invalid JWT:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    setShowModal(false);
    window.location.href = "/Login";
  };

  if (!user)
    return (
      <div className={styles.loading}>
        <ProfileLoading />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        {user && (
          <img
            src={user.profilePicture}
            alt="Profile"
            className={styles.profilePic}
          />
        )}

        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.role}>Role: {user.role}</p>

        <button className={styles.logoutBtn} onClick={() => setShowModal(true)}>
          Logout
        </button>
      </div>

      {/* Modal for Logout Confirmation */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Are you sure you want to logout?</h3>
            <div className={styles.modalActions}>
              <button onClick={handleLogout} className={styles.confirmBtn}>
                Yes, Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
