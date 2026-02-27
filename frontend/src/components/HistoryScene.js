import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls, PerspectiveCamera, Float, RoundedBox, Cylinder, Circle } from '@react-three/drei';
import * as THREE from 'three';

const Model3DS = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
        }
    });

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: '#900',
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    });

    const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: '#050505',
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
    });

    const plasticMaterial = new THREE.MeshStandardMaterial({
        color: '#222',
        roughness: 0.8,
        metalness: 0.2,
    });

    return (
        <group ref={meshRef} position={[0, -0.5, 0]}>
            {/* Top Half */}
            <group position={[0, 1.45, -0.15]} rotation={[0.2, 0, 0]}>
                {/* Top casing */}
                <RoundedBox args={[4.2, 2.8, 0.25]} radius={0.1} smoothness={4} material={bodyMaterial} position={[0, 1.4, 0]} />
                {/* Top inner screen frame */}
                <RoundedBox args={[4.0, 2.6, 0.05]} radius={0.05} smoothness={4} material={plasticMaterial} position={[0, 1.4, 0.11]} />
                {/* Top Screen */}
                <RoundedBox args={[3.4, 2.1, 0.05]} radius={0.02} smoothness={2} material={screenMaterial} position={[0, 1.4, 0.12]} />

                {/* Cameras (Outer) */}
                <Cylinder args={[0.08, 0.08, 0.02, 16]} material={screenMaterial} rotation={[Math.PI / 2, 0, 0]} position={[-1.5, 1.4, -0.13]} />
                <Cylinder args={[0.08, 0.08, 0.02, 16]} material={screenMaterial} rotation={[Math.PI / 2, 0, 0]} position={[1.5, 1.4, -0.13]} />

                {/* Camera (Inner) */}
                <Cylinder args={[0.04, 0.04, 0.01, 16]} material={screenMaterial} rotation={[Math.PI / 2, 0, 0]} position={[0, 2.55, 0.13]} />
            </group>

            {/* Bottom Half */}
            <group position={[0, 0, 0]}>
                {/* Bottom casing */}
                <RoundedBox args={[4.2, 2.9, 0.35]} radius={0.1} smoothness={4} material={bodyMaterial} position={[0, 0, 0]} />
                {/* Bottom inner face */}
                <RoundedBox args={[4.0, 2.7, 0.05]} radius={0.05} smoothness={4} material={plasticMaterial} position={[0, 0, 0.16]} />
                {/* Bottom Screen */}
                <RoundedBox args={[2.7, 2.0, 0.05]} radius={0.02} smoothness={2} material={screenMaterial} position={[0, 0.1, 0.17]} />

                {/* D-Pad */}
                <group position={[-1.4, -0.6, 0.18]}>
                    <RoundedBox args={[0.8, 0.25, 0.05]} radius={0.02} material={plasticMaterial} />
                    <RoundedBox args={[0.25, 0.8, 0.05]} radius={0.02} material={plasticMaterial} />
                </group>

                {/* Circle Pad */}
                <group position={[-1.4, 0.6, 0.18]}>
                    <Cylinder args={[0.4, 0.4, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} material={new THREE.MeshStandardMaterial({ color: '#555', roughness: 0.9 })} />
                </group>

                {/* Action Buttons (A, B, X, Y) */}
                <group position={[1.4, 0.3, 0.18]}>
                    <Cylinder args={[0.12, 0.12, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.35, 0]} material={plasticMaterial} /> {/* X */}
                    <Cylinder args={[0.12, 0.12, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.35, 0]} material={plasticMaterial} /> {/* B */}
                    <Cylinder args={[0.12, 0.12, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} position={[-0.35, 0, 0]} material={plasticMaterial} /> {/* Y */}
                    <Cylinder args={[0.12, 0.12, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0.35, 0, 0]} material={plasticMaterial} /> {/* A */}
                </group>

                {/* Start / Select / Home buttons */}
                <group position={[0, -1.1, 0.18]}>
                    <RoundedBox args={[0.4, 0.1, 0.02]} radius={0.02} position={[-0.8, 0, 0]} material={plasticMaterial} />
                    <RoundedBox args={[0.4, 0.1, 0.02]} radius={0.02} position={[0, 0, 0]} material={plasticMaterial} />
                    <RoundedBox args={[0.4, 0.1, 0.02]} radius={0.02} position={[0.8, 0, 0]} material={plasticMaterial} />
                </group>
            </group>

            {/* Hinge */}
            <group position={[0, 1.45, -0.15]}>
                <Cylinder args={[0.2, 0.2, 4.0, 32]} rotation={[0, 0, Math.PI / 2]} material={plasticMaterial} />
                {/* L / R Shoulder Buttons */}
                <RoundedBox args={[0.8, 0.2, 0.3]} radius={0.05} position={[-1.5, 0.05, -0.1]} material={plasticMaterial} />
                <RoundedBox args={[0.8, 0.2, 0.3]} radius={0.05} position={[1.5, 0.05, -0.1]} material={plasticMaterial} />
            </group>
        </group>
    );
};

const HistoryScene = () => {
    return (
        <div className="h-[500px] w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl mb-12 relative overflow-hidden border border-gray-700">
            <div className="absolute top-8 left-8 z-10">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
                    <span className="text-nintendo-red">Evolution</span> 3D
                </h2>
                <p className="text-gray-400 font-medium tracking-wide mt-2">Le chef-d'œuvre technologique</p>
            </div>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
                <spotLight position={[-10, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#e60012" />
                <spotLight position={[10, -5, 10]} angle={0.3} penumbra={1} intensity={1} color="#1b7bb8" />
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
                    <Model3DS />
                </Float>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Canvas>
        </div>
    );
};

export default HistoryScene;
