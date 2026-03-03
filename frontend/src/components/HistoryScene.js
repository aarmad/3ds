import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { OrbitControls, PerspectiveCamera, Float, RoundedBox, Cylinder, Environment, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Materials created once outside the component ─────────────── */
const bodyMat = new THREE.MeshPhysicalMaterial({
    color: '#cc0010',
    metalness: 0.55,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    reflectivity: 1,
});

const bodyMatDark = new THREE.MeshPhysicalMaterial({
    color: '#1a1a1a',
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
});

const screenOffMat = new THREE.MeshPhysicalMaterial({
    color: '#070b10',
    metalness: 0.9,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
});

const screenOnMat = new THREE.MeshStandardMaterial({
    color: '#0a2a5c',
    emissive: '#122d5f',
    emissiveIntensity: 0.6,
    roughness: 0.05,
    metalness: 0.1,
});

const plasticDark = new THREE.MeshStandardMaterial({
    color: '#1c1c1c',
    roughness: 0.75,
    metalness: 0.15,
});

const rubberGray = new THREE.MeshStandardMaterial({
    color: '#3a3a3a',
    roughness: 0.95,
    metalness: 0.0,
});

const metalHinge = new THREE.MeshPhysicalMaterial({
    color: '#555',
    metalness: 0.9,
    roughness: 0.25,
    clearcoat: 0.5,
});

const btnA = new THREE.MeshStandardMaterial({ color: '#cc3333', roughness: 0.6 });
const btnB = new THREE.MeshStandardMaterial({ color: '#f5c518', roughness: 0.6 });
const btnX = new THREE.MeshStandardMaterial({ color: '#3377cc', roughness: 0.6 });
const btnY = new THREE.MeshStandardMaterial({ color: '#33aa33', roughness: 0.6 });
const btnHome = new THREE.MeshStandardMaterial({ color: '#dddddd', roughness: 0.5, metalness: 0.3 });


/* ── The 3DS model ──────────────────────────────────────────────── */
const Model3DS = () => {
    const root = useRef();

    useFrame(({ clock }) => {
        if (!root.current) return;
        // gentle rocking
        root.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.35;
        root.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.25) * 0.06;
    });

    return (
        <group ref={root} position={[0, -1.2, 0]} scale={0.82}>

            {/* ══════════════════ TOP HALF (screen lid) ═══════════════ */}
            <group position={[0, 3.15, -0.18]} rotation={[0.18, 0, 0]}>
                {/* Outer body */}
                <RoundedBox args={[4.4, 3.0, 0.22]} radius={0.12} smoothness={6} material={bodyMat} />
                {/* Inner bezel */}
                <RoundedBox args={[4.1, 2.75, 0.06]} radius={0.08} smoothness={4} material={plasticDark} position={[0, 0, 0.12]} />
                {/* Top screen – widescreen 5:3 */}
                <RoundedBox args={[3.5, 2.15, 0.04]} radius={0.04} smoothness={2} material={screenOnMat} position={[0, 0.05, 0.14]} />
                {/* Screen glare overlay */}
                <mesh position={[0.4, 0.35, 0.16]}>
                    <planeGeometry args={[0.6, 0.35]} />
                    <meshStandardMaterial color="white" transparent opacity={0.04} />
                </mesh>

                {/* 3D logo badge */}
                <mesh position={[1.55, 1.2, 0.12]}>
                    <circleGeometry args={[0.22, 32]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.6} />
                </mesh>
                <mesh position={[1.55, 1.2, 0.14]}>
                    <circleGeometry args={[0.18, 32]} />
                    <meshStandardMaterial color="#e60012" roughness={0.4} />
                </mesh>

                {/* Outer cameras */}
                <Cylinder args={[0.07, 0.07, 0.04, 20]} material={plasticDark} rotation={[Math.PI / 2, 0, 0]} position={[-1.7, -1.35, -0.12]} />
                <Cylinder args={[0.04, 0.04, 0.04, 20]} material={screenOffMat} rotation={[Math.PI / 2, 0, 0]} position={[-1.7, -1.35, -0.15]} />
                <Cylinder args={[0.07, 0.07, 0.04, 20]} material={plasticDark} rotation={[Math.PI / 2, 0, 0]} position={[1.7, -1.35, -0.12]} />

                {/* Inner (selfie) camera */}
                <Cylinder args={[0.035, 0.035, 0.03, 16]} material={screenOffMat} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.41, 0.12]} />

                {/* IR sensor strip */}
                <mesh position={[0, -1.42, 0]}>
                    <boxGeometry args={[0.6, 0.06, 0.24]} />
                    <meshStandardMaterial color="#111" roughness={0.9} />
                </mesh>

                {/* Top speaker grille slots */}
                {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
                    <mesh key={i} position={[-1.8 + x * 0.01, 1.1, 0.12]}>
                        <boxGeometry args={[0.04, 0.35, 0.03]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                    </mesh>
                ))}
                {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
                    <mesh key={i} position={[1.8 + x * 0.01, 1.1, 0.12]}>
                        <boxGeometry args={[0.04, 0.35, 0.03]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                    </mesh>
                ))}
            </group>

            {/* ══════════════════ HINGE ═══════════════════════════════ */}
            <group position={[0, 1.75, -0.18]}>
                <Cylinder args={[0.22, 0.22, 3.8, 32]} rotation={[0, 0, Math.PI / 2]} material={metalHinge} />
                {/* hinge caps */}
                <Cylinder args={[0.24, 0.24, 0.12, 32]} rotation={[0, 0, Math.PI / 2]} position={[1.88, 0, 0]} material={bodyMat} />
                <Cylinder args={[0.24, 0.24, 0.12, 32]} rotation={[0, 0, Math.PI / 2]} position={[-1.88, 0, 0]} material={bodyMat} />
                {/* L Shoulder */}
                <RoundedBox args={[1.1, 0.28, 0.38]} radius={0.07} position={[-1.85, 0.08, -0.04]} material={bodyMat} />
                {/* R Shoulder */}
                <RoundedBox args={[1.1, 0.28, 0.38]} radius={0.07} position={[1.85, 0.08, -0.04]} material={bodyMat} />
            </group>

            {/* ══════════════════ BOTTOM HALF (body) ══════════════════ */}
            <group position={[0, 0, 0]}>
                {/* Main body */}
                <RoundedBox args={[4.4, 3.2, 0.42]} radius={0.14} smoothness={6} material={bodyMat} />
                {/* Inner face plate */}
                <RoundedBox args={[4.1, 2.95, 0.06]} radius={0.1} smoothness={4} material={plasticDark} position={[0, 0, 0.2]} />

                {/* Bottom touch screen */}
                <RoundedBox args={[2.85, 2.2, 0.04]} radius={0.04} smoothness={2} material={screenOnMat} position={[0, 0.12, 0.22]} />
                {/* touch screen frame */}
                <RoundedBox args={[3.05, 2.4, 0.03]} radius={0.04} smoothness={2} material={plasticDark} position={[0, 0.12, 0.21]} />

                {/* ── Circle Pad (left analog) ── */}
                <group position={[-1.5, 0.78, 0.21]}>
                    <Cylinder args={[0.38, 0.34, 0.07, 32]} rotation={[Math.PI / 2, 0, 0]} material={rubberGray} />
                    <Cylinder args={[0.18, 0.18, 0.09, 32]} rotation={[Math.PI / 2, 0, 0]} material={plasticDark} />
                </group>

                {/* ── D-Pad ── */}
                <group position={[-1.5, -0.62, 0.22]}>
                    <RoundedBox args={[0.9, 0.28, 0.07]} radius={0.04} material={plasticDark} />
                    <RoundedBox args={[0.28, 0.9, 0.07]} radius={0.04} material={plasticDark} />
                    <Cylinder args={[0.15, 0.15, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} material={rubberGray} />
                </group>

                {/* ── ABXY Buttons ── */}
                <group position={[1.5, 0.4, 0.22]}>
                    {/* A – right */}
                    <group position={[0.38, 0, 0]}>
                        <Cylinder args={[0.14, 0.14, 0.09, 24]} rotation={[Math.PI / 2, 0, 0]} material={btnA} />
                    </group>
                    {/* B – bottom */}
                    <group position={[0, -0.38, 0]}>
                        <Cylinder args={[0.14, 0.14, 0.09, 24]} rotation={[Math.PI / 2, 0, 0]} material={btnB} />
                    </group>
                    {/* X – top */}
                    <group position={[0, 0.38, 0]}>
                        <Cylinder args={[0.14, 0.14, 0.09, 24]} rotation={[Math.PI / 2, 0, 0]} material={btnX} />
                    </group>
                    {/* Y – left */}
                    <group position={[-0.38, 0, 0]}>
                        <Cylinder args={[0.14, 0.14, 0.09, 24]} rotation={[Math.PI / 2, 0, 0]} material={btnY} />
                    </group>
                </group>

                {/* ── Start / Select / Home ── */}
                <group position={[0.3, -1.28, 0.22]}>
                    {/* Select */}
                    <RoundedBox args={[0.45, 0.14, 0.06]} radius={0.03} position={[-0.9, 0, 0]} material={plasticDark} />
                    {/* Home */}
                    <Cylinder args={[0.14, 0.14, 0.07, 24]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={btnHome} />
                    {/* Start */}
                    <RoundedBox args={[0.45, 0.14, 0.06]} radius={0.03} position={[0.9, 0, 0]} material={plasticDark} />
                </group>

                {/* ── Right Analog nub (New 3DS) ── */}
                <group position={[1.5, -0.55, 0.22]}>
                    <Cylinder args={[0.16, 0.14, 0.06, 20]} rotation={[Math.PI / 2, 0, 0]} material={rubberGray} />
                </group>

                {/* ── ZL / ZR small indicators ── */}
                <RoundedBox args={[0.3, 0.1, 0.05]} radius={0.02} position={[-1.5, 1.44, 0.22]} material={plasticDark} />
                <RoundedBox args={[0.3, 0.1, 0.05]} radius={0.02} position={[1.5, 1.44, 0.22]} material={plasticDark} />

                {/* Bottom speaker grille slots */}
                {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
                    <mesh key={`sl${i}`} position={[-1.9 + x * 0.01, -0.3, 0.21]}>
                        <boxGeometry args={[0.05, 0.4, 0.04]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                    </mesh>
                ))}
                {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
                    <mesh key={`sr${i}`} position={[1.9 + x * 0.01, -0.3, 0.21]}>
                        <boxGeometry args={[0.05, 0.4, 0.04]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                    </mesh>
                ))}

                {/* Stylus silo (right edge) */}
                <mesh position={[2.16, -0.9, 0]}>
                    <cylinderGeometry args={[0.07, 0.07, 0.9, 16]} />
                    <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Card slot bump (right bottom edge) */}
                <mesh position={[2.16, 0.6, 0]}>
                    <boxGeometry args={[0.06, 0.5, 0.38]} />
                    <meshStandardMaterial color="#bb0010" metalness={0.3} roughness={0.5} />
                </mesh>

                {/* Power LED */}
                <mesh position={[-2.15, -0.9, 0.22]}>
                    <circleGeometry args={[0.055, 16]} />
                    <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1.5} />
                </mesh>

                {/* Charge port (bottom edge) */}
                <mesh position={[0.7, -1.57, 0]}>
                    <boxGeometry args={[0.4, 0.08, 0.3]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
                </mesh>
            </group>

        </group>
    );
};

