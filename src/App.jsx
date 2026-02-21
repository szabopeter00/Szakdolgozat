import { useState, useEffect } from "react";

import Loader from "./components/layout/Loader";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import ComfortSection from "./components/sections/ComfortSection";
import CanvasScene from "./components/canvas/CanvasScene";

export default function App() {
  const [isReady, setIsReady] = useState(false);

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

      <CanvasScene onReady={() => setIsReady(true)} />
    </>
  );
}
