import React, { useState, useMemo, useEffect, useRef } from "react";
import { useGLTF, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useScrollStore } from "../../store/useScrollStore";

export function Model({ onLoaded, ...props }) {
  const { nodes, materials } = useGLTF("../models/fejhallgatoo.glb");

  const groupRef = useRef();
  const [padColor, setPadColor] = useState("#ffecd6");

  const [isSpinning, setIsSpinning] = useState(true);

  const isMobile = window.innerWidth <= 768;
  const initialCameraZ = isMobile ? 3.5 : 2;

  const scroll = useScrollStore((s) => s.scroll);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      onLoaded?.();
      setTimeout(() => setIsSpinning(false), 1700);
    }, 500);

    return () => clearTimeout(loadTimer);
  }, [onLoaded]);

  const introTime = useRef(0);

  const isFirstFrame = useRef(true);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // --- 🎥 1. KEZDŐPOZÍCIÓK ---
    if (isFirstFrame.current) {
      // Kamera fentről indul
      state.camera.position.y = 4.5;
      // 2. Kamera hátrébbról indul
      state.camera.position.z = initialCameraZ + 3;
      // 3. A modell egy kicsit el van forgatva
      groupRef.current.rotation.y = -8.28 + Math.PI * 1.5;
      isFirstFrame.current = false;
    }

    const safeDelta = Math.min(delta, 0.1);

    let currentCameraTargetZ = initialCameraZ;
    let currentCameraTargetY = 0;

    /* =========================
    INTRO ANIMÁCIÓ
    ========================== */

    let targetRotY = -8.28;

    if (scroll < 0.1) {
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
    }

    // --- LEBEGÉS ---
    const baseModelY = -0.15;

    introTime.current += safeDelta;
    const hoverFade = MathUtils.clamp(1 - scroll / 0.1, 0, 1);
    const hoverOffset = Math.sin(introTime.current * 1.2) * 0.018;

    let targetModelY = baseModelY + hoverOffset * hoverFade;

    /* =========================
    SCROLL ANIMÁCIÓ
    ========================== */

    let targetX = 0;
    let modelTargetZ = 0;

    if (scroll > 0) {
      const rawProgress = MathUtils.clamp((scroll - 0.2) / 0.7, 0, 1);
      const progress = 1 - Math.pow(1 - rawProgress, 3);

      const finalX = isMobile ? 0.6 : 0.9;
      targetX = finalX * progress;

      const finalZ = isMobile ? 0.6 : -0.3;
      modelTargetZ = finalZ * progress;

      targetRotY = MathUtils.lerp(-8.28, -7.2, progress);

      const zoomAmount = 0.6;
      currentCameraTargetZ = initialCameraZ - zoomAmount * progress;

      const finalCamY = isMobile ? 0.8 : 0.6;
      currentCameraTargetY = finalCamY * progress;

      state.scene.environmentRotation.y = MathUtils.lerp(0, Math.PI, progress);

      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    }

    /* =========================
    ALKALMAZÁS A MODELLRE
    ========================== */
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, modelTargetZ, 0.08);
    groupRef.current.position.y = targetModelY;

    /* =========================
    KAMERA VÉGLEGESÍTÉSE
    ========================== */
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, currentCameraTargetZ, 0.03);

    const introFallSpeed = 0.035; // Zuhanás sebessége
    const settleSpeed = 0.02; // Beállás sebessége

    if (isSpinning) {
      state.camera.position.y = MathUtils.lerp(state.camera.position.y, currentCameraTargetY, introFallSpeed);
    } else {
      state.camera.position.y = MathUtils.lerp(state.camera.position.y, currentCameraTargetY, settleSpeed);
    }

    state.camera.lookAt(0, 0, 0);
  });

  // --- ANYAG JAVÍTÁS ---
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material.roughness < 0.1) material.roughness = 0.15;
      if (material.metalness > 0.9) material.metalness = 0.9;
      material.needsUpdate = true;
    });
  }, [materials]);

  const padMaterial = useMemo(() => {
    const mat = materials.ColorMaterial.clone();
    return mat;
  }, [materials.ColorMaterial]);

  // --- Fejhallgatoo ---
  return (
    <group ref={groupRef} position={[0, -0.15, 0]} {...props} dispose={null}>
      <mesh geometry={nodes.Baffle_Left.geometry} material={materials.ColorMaterial}>
        <mesh geometry={nodes.ButtonANC_Left.geometry} material={materials.ColorMaterial} />
        <mesh geometry={nodes.ButtonPower_Left.geometry} material={materials.ColorMaterial} />
        <mesh geometry={nodes.ButtonVolume_Left.geometry} material={materials.ColorMaterial} />
        <mesh geometry={nodes.PortAudio_Left.geometry} material={materials.BlackholeMaterial} />
      </mesh>

      <mesh geometry={nodes.Baffle_Right.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.EarCup_Left.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.EarCup_Right.geometry} material={materials.ColorMaterial} />

      <mesh geometry={nodes.EarPad_Left.geometry} material={padMaterial} material-color={padColor} />
      <mesh geometry={nodes.EarPad_Right.geometry} material={padMaterial} material-color={padColor} />

      <mesh geometry={nodes.Headband.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.Hinge_Left.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.Hinge_Right.geometry} material={materials.ColorMaterial}>
        <mesh geometry={nodes.Logo.geometry} material={materials.LogoMaterial} />
      </mesh>
      <mesh geometry={nodes.SliderHousing_Left.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.SliderHousing_Right.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.SliderMetal_Left.geometry} material={materials.MetalMaterial} />
      <mesh geometry={nodes.SliderMetal_Right.geometry} material={materials.MetalMaterial} />
      <mesh geometry={nodes.SliderTrack_Left.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.SliderTrack_Right.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.SpeakerDriver_Left.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.SpeakerDriver_Right.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.Yoke_Left.geometry} material={materials.ColorMaterial} />
      <mesh geometry={nodes.Yoke_Right.geometry} material={materials.ColorMaterial} />
    </group>
  );
}

useGLTF.preload("../models/fejhallgatoo.glb");
