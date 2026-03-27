import { useState, useEffect } from "react";
import "../../styles/navbar.css";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollTo = (index) => {
    const vh = (document.documentElement.clientHeight || window.innerHeight) / 100;

    // --- Asztali ---
    const desktopTargets = [
      0, // 0: Kezdőlap
      210, // 1: Kényelem
      520, // 2: Hangzás
      850, // 3: Tartósság
      1050, // 4: Kinézet
    ];

    // --- Telefon ---
    const mobileTargets = [
      0, // 0: Kezdőlap
      170, // 1: Kényelem
      410, // 2: Hangzás
      660, // 3: Tartósság
      880, // 4: Kinézet
    ];

    const targets = isMobile ? mobileTargets : desktopTargets;

    let targetScrollPosition = targets[index] * vh;

    if (index === 4) {
      targetScrollPosition = document.body.scrollHeight;
    }

    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <span className="nav-item" onClick={() => scrollTo(0)}>
        Kezdőlap
      </span>
      <span className="nav-item" onClick={() => scrollTo(1)}>
        Kényelem
      </span>
      <span className="nav-item" onClick={() => scrollTo(2)}>
        Hangzás
      </span>
      <span className="nav-item" onClick={() => scrollTo(3)}>
        Tartósság
      </span>
      <span className="nav-item" onClick={() => scrollTo(4)}>
        Kinézet
      </span>
    </nav>
  );
}
