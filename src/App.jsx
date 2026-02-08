import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "./Fejhallgatoo";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const bigText = "HEADPHONE 2.0";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(circle,rgba(255, 247, 238, 1) 50%, rgba(255, 231, 196, 1) 100%)",
        position: "relative",
        overflow: "hidden", // Fontos, hogy a nagy szöveg ne nyújtsa meg az oldalt
      }}
    >
      <style>
        {`
          /* Védőburok */
          .loader-wrapper {
             transform: translate3d(0, 0, 0);
             will-change: transform;
             overflow: visible;
             display: flex;
             alignItems: center;
             justifyContent: center;
          }

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
            0%, 49% { transform: scaleX(1); }
            50%, 100% { transform: scaleX(-1); }
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* --- Loader Konténer --- */}
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
          pointerEvents: isReady ? "none" : "all",
        }}
      >
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      </div>

      {/* --- HÁTTÉR SZÖVEG --- */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          textAlign: "center",

          fontSize: "10vw",
          fontWeight: "900",
          fontFamily: "sans-serif",

          color: "rgba(214, 159, 103, 0.15)",

          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: "1",
        }}
      >
        {bigText}
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [1, 2, 2], fov: 45 }}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera={false}>
            <Model onLoaded={() => setIsReady(true)} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
}
