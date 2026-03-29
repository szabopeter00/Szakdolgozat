import { useEffect, useRef } from "react";
import { useScrollStore } from "../store/useScrollStore";

export function useInteractiveRotation(initialRotation = -8.28) {
  const manualRotY = useRef(initialRotation);
  const isDragging = useRef(false);
  const previousX = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontalDrag = useRef(null);

  // Az interaktív forgatás kezelése
  useEffect(() => {
    // ==========================================
    // MOBIL (ÉRINTÉS) ESEMÉNYEK KEZELÉSE
    // ==========================================
    const handleTouchStart = (e) => {
      if (useScrollStore.getState().scroll > 0.97) {
        isDragging.current = true;
        startX.current = e.touches[0].clientX;
        startY.current = e.touches[0].clientY;
        previousX.current = e.touches[0].clientX;
        isHorizontalDrag.current = null;
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging.current && useScrollStore.getState().scroll > 0.97) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        if (isHorizontalDrag.current === null) {
          const diffX = Math.abs(currentX - startX.current);
          const diffY = Math.abs(currentY - startY.current);
          if (diffX > 5 || diffY > 5) {
            isHorizontalDrag.current = diffX > diffY;
          }
        }

        // Víszintes húzás esetén forgatás, egyébként hagyjuk a scrollt működni
        if (isHorizontalDrag.current === true) {
          if (e.cancelable) e.preventDefault();

          const deltaX = currentX - previousX.current;
          const sensitivity = 8 / window.innerWidth;
          manualRotY.current += deltaX * sensitivity;
        }

        previousX.current = currentX;
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    // ==========================================
    // ASZTALI GÉP (EGÉR) ESEMÉNYEK KEZELÉSE
    // ==========================================
    const handleMouseDown = (e) => {
      if (useScrollStore.getState().scroll > 0.97) {
        isDragging.current = true;
        previousX.current = e.clientX;
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging.current && useScrollStore.getState().scroll > 0.97) {
        const deltaX = e.clientX - previousX.current;
        const sensitivity = 10 / window.innerWidth;
        manualRotY.current += deltaX * sensitivity;
        previousX.current = e.clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return manualRotY;
}
