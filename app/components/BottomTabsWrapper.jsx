"use client";

import { usePathname } from "next/navigation";
import BottomTabs from "./BottomTabs";

export default function BottomTabsWrapper() {
  const pathname = usePathname();

  // List of routes where BottomTabs should be hidden
  const excludedRoutes = ["/Login", "/Signup", "/settings", "/"];

  // Check for exact match or dynamic route pattern (e.g. /ArticleDetails/123)
  const isExcluded = excludedRoutes.some(
    (route) => pathname === route || pathname.startsWith("/ArticleDetails/")
  );

  return !isExcluded ? <BottomTabs /> : null;
}
