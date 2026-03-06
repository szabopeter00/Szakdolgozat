import { useState, useEffect } from "react";

import Loader from "./components/layout/Loader";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import ComfortSection from "./components/sections/ComfortSection";
import SoundSection from "./components/sections/SoundSection";
import CanvasScene from "./components/canvas/CanvasScene";
import DurabilitySection from "./components/sections/DurabilitySection";

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

      <SoundSection />

      <DurabilitySection />

      <CanvasScene onReady={() => setIsReady(true)} />
    </>
  );
}
