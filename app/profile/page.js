"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "../Styles/profile.module.css";
import ProfileLoading from "../Skeletons/ProfileLoading";
import fallbackProfile from "../assets/Tabs/profile.png";
import Image from "next/image";
import BottomModal from "../components/BottomModal";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT

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
        <Image
          src={user.profilePicture || fallbackProfile}
          alt="Profile"
          className={styles.profilePic}
          width={80}
          height={80}
        />

        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.role}>Role: {user.role}</p>

        <button
          className={styles.logoutBtn}
          onClick={() => setIsModalOpen(true)}
        >
          Logout
        </button>
      </div>

      {/* The Modal */}
      <BottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Are you sure you want to logout?
        </h2>

        <div className={styles.modalActions}>
          <button onClick={handleLogout} className={styles.confirmBtn}>
            Yes, Logout
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </BottomModal>
    </div>
  );
}
