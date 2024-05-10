'use client';

import { useRef } from 'react';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, Preload } from '@react-three/drei';
extend({ PerspectiveCamera });

import type { Mesh, Texture } from 'three';
import { TextureLoader } from 'three';

import { useTheme } from 'next-themes';

const Card = () => {
    const { theme } = useTheme();

    const myMesh = useRef<Mesh>(null);
    const textureDarth: Texture = useLoader(TextureLoader, '010-b.webp');
    const textureLuke: Texture = useLoader(TextureLoader, '005-b.webp');
    const textureBack: Texture = useLoader(TextureLoader, 'card_back.webp');

    useFrame(({ clock }) => {
        const a: number = clock.getElapsedTime();
        if (myMesh.current) {
            myMesh.current.rotation.y = a * 0.5;
        }
    });

    return (
        <mesh ref={myMesh} position={[0, 0, 0]} rotation={[0, Math.PI / 8, 0]}>
            <boxGeometry args={[2.5, 3.5, 0.1]} />
            <meshBasicMaterial attach="material-0" color={'black'} />
            <meshBasicMaterial attach="material-1" color={'black'} />
            <meshBasicMaterial attach="material-2" color={'black'} />
            <meshBasicMaterial attach="material-3" color={'black'} />
            <meshBasicMaterial
                attach="material-4"
                map={theme === 'dark' ? textureDarth : textureLuke}
            />
            <meshBasicMaterial attach="material-5" map={textureBack} />
        </mesh>
    );
};

export const UnlimitedCard = () => {
    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.8} position={[2, 2, 2]} />
            <Card />
            <Preload all />
        </Canvas>
    );
};
