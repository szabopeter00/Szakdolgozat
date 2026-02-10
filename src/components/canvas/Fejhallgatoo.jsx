import React, { useState, useMemo, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export function Model({ onLoaded, ...props }) {
  const { nodes, materials } = useGLTF("../models/fejhallgatoo.glb");

  const groupRef = useRef();
  const [padColor, setPadColor] = useState("#ffecd6");

  const [isSpinning, setIsSpinning] = useState(true);
  const [isCameraMoving, setIsCameraMoving] = useState(true);

  const isMobile = window.innerWidth <= 768;
  const targetZ = isMobile ? 3 : 2;

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      onLoaded?.();

      setTimeout(() => setIsSpinning(false), 1000);
      setTimeout(() => setIsCameraMoving(false), 1200);
    }, 500);

    return () => clearTimeout(loadTimer);
  }, [onLoaded]);

  // --- FEJHALLGATÓ BETÖLTÉSE ---
  useFrame((state, delta) => {
    // --- FEJHALLGATÓ FORGATÁSA ---
    if (groupRef.current) {
      if (isSpinning) {
        groupRef.current.rotation.y += delta * -2.6;
      } else {
        groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, -8.28, 0.04);
      }
    }

    // --- KAMERA MOZGATÁSA ---
    if (isCameraMoving) {
      state.camera.position.y += delta * -0.6;
      state.camera.lookAt(0, 0, 0);
    } else {
      state.camera.position.y = MathUtils.lerp(state.camera.position.y, 0, 0.04);
      state.camera.lookAt(0, 0, 0);
    }
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
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
    <group ref={groupRef} {...props} dispose={null}>
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
