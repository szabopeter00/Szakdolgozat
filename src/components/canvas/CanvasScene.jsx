import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stage } from "@react-three/drei";
import { Model } from "./Fejhallgatoo";

export default function CanvasScene({ onReady }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [1, 2, 2], fov: 45 }} className="canvas-container">
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} adjustCamera={false}>
          <Model onLoaded={onReady} />
        </Stage>
      </Suspense>
    </Canvas>
  );
}
