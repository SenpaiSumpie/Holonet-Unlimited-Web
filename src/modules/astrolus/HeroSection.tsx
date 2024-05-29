'use client';

import React from 'react';

import Container from './Container';
import Image from 'next/image';
import Link from 'next/link';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/ui/carousel';

import AlphaForm from './AlphaForm';

import { Card, CardContent } from '@/ui/card';
import { Button } from '@/ui/button';

const HeroSection = () => {
    return (
        <div className="relative" id="home">
            <div
                aria-hidden="true"
                className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
            >
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <Container>
                <div className="relative pt-36 ml-auto">
                    <div className="lg:w-2/3 text-center mx-auto">
                        <span className="text-gray-900 dark:text-white font-bold font-barlow text-5xl md:text-6xl xl:text-7xl">
                            Elevating Your Deck-Building Experience
                        </span>
                        <p className="mt-8 text-gray-700 dark:text-gray-300">
                            Dive into a seamless trading card experience with
                            our app designed to test your decks against real
                            opponents. Enjoy intuitive UI/UX across multiple
                            platforms including Windows, Linux, Mac, iOS, and
                            Android. Join the Star Wars Unlimited community and
                            elevate your gameplay.
                        </p>
                        {/* <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <a
                                href="#"
                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                            >
                                <span className="relative text-base font-semibold text-white">
                                    Get started
                                </span>
                            </a>
                            <a
                                href="#"
                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                            >
                                <span className="relative text-base font-semibold text-primary dark:text-white">
                                    Learn more
                                </span>
                            </a>
                        </div> */}
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <AlphaForm />
                        </div>
                        <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                            <div className="text-left">
                                <Button variant="link">
                                    <Link href="https://docs.google.com/spreadsheets/d/1cfWOQPM8TdET-dPd-o5fG7gS6iRd9YAvigvHqW3GOcg/edit?usp=sharing">
                                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                            Character Excel Tracker
                                        </h6>
                                    </Link>
                                </Button>
                            </div>
                            <div className="text-left">
                                <Button variant="link">
                                    <Link href="https://trello.com/">
                                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                            Trello Task Tracker
                                        </h6>
                                    </Link>
                                </Button>
                            </div>
                            <Button variant="link">
                                <Link href="https://discord.gg/pNFRRhxc">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                        Discord Community
                                    </h6>
                                </Link>
                            </Button>
                        </div>
                        <Carousel>
                            <CarouselContent>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="aspect-video relative">
                                                    {index}
                                                    <Image
                                                        src={`/image${index + 1}.png`}
                                                        alt={`Description ${index}`}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        priority={true}
                                                        fill={true}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>

                    <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6"></div>
                </div>
            </Container>
        </div>
    );
};

export default HeroSection;
