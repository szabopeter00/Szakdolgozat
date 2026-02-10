import { useState } from "react";

import Loader from "./components/layout/Loader";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import CanvasScene from "./components/canvas/CanvasScene";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Loader isReady={isReady} />

      <Navbar />

      <HeroSection />

      <CanvasScene onReady={() => setIsReady(true)} />
    </>
  );
}
