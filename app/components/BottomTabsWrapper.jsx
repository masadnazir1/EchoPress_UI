"use client";

import { usePathname } from "next/navigation";
import BottomTabs from "./BottomTabs";

const excludedRoutes = ["/login", "/signup", "/settings", "/"];

export default function BottomTabsWrapper() {
  const pathname = usePathname();
  const shouldShow = !excludedRoutes.includes(pathname);

  return shouldShow ? <BottomTabs /> : null;
}
