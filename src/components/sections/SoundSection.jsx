import { useScrollStore } from "../../store/useScrollStore";
import { MathUtils } from "three";
import "../../styles/sound.css";
import "../../index.css";

export default function SoundSection() {
  const scroll = useScrollStore((s) => s.scroll);

  // A szekció teljes "élettartama" (0-tól 1-ig)
  const progress = MathUtils.clamp((scroll - 0.4) / 0.4, 0, 1);

  const fadeIn = MathUtils.clamp(progress * 6, 0, 1);
  const fadeOut = MathUtils.clamp((0.5 - progress) * 10, 0, 1);

  const currentOpacity = Math.min(fadeIn, fadeOut);

  return (
    <section className="sound">
      <div className="stickycontent">
        <div
          className="little-text"
          style={{
            opacity: currentOpacity,
            transform: `translateY(${50 * (1 - fadeIn)}px)`,
            transition: "none",
          }}
        >
          <h3>Részletek, amiket eddig sosem hallottál</h3>
          <p>Kettős processzoros Aktív Zajszűrés - ANC</p>
          <p>40 mm-es neodímium mágneses meghajtók</p>
          <p>Akusztikus memóriahab szigetelés</p>
        </div>
      </div>
    </section>
  );
}
