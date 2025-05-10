import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomTabsWrapper from "./components/BottomTabsWrapper";
import GoogleProviderWrapper from "./components/GoogleProviderWrapper";
import Script from "next/script";
import DesktopHeader from "./components/DesktopHeader";

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

//

//do nothing
//
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "pjeis78i5w");
            `,
          }}
        />

        <GoogleProviderWrapper>
          {/* <DesktopHeader /> */}
          {children}
          <BottomTabsWrapper />
        </GoogleProviderWrapper>
      </body>
    </html>
  );
}
