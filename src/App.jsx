import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "./Fejhallgatoo";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const bgColor = "#fff7ee";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f0f0f0",
        position: "relative",
      }}
    >
      {/* --- CSS STÍLUS A PÖRGÉSHEZ (Keyframes) --- */}
      <style>
        {`
          .loader {
            width: calc(100px - 24px);
            height: 50px;
            position: relative;
            animation: flippx 2s infinite linear;
          }
          .loader:before {
            content: "";
            position: absolute;
            inset: 0;
            margin: auto;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #FFF;
            transform-origin: -24px 50%;
            animation: spin 1s infinite linear;
          }
          .loader:after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50% , -50%);
            background: #fff;
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }

          @keyframes flippx {
            0%, 49% {
              transform: scaleX(1);
            }
            50%, 100% {
              transform: scaleX(-1);
            }
          }
          @keyframes spin {
            100% {
              transform: rotate(360deg);
            }
          }
                
        `}
      </style>

      {/* --- Loader --- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#faead8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          transition: "opacity 1s ease-in-out",
          opacity: isReady ? 0 : 1,
          pointerEvents: isReady ? "none" : "all", // Eltűnés utáni kattintások engedélyezése
        }}
      >
        <span class="loader"></span>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [1, 2, 2], fov: 45 }}>
        <color attach="background" args={[bgColor]} />

        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera={false}>
            <Model onLoaded={() => setIsReady(true)} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
