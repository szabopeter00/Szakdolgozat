import "../../styles/loader.css";

export default function Loader({ isReady }) {
  return (
    <div
      className="loader-overlay"
      style={{
        opacity: isReady ? 0 : 1,
        pointerEvents: isReady ? "none" : "all",
      }}
    >
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    </div>
  );
}