/* ── Scene wrapper ──────────────────────────────────────────────── */
const HistoryScene = () => (
    <div className="h-[520px] w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-3xl shadow-2xl mb-12 relative overflow-hidden border border-gray-800">
        {/* Overlay text */}
        <div className="absolute top-8 left-8 z-10 pointer-events-none">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
                <span className="text-nintendo-red">Evolution</span> 3D
            </h2>
            <p className="text-gray-400 font-medium tracking-wide mt-1">
                Glissez pour explorer · Interactif
            </p>
        </div>

        <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={42} />

            {/* Lighting */}
            <ambientLight intensity={0.35} />
            <directionalLight position={[6, 10, 6]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} />
            <spotLight position={[-8, 6, 8]} angle={0.28} penumbra={1} intensity={2.5} color="#e60012" />
            <spotLight position={[8, -4, 8]} angle={0.28} penumbra={1} intensity={1.2} color="#3366ff" />
            <pointLight position={[0, 0, 6]} intensity={0.4} color="#ffffff" />

            {/* Environment map for reflections */}
            <Environment preset="city" />

            {/* Reflective floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <MeshReflectorMaterial
                    blur={[600, 100]}
                    resolution={512}
                    mixBlur={0.9}
                    mixStrength={1.5}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                />
            </mesh>

            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
                <Model3DS />
            </Float>

            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.9}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 3.5}
            />
        </Canvas>
    </div>
);

export default HistoryScene;
