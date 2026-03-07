import { useState, useEffect } from "react";

import Loader from "./components/layout/Loader";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import ComfortSection from "./components/sections/ComfortSection";
import SoundSection from "./components/sections/SoundSection";
import CanvasScene from "./components/canvas/CanvasScene";
import DurabilitySection from "./components/sections/DurabilitySection";
import AppearanceSection from "./components/sections/AppearanceSection";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  // Mobilnézet magasságának beállítása
  useEffect(() => {
    let lastWidth = window.innerWidth;

    const setHeight = () => {
      if (window.innerWidth !== lastWidth || !document.documentElement.style.getPropertyValue("--app-height")) {
        lastWidth = window.innerWidth;
        document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
      }
    };

    setHeight();

    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  // Scroll tiltása amíg tölt
  useEffect(() => {
    if (!isReady) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isReady]);

  return (
    <>
      <Loader isReady={isReady} />

      <Navbar />

      <HeroSection />

      <ComfortSection />

      <SoundSection />

      <DurabilitySection />

      <AppearanceSection />

      <CanvasScene onReady={() => setIsReady(true)} />
    </>
  );
}
