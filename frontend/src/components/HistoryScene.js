import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, GradientTexture } from '@react-three/drei';

const Model3DS = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Top Screen */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[4, 2.5, 0.2]} />
                <meshStandardMaterial color="#e60012" />
                <mesh position={[0, 0, 0.11]}>
                    <boxGeometry args={[3.2, 2.0, 0.01]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
            </mesh>

            {/* Bottom Screen / Body */}
            <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[4, 2.8, 0.3]} />
                <meshStandardMaterial color="#e60012" />
                <mesh position={[0, 0.2, 0.16]}>
                    <boxGeometry args={[3, 2.2, 0.01]} />
                    <meshStandardMaterial color="#333" />
                </mesh>

                {/* Buttons / D-Pad placeholders */}
                <mesh position={[-1.4, -0.2, 0.16]}>
                    <circleGeometry args={[0.3, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[1.4, -0.2, 0.16]}>
                    <circleGeometry args={[0.3, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </mesh>

            {/* Hinge */}
            <mesh position={[0, 0.75, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 4, 32]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#888" />
            </mesh>
        </group>
    );
};

const HistoryScene = () => {
    return (
        <div className="h-[400px] w-full bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-inner mb-12 relative overflow-hidden">
            <div className="absolute top-8 left-8 z-10">
                <h2 className="text-3xl font-black text-nintendo-red uppercase tracking-tighter">Evolution 3D</h2>
                <p className="text-gray-500 font-medium">L'innovation par la profondeur</p>
            </div>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Model3DS />
                </Float>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default HistoryScene;
