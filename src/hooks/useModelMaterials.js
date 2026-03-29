import { useMemo, useEffect } from "react";
import { useColorStore } from "../store/useColorStore";

export function useModelMaterials(materials) {
  const currentColor = useColorStore((s) => s.modelColor);

  const padMaterial = useMemo(() => {
    return materials.ColorMaterial.clone();
  }, [materials.ColorMaterial]);

  // Anyagok módosítása a színváltozás és egyéb paraméterek miatt
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material.roughness < 0.1) material.roughness = 0.15;
      if (material.metalness > 0.9) material.metalness = 0.9;
      if (material.name === "ColorMaterial") {
        material.color.set(currentColor);
      }
      material.needsUpdate = true;
    });

    if (padMaterial) {
      padMaterial.color.set(currentColor);
      padMaterial.needsUpdate = true;
    }
  }, [materials, currentColor, padMaterial]);

  return padMaterial;
}
