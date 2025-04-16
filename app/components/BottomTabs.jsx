"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../Styles/BottomTabs.module.css";
import Image from "next/image";
import home from "../assets/Tabs/Home.png";
import Explore from "../assets/Tabs/explore.png";
import Saved from "../assets/Tabs/saved.png";
import Profile from "../assets/Tabs/profile.png";

export default function BottomTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", icon: home, href: "/home" },
    { name: "Explore", icon: Explore, href: "/explore" },
    { name: "Saved", icon: Saved, href: "/saved" },
    { name: "Profile", icon: Profile, href: "/profile" },
  ];

  return (
    <nav className={styles.tabBar}>
      {tabs.map((tab) => (
        <Link key={tab.name} href={tab.href} className={styles.tabLink}>
          <div
            className={
              pathname === tab.href
                ? `${styles.tabItem} ${styles.active}`
                : styles.tabItem
            }
          >
            <Image
              src={tab.icon}
              alt={tab.name}
              width={24}
              height={24}
              className={styles.icon}
            />
            <span className={styles.label}>{tab.name}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
