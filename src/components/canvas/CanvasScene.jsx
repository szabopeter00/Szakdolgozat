import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stage, ScrollControls } from "@react-three/drei";
import { Model } from "./Fejhallgatoo";
import ScrollManager from "./ScrollManager";
import { Environment, ContactShadows } from "@react-three/drei";

export default function CanvasScene({ onReady }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [1, 2.5, 2], fov: 45 }} className="canvas-container">
      <ScrollManager />
      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.7} adjustCamera={false} />
        <Model onLoaded={onReady} />
        <ContactShadows position={[0, -0.4, 0]} opacity={1} scale={10} blur={1} far={4} color="#000000" />
      </Suspense>
    </Canvas>
  );
}
