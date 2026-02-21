import { useScrollStore } from "../../store/useScrollStore";
import { MathUtils } from "three";
import "../../styles/comfort.css";

export default function ComfortSection() {
  const scroll = useScrollStore((s) => s.scroll);
  const progress = MathUtils.clamp((scroll - 0.2) / 0.6, 0, 1);

  return (
    <section className="comfort">
      <h2
        style={{
          opacity: progress,
          transform: `translateY(${100 * (1 - progress)}px)`,
          transition: "none",
        }}
      >
        Kényelem, amit egész nap élvezel
      </h2>
    </section>
  );
}
