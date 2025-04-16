// pages/profile.jsx
import ProfileCard from "../components/ProfileCard";
import styles from "../Styles/profile.module.css";

export default function ProfilePage() {
  const user = {
    profilePicture:
      "https://scontent.fisb1-2.fna.fbcdn.net/v/t39.30808-1/487908796_1379279399768759_7702348589325259186_n.jpg?stp=c0.0.1278.1278a_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeF12iZNDn6Fc4RLoFJkno89mPWCVFuI3lmY9YJUW4jeWXfd228w2Hy2qR-L65aAJklVnI7tP0Vi7i5h7W-ukN1E&_nc_ohc=2mO1p6uId5wQ7kNvwHPf1nk&_nc_oc=Adn7U2t9-mtiJaC9h09lq6-ne_LFi4PIFqfQYIj_leNGeYIph52ipDyrdvzrlxOtPn8&_nc_zt=24&_nc_ht=scontent.fisb1-2.fna&_nc_gid=YbWJ1ggLhrW8kqolsIRQjQ&oh=00_AfHeR8ZeB8KrvBHgCXNG0u1rI4EBOIsUyLwFrd4Ax-7aHw&oe=68053880",
    name: "John Doe",
    email: "john.doe@example.com",
    location: "Lahore, Pakistan",
    joined: "March 2024",
  };

  return (
    <div className={styles.container}>
      <ProfileCard user={user} />
    </div>
  );
}
