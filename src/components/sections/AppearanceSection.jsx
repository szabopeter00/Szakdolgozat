import "../../styles/appearance.css";
import "../../index.css";
import { useColorStore } from "../../store/useColorStore";

export default function AppearanceSection({ onCanvasReady }) {
  const { setModelColor } = useColorStore();
  return (
    <section className="appearance">
      <div className="big-text">ALAKíTSD</div>
      <div className="buttons">
        <button
          onClick={() => setModelColor("#ffecd6")}
          style={{
            backgroundColor: "#ffecd6",
          }}
        />
        <button
          onClick={() => setModelColor("#f9c7fc")}
          style={{
            backgroundColor: "#f9c7fc",
          }}
        />
        <button
          onClick={() => setModelColor("#c9ac6e")}
          style={{
            backgroundColor: "#c9ac6e",
          }}
        />
        <button
          onClick={() => setModelColor("#969696")}
          style={{
            backgroundColor: "#969696",
          }}
        />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="rotate">
        <g id="arrow-rotate-vertical-axis-left-fill">
          <path
            id="Union"
            fill="#8b5f00"
            d="M9 11.2402c-1.13845 0.19 -2.14458 0.4832 -2.95801 0.8448 -0.73796 0.3279 -1.27308 0.6934 -1.61035 1.0478C4.09945 13.482 4 13.7731 4 14s0.09945 0.518 0.43164 0.8672c0.33727 0.3544 0.87239 0.7199 1.61035 1.0478 1.27664 0.5674 3.02807 0.9652 5.02051 1.0616L10.043 15.957c-0.39056 -0.3905 -0.39056 -1.0235 0 -1.414 0.3905 -0.3906 1.0235 -0.3906 1.414 0l2.75 2.75c0.1876 0.1875 0.293 0.4418 0.293 0.707s-0.1054 0.5195 -0.293 0.707l-2.75 2.75c-0.3905 0.3906 -1.0235 0.3906 -1.414 0 -0.39056 -0.3905 -0.39056 -1.0235 0 -1.414l1.0615 -1.0625c-2.24491 -0.094 -4.29851 -0.5376 -5.87501 -1.2383 -0.89057 -0.3959 -1.67356 -0.8935 -2.24707 -1.4961C2.40412 15.6383 2 14.8775 2 14s0.40412 -1.6383 0.98242 -2.2461c0.57351 -0.6026 1.3565 -1.1002 2.24707 -1.4961C6.29709 9.78332 7.58358 9.42703 9 9.2168zm6 -2.0234c1.4164 0.21023 2.7029 0.56652 3.7705 1.041 0.8906 0.3959 1.6736 0.8935 2.2471 1.4961C21.5959 12.3617 22 13.1225 22 14c0 1.6685 -1.4091 2.8759 -2.9727 3.624 -0.4981 0.2384 -1.0956 0.0275 -1.3339 -0.4707 -0.2384 -0.4982 -0.0275 -1.0956 0.4707 -1.334C19.5844 15.1397 20 14.4339 20 14c0 -0.2269 -0.0995 -0.518 -0.4316 -0.8672 -0.3373 -0.3544 -0.8724 -0.7199 -1.6104 -1.0478 -0.8134 -0.3616 -1.8196 -0.6548 -2.958 -0.8448zM12 2c0.5523 0 1 0.44772 1 1v8.0264l-0.002 -0.001c-0.0134 0.5405 -0.4542 0.9746 -0.998 0.9746s-0.9855 -0.4341 -0.999 -0.9746l-0.001 0.001V3c0 -0.55228 0.4477 -1 1 -1"
            stroke-width="1"
          ></path>
        </g>
      </svg>
    </section>
  );
}
