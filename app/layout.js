import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomTabsWrapper from "./components/BottomTabsWrapper";
import GoogleProviderWrapper from "./components/GoogleProviderWrapper";
import MobileOnlyWrapper from "./MobileOnlyWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ReadIn",
  description: "Every article is a conversation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <MobileOnlyWrapper>
          <GoogleProviderWrapper>
            {children}
            <BottomTabsWrapper />
          </GoogleProviderWrapper>
        </MobileOnlyWrapper>
      </body>
    </html>
  );
}
