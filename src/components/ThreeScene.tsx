"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Mesh, Vector2 } from "three";
import { Float } from "@react-three/drei";

function Octahedron() {
    const meshRef = useRef<Mesh>(null);
    const mouse = useRef(new Vector2(0, 0));

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Rotation
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.2;

        // Smooth follow
        const targetX = mouse.current.x * 1.5;
        const targetY = mouse.current.y * 1.5;

        meshRef.current.position.x += (targetX - meshRef.current.position.x) * delta * 2;
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * delta * 2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.8}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#ffc0cb"
                    emissive="#ffc0cb"
                    emissiveIntensity={0.8}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
}

export default function ThreeScene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 6] }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Octahedron />
            </Canvas>
        </div>
    );
}
