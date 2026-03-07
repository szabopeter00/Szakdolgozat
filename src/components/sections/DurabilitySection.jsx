import { useScrollStore } from "../../store/useScrollStore";
import { MathUtils } from "three";
import "../../styles/durability.css";

export default function DurabilitySection() {
  const scroll = useScrollStore((s) => s.scroll);

  // A szekció teljes "élettartama" (0-tól 1-ig)
  const progress = MathUtils.clamp((scroll - 0.75) / 0.3, 0, 1);

  const fadeIn = MathUtils.clamp(progress * 6, 0, 1);
  const fadeOut = MathUtils.clamp((0.7 - progress) * 10, 0, 1);

  const currentOpacity = Math.min(fadeIn, fadeOut);

  return (
    <section className="durability">
      <div className="sticky">
        <div
          style={{
            opacity: currentOpacity,
            transform: `translateY(${50 * (1 - fadeIn)}px)`,
            transition: "none",
          }}
        >
          <h3>A tartósság a részletekben rejlik</h3>
          <p>Több, mint 150 precíziósan illesztett alkatrész</p>
        </div>
      </div>
    </section>
  );
}
