"use client";

import { Component, Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

/** Keeps a failed HDRI fetch (offline / blocked CDN) from blanking the canvas. */
class SafeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const COIN_TOKENS = [
  { color: "#14F195", label: "SOL" },
  { color: "#FF9E2C", label: "BONK" },
  { color: "#22D1F8", label: "JUP" },
  { color: "#2775CA", label: "USDC" },
  { color: "#C8A06A", label: "WIF" },
  { color: "#8B7BFF", label: "JTO" },
];

/** A single metallic token coin. */
function Coin({
  color,
  position,
  rotationSpeed,
}: {
  color: string;
  position: [number, number, number];
  rotationSpeed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
      <group ref={ref} position={position} rotation={[Math.PI / 2.4, 0, 0]}>
        {/* coin body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.16, 64]} />
          <meshStandardMaterial
            color={color}
            metalness={0.85}
            roughness={0.18}
            emissive={color}
            emissiveIntensity={0.18}
          />
        </mesh>
        {/* rim */}
        <mesh>
          <torusGeometry args={[0.85, 0.06, 16, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

/** Central fusion core — glowing icosahedron + orbiting ring. */
function FusionCore() {
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.5;
    if (ring2.current) {
      ring2.current.rotation.x += delta * 0.4;
      ring2.current.rotation.y += delta * 0.3;
    }
    if (core.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <Sphere ref={core} args={[0.9, 64, 64]}>
        <meshStandardMaterial
          color="#23e27e"
          emissive="#23e27e"
          emissiveIntensity={1.4}
          metalness={0.3}
          roughness={0.2}
        />
      </Sphere>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.035, 16, 100]} />
        <meshStandardMaterial color="#4dfca0" emissive="#23e27e" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring2} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.1, 0.025, 16, 100]} />
        <meshStandardMaterial color="#8b7bff" emissive="#6b5df0" emissiveIntensity={0.8} />
      </mesh>
      <pointLight color="#23e27e" intensity={6} distance={9} />
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      // gentle parallax toward the pointer
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        state.pointer.x * 0.4,
        0.05,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -state.pointer.y * 0.25,
        0.05,
      );
    }
  });

  const coins = useMemo(() => {
    const radius = 3.4;
    return COIN_TOKENS.map((t, i) => {
      const angle = (i / COIN_TOKENS.length) * Math.PI * 2;
      const y = Math.sin(angle * 1.5) * 0.9;
      return {
        ...t,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius * 0.6,
        ] as [number, number, number],
        rotationSpeed: 0.6 + (i % 3) * 0.25,
      };
    });
  }, []);

  return (
    <group ref={group}>
      <FusionCore />
      {coins.map((c) => (
        <Coin key={c.label} color={c.color} position={c.position} rotationSpeed={c.rotationSpeed} />
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.5, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} />
      <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#8b7bff" />
      <Scene />
      <SafeBoundary>
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
      </SafeBoundary>
    </Canvas>
  );
}
