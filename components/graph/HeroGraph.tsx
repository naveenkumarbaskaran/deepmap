"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

const TRACK_COLORS = [
  "#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b",
];

const LAYER_SIZES = [4, 6, 8, 8, 6, 4]; // nodes per track/layer

function generateNodePositions() {
  const positions: Array<{ pos: [number, number, number]; color: string; layer: number }> = [];
  LAYER_SIZES.forEach((count, layerIdx) => {
    const x = (layerIdx - LAYER_SIZES.length / 2) * 2.2;
    for (let i = 0; i < count; i++) {
      const y = (i - (count - 1) / 2) * 1.4;
      const z = (Math.random() - 0.5) * 0.6;
      positions.push({ pos: [x, y, z], color: TRACK_COLORS[layerIdx], layer: layerIdx });
    }
  });
  return positions;
}

function generateEdges(nodes: ReturnType<typeof generateNodePositions>) {
  const edges: Array<[number, number]> = [];
  const layerMap: number[][] = [];
  nodes.forEach((n, i) => {
    if (!layerMap[n.layer]) layerMap[n.layer] = [];
    layerMap[n.layer].push(i);
  });
  for (let l = 0; l < layerMap.length - 1; l++) {
    const from = layerMap[l];
    const to = layerMap[l + 1];
    from.forEach((fi) => {
      // connect to 2-3 random nodes in next layer
      const targets = [...to].sort(() => Math.random() - 0.5).slice(0, 3);
      targets.forEach((ti) => edges.push([fi, ti]));
    });
  }
  return edges;
}

function NeuralNode({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const phase = index * 0.4;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.08;
    const pulse = 0.85 + Math.sin(t * 1.5 + phase) * 0.15;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function EdgeLine({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end]
  );
  return (
    <Line
      points={points}
      color={color}
      lineWidth={0.4}
      transparent
      opacity={0.2}
    />
  );
}

function NeuralScene() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => generateNodePositions(), []);
  const edges = useMemo(() => generateEdges(nodes), [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {edges.map(([from, to], i) => (
        <EdgeLine
          key={i}
          start={nodes[from].pos}
          end={nodes[to].pos}
          color={TRACK_COLORS[nodes[from].layer]}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <NeuralNode key={i} position={n.pos} color={n.color} index={i} />
      ))}
    </group>
  );
}

export function HeroGraph() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-5, -3, 3]} intensity={1} color="#06b6d4" />
        <pointLight position={[0, 0, 8]} intensity={0.5} color="#f59e0b" />
        <NeuralScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />
      </Canvas>
    </div>
  );
}
