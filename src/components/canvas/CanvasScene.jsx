import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "./Fejhallgatoo";
import ScrollManager from "./ScrollManager";
import { Environment, ContactShadows } from "@react-three/drei";

export default function CanvasScene({ onReady }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [1, 2.5, 2], fov: 45 }}
      className="canvas-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
    >
      <ScrollManager />
      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.7} adjustCamera={false} />
        <Model onLoaded={onReady} />
        <ContactShadows position={[0, -0.4, 0]} opacity={1} scale={10} blur={1} far={4} color="#000000" />
      </Suspense>
    </Canvas>
  );
}
