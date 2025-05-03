"use client";

import { useState, useEffect } from "react";
import styles from "../Styles/DesktopHeader.module.css";
import { useRouter } from "next/navigation";
import SearchIcon from "../assets/UniversalIcons/Search.png";
import profileoutline from "../assets/UniversalIcons/profileoutline.png";
import placeholderIcon from "../assets/UniversalIcons/profileoutline.png";
import Logout from "../assets/UniversalIcons/Logout.png";
import Logo from "../assets/Logo.svg";
import Image from "next/image";
import useIsMobile from "../Hooks/useIsMobile"; // Import your custom hook

export default function DesktopHeader() {
  const Router = useRouter();
  const isMobile = useIsMobile(); // Determine device type
  const [profilePic, setProfilePic] = useState("");

  const [isModel, setModel] = useState(false);

  function handleModel() {
    setModel((prev) => !prev);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pic = localStorage.getItem("pic");
      if (pic) setProfilePic(pic);
    }
  }, []);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className={styles.DesktopHeaderContainer}>
      <div className={styles.logoBox}>
        <Image
          src={Logo}
          width={10}
          height={50}
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.SearchBox}>
        <div className={styles.Wraper}>
          <Image src={SearchIcon} width={30} height={30} alt="Search Icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className={styles.ActionsBox}>
        <button className={styles.ProfileButton} onClick={handleModel}>
          <Image
            src={profilePic || placeholderIcon}
            width={40}
            height={40}
            alt="Profile"
            className={styles.Profile}
          />
        </button>

        {isModel && (
          <div className={styles.Model}>
            <button className={styles.ProfileBTN} onClick={handleModel}>
              <Image src={profileoutline} width={30} height={30} alt="Icon" />
              <span>Profile</span>
            </button>
            <button className={styles.ProfileBTN} onClick={handleModel}>
              <Image src={Logout} width={30} height={30} alt="Icon" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
