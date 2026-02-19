import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import PublicMainNavigation from "../navigation/PublicMainNavigation";
import PublicFooter from "@/components/public/Footer";

export default function PublicRootLayout() {
  // const [scrollProgress, setScrollProgress] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     const docHeight =
  //       document.documentElement.scrollHeight -
  //       document.documentElement.clientHeight;

  //     const progress = (scrollTop / docHeight) * 100;
  //     setScrollProgress(progress);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <>
      <PublicMainNavigation />

      <main className="relative max-w-250 flex justify-center mx-auto flex-col border-4 border-y border-gray-100 ">
        {/* <div
          className="absolute top-0 -left-1 w-1 bg-yellow-300 transition-all duration-150 z-50"
          style={{ height: `${scrollProgress}%` }}
        /> */}

        <Outlet />
        {/* <div
          className="absolute top-0 -right-1 w-1 bg-yellow-300 transition-all duration-150 z-50"
          style={{ height: `${scrollProgress}%` }}
        /> */}
      </main>

      <PublicFooter />
    </>
  );
}
