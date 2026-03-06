import { useScrollStore } from "../../store/useScrollStore";
import { MathUtils } from "three";
import "../../styles/durability.css";

export default function DurabilitySection() {
  const scroll = useScrollStore((s) => s.scroll);
  const progress = MathUtils.clamp((scroll - 0.2) / 0.7, 0, 1);

  return (
    <section className="durability">
      <h3
        style={{
          opacity: progress,
          transform: `translateY(${100 * (1 - progress)}px)`,
          transition: "none",
        }}
      >
        Részletek, amiket eddig sosem hallottál
      </h3>
      <p>Kettős processzoros Aktív Zajszűrés - ANC</p>
      <p>40 mm-es neodímium mágneses meghajtók</p>
      <p>Akusztikus memóriahab szigetelés</p>
    </section>
  );
}
