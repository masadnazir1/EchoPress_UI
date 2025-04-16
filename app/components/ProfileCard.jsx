// components/ProfileCard.jsx
import styles from "../Styles/profile.module.css";

export default function ProfileCard({ user }) {
  return (
    <div className={styles.card}>
      <img
        src={user.profilePicture || "/default-avatar.png"}
        alt="Profile"
        className={styles.avatar}
      />
      <h2 className={styles.name}>{user.name}</h2>
      <p className={styles.email}>{user.email}</p>
      <p className={styles.info}>📍 {user.location || "Unknown"}</p>
      <p className={styles.info}>🗓️ Joined {user.joined || "N/A"}</p>
    </div>
  );
}
