import { useState, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useScrollStore } from "../../store/useScrollStore";

// --- CUSTOM HOOKS ---
import { useInteractiveRotation } from "../../hooks/useInteractiveRotation";
import { useModelMaterials } from "../../hooks/useModelMaterials";

export function Model({ onLoaded, ...props }) {
  // --- Erőforrások ---
  const { nodes, materials } = useGLTF("../models/fejhallgatoo.glb");
  const groupRef = useRef();

  // --- Robbantott ábrához referenciák ---
  const topRef = useRef();
  const hingeLeftRef = useRef();
  const sliderHousingLeftRef = useRef();
  const sliderMetalLeftRef = useRef();
  const sliderTrackLeftRef = useRef();
  const yokeLeftRef = useRef();
  const hingeRightRef = useRef();
  const sliderHousingRightRef = useRef();
  const sliderMetalRightRef = useRef();
  const sliderTrackRightRef = useRef();
  const yokeRightRef = useRef();
  const outLeftRef = useRef();
  const outRightRef = useRef();
  const padLeftRef = useRef();
  const speakerLeftRef = useRef();
  const padRightRef = useRef();
  const speakerRightRef = useRef();

  // --- Állapotok és Képernyőméretek ---
  const [isSpinning, setIsSpinning] = useState(true);
  const scroll = useScrollStore((s) => s.scroll);

  /// --- Reszponzív méretek ---
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1150;
  const initialCameraZ = isMobile ? 3.5 : 2;

  // --- Anyagok és színek dinamikus kezelése ---
  const padMaterial = useModelMaterials(materials);
  // --- Interaktív forgatás kezelése ---
  const manualRotY = useInteractiveRotation(-8.28);

  // --- Betöltés utáni időzítés ---
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      onLoaded?.();
      setTimeout(() => setIsSpinning(false), 1700);
    }, 500);

    return () => clearTimeout(loadTimer);
  }, [onLoaded]);

  // --- Animációs változók ---
  const introTime = useRef(0);
  const isFirstFrame = useRef(true);

  // --- ANIMÁCIÓS CIKLUS ---
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // --- Kezdeti beállítás ---
    if (isFirstFrame.current) {
      state.camera.position.y = 4.5;
      state.camera.position.z = initialCameraZ + 3;
      groupRef.current.rotation.y = -8.28 + Math.PI * 1.5;
      isFirstFrame.current = false;
    }

    const safeDelta = Math.min(delta, 0.1);
    let currentCameraTargetZ = initialCameraZ;
    let currentCameraTargetY = 0;
    let targetRotY = -8.28;

    if (scroll < 0.1) {
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
    }

    const baseModelY = -0.15;
    introTime.current += safeDelta;
    const hoverFade = MathUtils.clamp(1 - scroll / 0.1, 0, 1);
    const hoverOffset = Math.sin(introTime.current * 1.2) * 0.018;
    let targetModelY = baseModelY + hoverOffset * hoverFade;

    let targetX = 0;
    let modelTargetZ = 0;
    let padLeftX = 0,
      padLeftY = 0,
      speakerLeftX = 0,
      speakerLeftY = 0;
    let expTopY = 0;
    let hLX = 0,
      hLY = 0,
      shLX = 0,
      shLY = 0,
      smLX = 0,
      smLY = 0,
      stLX = 0,
      stLY = 0,
      yLX = 0,
      yLY = 0;
    let hRX = 0,
      hRY = 0,
      shRX = 0,
      shRY = 0,
      smRX = 0,
      smRY = 0,
      stRX = 0,
      stRY = 0,
      yRX = 0,
      yRY = 0;
    let expOutLX = 0,
      expOutRX = 0,
      padRightX = 0,
      padRightY = 0,
      speakerRightX = 0,
      speakerRightY = 0;

    if (scroll > 0) {
      // ==========================================
      //           KÉNYELEM SZEKCIÓ
      // ==========================================
      const rawProgress = MathUtils.clamp((scroll - 0.05) / 0.25, 0, 1);
      const progress = 1 - Math.pow(1 - rawProgress, 3);

      const finalX = isMobile ? 0.6 : isTablet ? 0.5 : 0.9;
      targetX = finalX * progress;

      const finalZ = isMobile ? 0.4 : -0.3;
      modelTargetZ = finalZ * progress;

      targetRotY = MathUtils.lerp(-8.28, -7.3, progress);

      const zoomAmount = 0.6;
      currentCameraTargetZ = initialCameraZ - zoomAmount * progress;

      const finalCamY = isMobile ? 0.8 : 0.6;
      currentCameraTargetY = finalCamY * progress;

      state.scene.environmentRotation.y = MathUtils.lerp(0, Math.PI, progress);

      // ==========================================
      //           HANGZÁS SZEKCIÓ
      // ==========================================
      const rawProgress2 = MathUtils.clamp((scroll - 0.33) / 0.2, 0, 1);
      const progress2 = 1 - Math.pow(1 - rawProgress2, 3);

      if (progress2 > 0) {
        const section3X = isMobile ? -0.2 : isTablet ? -0.5 : -0.8;
        targetX = MathUtils.lerp(targetX, section3X, progress2);

        const section3Z = isMobile ? 0.2 : isTablet ? -0.1 : 0.5;
        modelTargetZ = MathUtils.lerp(modelTargetZ, section3Z, progress2);

        const section3Y = isMobile ? -6.5 : isTablet ? -6.0 : -5.7;
        targetRotY = MathUtils.lerp(targetRotY, section3Y, progress2);

        const section3CamY = isMobile ? 1.3 : 1.3;
        currentCameraTargetY = MathUtils.lerp(currentCameraTargetY, section3CamY, progress2);

        const section3ZoomAmount = 0.8;
        currentCameraTargetZ = MathUtils.lerp(currentCameraTargetZ, initialCameraZ - section3ZoomAmount, progress2);

        state.scene.environmentRotation.y = MathUtils.lerp(Math.PI, Math.PI * 1.5, progress2);

        const closeProgress = MathUtils.clamp((scroll - 0.7) / 0.1, 0, 1);
        const closeEase = 1 - Math.pow(1 - closeProgress, 3);

        padLeftX = 0.3 * progress2 * (1 - closeEase);
        padLeftY = 0.06 * progress2 * (1 - closeEase);
        speakerLeftX = 0.15 * progress2 * (1 - closeEase);
        speakerLeftY = 0.07 * progress2 * (1 - closeEase);
      }

      // ==========================================
      //           TARTÓSSÁG SZEKCIÓ
      // ==========================================
      const rawProgress3 = MathUtils.clamp((scroll - 0.6) / 0.4, 0, 1);
      const progress3 = 1 - Math.pow(1 - rawProgress3, 3);

      if (progress3 > 0) {
        targetX = MathUtils.lerp(targetX, 0, progress3);
        modelTargetZ = MathUtils.lerp(modelTargetZ, 0, progress3);
        currentCameraTargetY = MathUtils.lerp(currentCameraTargetY, 0.4, progress3);

        currentCameraTargetZ = MathUtils.lerp(currentCameraTargetZ, initialCameraZ + 0.3, progress3);

        const spinProgress = Math.min(progress3 * 1.5, 1);
        const targetSpinY = -8.28 + Math.PI * 1.2;
        const explodeRotY = -Math.PI * 0.9;

        targetRotY = MathUtils.lerp(targetRotY, MathUtils.lerp(targetSpinY, explodeRotY, spinProgress), progress3);

        const explodeProgress = MathUtils.clamp((scroll - 0.75) / 0.1, 0, 1);
        const resetProgress = MathUtils.clamp((scroll - 0.9) / 0.1, 0, 1);
        const resetEase = 1 - Math.pow(1 - resetProgress, 3);

        if (explodeProgress > 0) {
          const easeExp = (1 - Math.pow(1 - explodeProgress, 4)) * (1 - resetEase);

          expTopY = 0.4 * easeExp;

          hLX = (isMobile ? -0.2 : -0.5) * easeExp;
          hLY = 0.4 * easeExp;
          shLX = (isMobile ? -0.3 : -0.7) * easeExp;
          shLY = 0.5 * easeExp;
          smLX = (isMobile ? -0.1 : -0.4) * easeExp;
          smLY = 0.4 * easeExp;
          stLX = (isMobile ? -0.1 : -0.4) * easeExp;
          stLY = 0.2 * easeExp;
          yLX = (isMobile ? -0.4 : -0.8) * easeExp;
          yLY = 0.3 * easeExp;

          hRX = (isMobile ? 0.2 : 0.5) * easeExp;
          hRY = 0.4 * easeExp;
          shRX = (isMobile ? 0.3 : 0.7) * easeExp;
          shRY = 0.5 * easeExp;
          smRX = (isMobile ? 0.1 : 0.4) * easeExp;
          smRY = 0.4 * easeExp;
          stRX = (isMobile ? 0.1 : 0.4) * easeExp;
          stRY = 0.2 * easeExp;
          yRX = (isMobile ? 0.4 : 0.8) * easeExp;
          yRY = 0.3 * easeExp;

          expOutLX = (isMobile ? -0.45 : -1) * easeExp;
          expOutRX = (isMobile ? 0.55 : 1) * easeExp;

          padLeftX = (isMobile ? -0.3 : -0.7) * easeExp;
          padRightX = (isMobile ? 0.3 : 0.7) * easeExp;
          speakerLeftX = (isMobile ? -0.4 : -0.85) * easeExp;
          speakerRightX = (isMobile ? 0.45 : 0.85) * easeExp;
        }

        // ==========================================
        //           KINÉZET SZEKCIÓ
        // ==========================================
        if (resetProgress > 0) {
          targetRotY = MathUtils.lerp(targetRotY, -8.28, resetEase);
          currentCameraTargetY = MathUtils.lerp(currentCameraTargetY, 0, resetEase);
          currentCameraTargetZ = MathUtils.lerp(currentCameraTargetZ, initialCameraZ, resetEase);
          state.scene.environmentRotation.y = MathUtils.lerp(state.scene.environmentRotation.y, 0, resetEase);
        }

        // --- Interaktív forgatás véglegesítése ---
        if (scroll > 0.97) {
          targetRotY = manualRotY.current;
        } else {
          manualRotY.current = targetRotY;
        }
      }
    }

    // --- Lerpezett értékek alkalmazása ---
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, modelTargetZ, 0.08);
    groupRef.current.position.y = targetModelY;

    if (scroll > 0) {
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    }

    const smooth = 0.08;
    if (topRef.current) topRef.current.position.y = MathUtils.lerp(topRef.current.position.y, expTopY, smooth);
    if (hingeLeftRef.current) {
      hingeLeftRef.current.position.x = MathUtils.lerp(hingeLeftRef.current.position.x, hLX, smooth);
      hingeLeftRef.current.position.y = MathUtils.lerp(hingeLeftRef.current.position.y, hLY, smooth);
    }
    if (sliderHousingLeftRef.current) {
      sliderHousingLeftRef.current.position.x = MathUtils.lerp(sliderHousingLeftRef.current.position.x, shLX, smooth);
      sliderHousingLeftRef.current.position.y = MathUtils.lerp(sliderHousingLeftRef.current.position.y, shLY, smooth);
    }
    if (sliderMetalLeftRef.current) {
      sliderMetalLeftRef.current.position.x = MathUtils.lerp(sliderMetalLeftRef.current.position.x, smLX, smooth);
      sliderMetalLeftRef.current.position.y = MathUtils.lerp(sliderMetalLeftRef.current.position.y, smLY, smooth);
    }
    if (sliderTrackLeftRef.current) {
      sliderTrackLeftRef.current.position.x = MathUtils.lerp(sliderTrackLeftRef.current.position.x, stLX, smooth);
      sliderTrackLeftRef.current.position.y = MathUtils.lerp(sliderTrackLeftRef.current.position.y, stLY, smooth);
    }
    if (yokeLeftRef.current) {
      yokeLeftRef.current.position.x = MathUtils.lerp(yokeLeftRef.current.position.x, yLX, smooth);
      yokeLeftRef.current.position.y = MathUtils.lerp(yokeLeftRef.current.position.y, yLY, smooth);
    }
    if (hingeRightRef.current) {
      hingeRightRef.current.position.x = MathUtils.lerp(hingeRightRef.current.position.x, hRX, smooth);
      hingeRightRef.current.position.y = MathUtils.lerp(hingeRightRef.current.position.y, hRY, smooth);
    }
    if (sliderHousingRightRef.current) {
      sliderHousingRightRef.current.position.x = MathUtils.lerp(sliderHousingRightRef.current.position.x, shRX, smooth);
      sliderHousingRightRef.current.position.y = MathUtils.lerp(sliderHousingRightRef.current.position.y, shRY, smooth);
    }
    if (sliderMetalRightRef.current) {
      sliderMetalRightRef.current.position.x = MathUtils.lerp(sliderMetalRightRef.current.position.x, smRX, smooth);
      sliderMetalRightRef.current.position.y = MathUtils.lerp(sliderMetalRightRef.current.position.y, smRY, smooth);
    }
    if (sliderTrackRightRef.current) {
      sliderTrackRightRef.current.position.x = MathUtils.lerp(sliderTrackRightRef.current.position.x, stRX, smooth);
      sliderTrackRightRef.current.position.y = MathUtils.lerp(sliderTrackRightRef.current.position.y, stRY, smooth);
    }
    if (yokeRightRef.current) {
      yokeRightRef.current.position.x = MathUtils.lerp(yokeRightRef.current.position.x, yRX, smooth);
      yokeRightRef.current.position.y = MathUtils.lerp(yokeRightRef.current.position.y, yRY, smooth);
    }
    if (outLeftRef.current)
      outLeftRef.current.position.x = MathUtils.lerp(outLeftRef.current.position.x, expOutLX, smooth);
    if (outRightRef.current)
      outRightRef.current.position.x = MathUtils.lerp(outRightRef.current.position.x, expOutRX, smooth);
    if (padLeftRef.current) {
      padLeftRef.current.position.x = MathUtils.lerp(padLeftRef.current.position.x, padLeftX, smooth);
      padLeftRef.current.position.y = MathUtils.lerp(padLeftRef.current.position.y, padLeftY, smooth);
    }
    if (speakerLeftRef.current) {
      speakerLeftRef.current.position.x = MathUtils.lerp(speakerLeftRef.current.position.x, speakerLeftX, smooth);
      speakerLeftRef.current.position.y = MathUtils.lerp(speakerLeftRef.current.position.y, speakerLeftY, smooth);
    }
    if (padRightRef.current) {
      padRightRef.current.position.x = MathUtils.lerp(padRightRef.current.position.x, padRightX, smooth);
      padRightRef.current.position.y = MathUtils.lerp(padRightRef.current.position.y, padRightY, smooth);
    }
    if (speakerRightRef.current) {
      speakerRightRef.current.position.x = MathUtils.lerp(speakerRightRef.current.position.x, speakerRightX, smooth);
      speakerRightRef.current.position.y = MathUtils.lerp(speakerRightRef.current.position.y, speakerRightY, smooth);
    }

    // --- Kamera véglegesítése ---
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, currentCameraTargetZ, 0.03);

    const introFallSpeed = 0.035;
    const settleSpeed = 0.02;

    if (isSpinning) {
      state.camera.position.y = MathUtils.lerp(state.camera.position.y, currentCameraTargetY, introFallSpeed);
    } else {
      state.camera.position.y = MathUtils.lerp(state.camera.position.y, currentCameraTargetY, settleSpeed);
    }

    state.camera.lookAt(0, 0, 0);
  });

  // --- A Modell felépítése ---
  return (
    <group ref={groupRef} position={[0, -0.15, 0]} {...props} dispose={null}>
      <group ref={topRef}>
        <mesh geometry={nodes.Headband.geometry} material={materials.ColorMaterial} />
      </group>

      <group>
        <mesh ref={hingeLeftRef} geometry={nodes.Hinge_Left.geometry} material={materials.ColorMaterial} />
        <mesh
          ref={sliderHousingLeftRef}
          geometry={nodes.SliderHousing_Left.geometry}
          material={materials.ColorMaterial}
        />
        <mesh ref={sliderMetalLeftRef} geometry={nodes.SliderMetal_Left.geometry} material={materials.MetalMaterial} />
        <mesh ref={sliderTrackLeftRef} geometry={nodes.SliderTrack_Left.geometry} material={materials.ColorMaterial} />
        <mesh ref={yokeLeftRef} geometry={nodes.Yoke_Left.geometry} material={materials.ColorMaterial} />
      </group>

      <group>
        <mesh ref={hingeRightRef} geometry={nodes.Hinge_Right.geometry} material={materials.ColorMaterial}>
          <mesh geometry={nodes.Logo.geometry} material={materials.LogoMaterial} />
        </mesh>
        <mesh
          ref={sliderHousingRightRef}
          geometry={nodes.SliderHousing_Right.geometry}
          material={materials.ColorMaterial}
        />
        <mesh
          ref={sliderMetalRightRef}
          geometry={nodes.SliderMetal_Right.geometry}
          material={materials.MetalMaterial}
        />
        <mesh
          ref={sliderTrackRightRef}
          geometry={nodes.SliderTrack_Right.geometry}
          material={materials.ColorMaterial}
        />
        <mesh ref={yokeRightRef} geometry={nodes.Yoke_Right.geometry} material={materials.ColorMaterial} />
      </group>

      <group ref={outLeftRef}>
        <mesh geometry={nodes.Baffle_Left.geometry} material={materials.ColorMaterial}>
          <mesh geometry={nodes.ButtonANC_Left.geometry} material={materials.ColorMaterial} />
          <mesh geometry={nodes.ButtonPower_Left.geometry} material={materials.ColorMaterial} />
          <mesh geometry={nodes.ButtonVolume_Left.geometry} material={materials.ColorMaterial} />
          <mesh geometry={nodes.PortAudio_Left.geometry} material={materials.BlackholeMaterial} />
        </mesh>
        <mesh geometry={nodes.EarCup_Left.geometry} material={materials.ColorMaterial} />
      </group>

      <group ref={outRightRef}>
        <mesh geometry={nodes.Baffle_Right.geometry} material={materials.ColorMaterial} />
        <mesh geometry={nodes.EarCup_Right.geometry} material={materials.ColorMaterial} />
      </group>

      <mesh ref={padLeftRef} geometry={nodes.EarPad_Left.geometry} material={padMaterial} />
      <mesh ref={padRightRef} geometry={nodes.EarPad_Right.geometry} material={padMaterial} />
      <mesh ref={speakerLeftRef} geometry={nodes.SpeakerDriver_Left.geometry} material={materials.ColorMaterial} />
      <mesh ref={speakerRightRef} geometry={nodes.SpeakerDriver_Right.geometry} material={materials.ColorMaterial} />
    </group>
  );
}

useGLTF.preload("../models/fejhallgatoo.glb");
