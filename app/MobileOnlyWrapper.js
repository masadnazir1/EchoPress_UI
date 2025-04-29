"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "./assets/logo.png";

export default function MobileOnlyWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#fff",
          color: "#eaeaea",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <Image
          src={logo}
          alt="EchoPress Logo"
          width={100}
          height={64}
          style={{ marginBottom: "1.5rem" }}
        />

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#000",
          }}
        >
          EchoPress is built for mobile
        </h1>
        <p
          style={{
            maxWidth: "420px",
            textAlign: "center",
            opacity: 0.8,
            fontSize: "1rem",
            color: "#13222f",
          }}
        >
          Please open this app on a mobile device to experience the best reading
          and interaction environment.
        </p>
      </div>
    );
  }

  return children;
}
