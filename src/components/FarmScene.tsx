"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import * as THREE from "three";

export default function FarmScene({
  lat = 36.5,
  lon = -98.0,
}: {
  lat?: number;
  lon?: number;
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 12, 18], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <OrbitControls makeDefault />
        <Terrain />
        <Plants lat={lat} lon={lon} />
        <Stats />
      </Canvas>
    </div>
  );
}

function Terrain() {
  const ref = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (!ref.current) return;
    const geom = ref.current.geometry as THREE.PlaneGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.12) * Math.cos(y * 0.12) * 0.25 +
        (Math.random() - 0.5) * 0.02;
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();
    pos.needsUpdate = true;
  }, []);

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[80, 80, 120, 120]} />
      <meshStandardMaterial color="#2f6b34" roughness={0.95} />
    </mesh>
  );
}

function Plants({ lat, lon }: { lat: number; lon: number }) {
  const COUNT = 300;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  const positions = useRef<Float32Array | null>(null);
  const [moistureFactor, setMoistureFactor] = useState(0.5);

  // Initial random plant positions
  useEffect(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    positions.current = arr;
  }, []);

  // Poll NASA metrics API
  useEffect(() => {
    let mounted = true;

    async function poll() {
      try {
        const res = await fetch(`/api/metrics?lat=${lat}&lon=${lon}`);
        const js = await res.json();

        if (!mounted) return;
        const p = js.precip_mm_day ?? 0;
        const factor = Math.min(1, Math.max(0, p / 10));
        setMoistureFactor(factor);
      } catch {
        // fail silently
      }
    }

    poll();
    const id = setInterval(poll, 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [lat, lon]);

  // Animate sway + growth
  useFrame(({ clock }) => {
    if (!meshRef.current || !positions.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < COUNT; i++) {
      const x = positions.current[i * 3 + 0];
      const z = positions.current[i * 3 + 2];

      const sway =
        Math.sin(t * 2 + i) *
        0.08 *
        (0.5 + moistureFactor * 1.2); // wetter = more sway
      const scale =
        0.4 +
        moistureFactor * 1.0 +
        (Math.sin(t * 0.5 + i) + 1) * 0.05; // taller with moisture

      dummy.position.set(x, scale / 2, z);
      dummy.rotation.set(0, sway, 0);
      dummy.scale.set(scale, scale * 2.0, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, COUNT]}
      castShadow
    >
      <cylinderGeometry args={[0.06, 0.12, 1, 8]} />
      <meshStandardMaterial color="#16a34a" />
    </instancedMesh>
  );
}
