import { useEffect, useRef } from "react";
import { useScrollStore } from "../../store/useScrollStore";

export default function ScrollManager() {
  const setScroll = useScrollStore((s) => s.setScroll);

  // Referenciák a stabil méretek tárolására
  const viewportHeight = useRef(0);
  const pageHeight = useRef(0);
  const lastWidth = useRef(0);

  useEffect(() => {
    viewportHeight.current = document.documentElement.clientHeight || window.innerHeight;
    pageHeight.current = document.body.scrollHeight;
    lastWidth.current = window.innerWidth;

    const handleResize = () => {
      if (window.innerWidth !== lastWidth.current) {
        viewportHeight.current = document.documentElement.clientHeight || window.innerHeight;
        setTimeout(() => {
          pageHeight.current = document.body.scrollHeight;
        }, 100);
        lastWidth.current = window.innerWidth;
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height = pageHeight.current - viewportHeight.current;

      if (height > 0) {
        const offset = scrollTop / height;
        const clampedOffset = Math.min(Math.max(offset, 0), 1);
        setScroll(clampedOffset);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    setTimeout(() => {
      pageHeight.current = document.body.scrollHeight;
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setScroll]);

  return null;
}
