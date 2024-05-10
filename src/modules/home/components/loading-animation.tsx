'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import TieFighter from '@/assets/svgs/Color-TieFighter-Vader.svg';

import { headerHeight, footerHeight } from '@/lib/heights';

export const LoadingAnimation = () => {
    return (
        <div
            style={{
                height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`,
                top: `${headerHeight}px`
            }}
            className={`absolute right-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-950 opacity-75`}
        >
            <div className="z-50 opacity-100 items-center flex flex-col relative justify-center">
                <motion.div
                    className=""
                    initial={{ x: 0, y: 0 }}
                    animate={{
                        x: [50, -50, 50], // Animation loop: move right, left, right
                        rotate: [15, -15, 15], // Rotate right, left, right
                        transition: {
                            repeat: Infinity,
                            repeatType: 'reverse',
                            duration: 1.75,
                            ease: 'easeInOut'
                        }
                    }} // eslint-disable-line
                    style={{ width: 100, height: 100 }}
                >
                    <Image
                        src={TieFighter} // eslint-disable-line
                        alt="Tie Fighter"
                        style={{ width: '100%', height: '100%' }}
                    />
                </motion.div>
                <h2 className="text-center text-yellow-400 text-xl font-semibold font-star-jedi tracking-wider">
                    Loading...
                </h2>
                <p className="text-center text-yellow-400 font-star-jedi">
                    This may take a few seconds, please don&apos;t close this
                    page.
                </p>
            </div>
        </div>
    );
};
