'use client';

import { useCallback, useEffect, Suspense, useState } from 'react';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

export const ParticleBackground = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        //eslint-disable-next-line
        initParticlesEngine(async (engine: Engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size

            await loadFull(engine);
            setIsLoaded(true);
            //eslint-disable-next-line
        });
    }, []);

    // eslint-disable-next-line
    const particlesLoaded = useCallback(async (container: any) => {
        await console.log(container); // eslint-disable-line
    }, []);

    return (
        <Suspense>
            <div
                className={`-z-50 absolute transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'} duration-2000`}
            >
                <Particles
                    id="starry-background"
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: '#000000' // Black background
                        },
                        particles: {
                            number: {
                                value: 200, // Number of stars
                                density: {
                                    enable: true
                                }
                            },
                            color: {
                                value: '#ffffff' // Color of the stars
                            },
                            shape: {
                                type: 'circle' // Shape of the stars
                            },
                            opacity: {
                                value: { min: 0.1, max: 0.7 } // Opacity of the stars
                            },
                            size: {
                                value: { max: 2, min: 1 } // Size of the stars
                            },
                            move: {
                                enable: true,
                                speed: 0.15 // Speed of stars
                            }
                        }
                    }}
                />
            </div>
        </Suspense>
    );
};
