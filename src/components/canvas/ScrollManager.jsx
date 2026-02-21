import { useEffect } from "react";
import { useScrollStore } from "../../store/useScrollStore";

export default function ScrollManager() {
  const setScroll = useScrollStore((s) => s.setScroll);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const offset = scrollTop / height;

      setScroll(offset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScroll]);

  return null;
}
