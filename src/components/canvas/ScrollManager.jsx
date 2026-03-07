import { useEffect, useRef } from "react";
import { useScrollStore } from "../../store/useScrollStore";

export default function ScrollManager() {
  const setScroll = useScrollStore((s) => s.setScroll);

  // Referenciák a stabil méretek tárolására
  const viewportHeight = useRef(0);
  const lastWidth = useRef(0);

  useEffect(() => {
    viewportHeight.current = document.documentElement.clientHeight || window.innerHeight;
    lastWidth.current = window.innerWidth;

    const handleResize = () => {
      if (window.innerWidth !== lastWidth.current) {
        viewportHeight.current = document.documentElement.clientHeight || window.innerHeight;
        lastWidth.current = window.innerWidth;
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - viewportHeight.current;

      if (height > 0) {
        const offset = scrollTop / height;
        setScroll(offset);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setScroll]);

  return null;
}
