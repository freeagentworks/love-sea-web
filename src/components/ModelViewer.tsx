"use client";

import { useRef, Suspense, useLayoutEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// @ts-ignore
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

function Model() {
    const materials = useLoader(MTLLoader, "/3d/Love-Sea.mtl");
    const obj = useLoader(OBJLoader, "/3d/Love-Sea.obj", (loader) => {
        materials.preload();
        (loader as any).setMaterials(materials);
    });

    const meshRef = useRef<THREE.Group>(null);

    useLayoutEffect(() => {
        obj.traverse((child: THREE.Object3D) => {
            if ((child as any).isMesh) {
                const mesh = child as THREE.Mesh;
                const oldMaterial = mesh.material as THREE.MeshStandardMaterial;

                // Switch to MeshBasicMaterial to ignore lighting/shadows
                // This is often better for raw photogrammetry scans to hide geometric noise
                mesh.material = new THREE.MeshBasicMaterial({
                    map: oldMaterial.map,
                    side: THREE.DoubleSide
                });
            }
        });
    }, [obj]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return <primitive ref={meshRef} object={obj} scale={0.5} />;
}

export default function ModelViewer() {
    return (
        <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden relative">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <Model />
                    </Stage>
                    <OrbitControls autoRotate autoRotateSpeed={0.5} />
                </Suspense>
            </Canvas>
            <div className="absolute bottom-4 right-4 text-white/50 text-xs">
                Drag to rotate • Scroll to zoom
            </div>
        </div>
    );
}
