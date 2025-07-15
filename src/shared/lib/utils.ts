import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MediaQueryResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useMedia(): MediaQueryResult {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkMediaQuery = () => {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const isTablet = window.matchMedia(
        "(min-width: 641px) and (max-width: 1024px)"
      ).matches;
      const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

      setMediaQuery({ isMobile, isTablet, isDesktop });
    };

    checkMediaQuery();
    window.addEventListener("resize", checkMediaQuery);

    return () => {
      window.removeEventListener("resize", checkMediaQuery);
    };
  }, []);

  return mediaQuery;
}
