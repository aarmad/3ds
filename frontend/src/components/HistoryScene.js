import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls, PerspectiveCamera, useGLTF, Float, Environment, MeshReflectorMaterial } from '@react-three/drei';

/* ── Load the GLTF model ──────────────────────────────────────── */
const ModelScene = () => {
    const { scene } = useGLTF('/3d_models/3ds/scene.gltf');
    const root = useRef();

    useFrame(({ clock }) => {
        if (!root.current) return;
        // gentle rocking
        root.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.35;
        root.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.25) * 0.06;
    });

    return (
        <group ref={root} position={[0, 0, 0]} scale={1.5}>
            <primitive object={scene} />
        </group>
    );
};

/* ── Scene wrapper ──────────────────────────────────────────────── */
const HistoryScene = () => (
    <div className="h-[520px] w-full bg-gradient-to-br from-blue-950 via-slate-900 to-black rounded-3xl shadow-2xl mb-12 relative overflow-hidden border border-blue-800">
        {/* Overlay text */}
        <div className="absolute top-8 left-8 z-10 pointer-events-none">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
                <span className="text-accent-blue">Evolution</span> 3D
            </h2>
            <p className="text-blue-300 font-medium tracking-wide mt-1">
                Glissez pour explorer · Interactif
            </p>
        </div>

        <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={42} />

            {/* Lighting */}
            <ambientLight intensity={0.35} />
            <directionalLight position={[6, 10, 6]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} />
            <spotLight position={[-8, 6, 8]} angle={0.28} penumbra={1} intensity={2.5} color="#3b82f6" />
            <spotLight position={[8, -4, 8]} angle={0.28} penumbra={1} intensity={1.2} color="#60a5fa" />
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
                <ModelScene />
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
