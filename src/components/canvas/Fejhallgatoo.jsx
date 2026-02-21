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
  const initialCameraZ = isMobile ? 3 : 2;

  const scroll = useScrollStore((s) => s.scroll);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      onLoaded?.();
      // Az 1.5 mp nagyjából egybeesik az Apple-ös ease-out animáció kifutásával
      setTimeout(() => setIsSpinning(false), 1700);
    }, 500);

    return () => clearTimeout(loadTimer);
  }, [onLoaded]);

  // Időzítő a lebegéshez
  const introTime = useRef(0);

  const isFirstFrame = useRef(true);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // --- 🎥 1. KEZDŐPOZÍCIÓK (APPLE INTRO BEÁLLÍTÁSA) ---
    if (isFirstFrame.current) {
      // 1. Kamera fentről indul
      state.camera.position.y = 4.5;
      // 2. Kamera hátrébbról indul (Zoom-in hatás)
      state.camera.position.z = initialCameraZ + 3;
      // 3. A modell egy kicsit el van forgatva, innen fog a helyére pörögni (Math.PI * 1.5 = 270 fok)
      groupRef.current.rotation.y = -8.28 + Math.PI * 1.5;
      isFirstFrame.current = false;
    }

    const safeDelta = Math.min(delta, 0.1);

    let currentCameraTargetZ = initialCameraZ;
    let currentCameraTargetY = 0;

    /* =========================
    1️⃣ INTRO ANIMÁCIÓ
    ========================== */

    // Az X forgás alapértelmezett beállása
    let targetRotY = -8.28;

    // --- APPLE FORGÁS ---
    if (scroll < 0.1) {
      // A lineáris forgás helyett itt is lerp-et használunk!
      // Ez adja azt a gyönyörű, fokozatosan lassuló "beállást", ahogy a 270 fokos elfordulásból a helyére csúszik.
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
    }

    // --- LEBEGÉS (Hover) ---
    const baseModelY = -0.15;

    introTime.current += safeDelta;
    const hoverFade = MathUtils.clamp(1 - scroll / 0.1, 0, 1);
    const hoverOffset = Math.sin(introTime.current * 1.2) * 0.018;

    let targetModelY = baseModelY + hoverOffset * hoverFade;

    /* =========================
    2️⃣ SCROLL ANIMÁCIÓ
    ========================== */

    let targetX = 0;
    let modelTargetZ = 0;

    if (scroll > 0) {
      const rawProgress = MathUtils.clamp((scroll - 0.2) / 0.7, 0, 1);
      const progress = 1 - Math.pow(1 - rawProgress, 3);

      const finalX = isMobile ? 0.5 : 0.8;
      targetX = finalX * progress;

      const finalZ = isMobile ? 0.6 : -0.2;
      modelTargetZ = finalZ * progress;

      targetRotY = MathUtils.lerp(-8.28, -7.2, progress);

      const zoomAmount = 0.4;
      currentCameraTargetZ = initialCameraZ - zoomAmount * progress;

      const finalCamY = isMobile ? 0.5 : 0.3;
      currentCameraTargetY = finalCamY * progress;

      state.scene.environmentRotation.y = MathUtils.lerp(0, Math.PI, progress);

      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    }

    /* =========================
    3️⃣ ALKALMAZÁS A MODELLRE
    ========================== */
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, modelTargetZ, 0.08);
    groupRef.current.position.y = targetModelY;

    /* =========================
    4️⃣ KAMERA VÉGLEGESÍTÉSE
    ========================== */

    // JAVÍTÁS: A Z tengely (Zoom-in) sebességét lejjebb vettem (0.1 -> 0.03),
    // hogy tökéletesen szinkronban, filmes lassulással érkezzen meg a süllyedéssel együtt!
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, currentCameraTargetZ, 0.03);

    const introFallSpeed = 0.035; // Zuhanás sebessége (gyönyörű, lágy érkezés)
    const settleSpeed = 0.05; // Beállás sebessége

    if (isSpinning) {
      state.camera.position.y = MathUtils.lerp(state.camera.position.y, currentCameraTargetY, introFallSpeed);
    } else {
      state.camera.position.y = MathUtils.lerp(state.camera.position.y, currentCameraTargetY, settleSpeed);
    }

    // A kamera a süllyedés és közeledés közben végig a modellt (a 0,0,0 pontot) figyeli
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
