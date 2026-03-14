import "../../styles/loader.css";
import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

export default function Loader({ isReady }) {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    setDisplayProgress(Math.round(progress));
  }, [progress]);

  return (
    <div
      className="loader-overlay"
      style={{
        opacity: isReady ? 0 : 1,
        pointerEvents: isReady ? "none" : "all",
      }}
    >
      <div className="loader-wrapper">
        <div className="loader"></div>

        <div className="progress-text">
          {displayProgress < 100 ? (
            <span className="progress-number">{displayProgress}%</span>
          ) : (
            <span className="progress-processing">Feldolgozás...</span>
          )}
        </div>
      </div>
    </div>
  );
}
