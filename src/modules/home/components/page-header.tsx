import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from '@/ui/navigation-menu';

import { Button } from '@/ui/button';

import Image from 'next/image';

import { ModeToggle } from './light-dark-toggle';
import { BookCopy, Layers, Hammer, Info } from 'lucide-react';

import UserNav from '@/modules/home/components/user-nav';
import { isUserAdmin } from '@/hooks/client-user';

// const decksMenu = [
//     {
//         title: 'PUBLIC',
//         description:
//             'Explore and draw inspiration from a galaxy of publicly shared decks by fellow enthusiasts.',
//         href: '/decks/public'
//     },
//     {
//         title: 'TOURNAMENT',
//         description:
//             'Analyze the metagame and uncover winning strategies from top-tier tournament decks.',
//         href: '/decks/tournament'
//     },
//     {
//         title: 'PERSONAL',
//         description:
//             'Manage and customize your private collection of personal decks for your STAR WARS: Unlimited journey.',
//         href: '/decks/personal'
//     },
//     {
//         title: 'FAVORITES',
//         description:
//             'Keep your most cherished decks close at hand by saving them as favorites.',
//         href: '/decks/favorites'
//     },
//     {
//         title: 'CREATE',
//         description:
//             'Channel your inner deckmaster and craft your personalized STAR WARS: Unlimited decks.',
//         href: '/decks/create'
//     },
//     {
//         title: 'IMPORT',
//         description:
//             'Seamlessly integrate your decks from various sources to fortify your deck-building arsenal.',
//         href: '/decks/import'
//     }
// ];

// const statsMenu = [
//     {
//         title: 'MOST PLAYED',
//         description:
//             'Uncover the most frequently played cards and strategies in the STAR WARS: Unlimited galaxy.',
//         href: '/stats/most-played'
//     },
//     {
//         title: 'META RESULTS',
//         description:
//             'Stay in the know with the latest meta trends and competitive results in the world of STAR WARS: Unlimited.',
//         href: '/stats/meta-results'
//     }
// ];

// const toolsMenu = [
//     {
//         title: 'USER MANAGEMENT',
//         subtitle: 'ADMIN',
//         description:
//             'Effortlessly manage your user profile and preferences with our user-friendly tools.',
//         href: '/tools/user-management'
//     },
//     {
//         title: 'CARD MANAGEMENT',
//         subtitle: 'ADMIN',
//         description:
//             'Take control of your card collection with powerful management tools at your fingertips.',
//         href: '/tools/card-management'
//     },
//     {
//         title: 'COLLECTION MANAGEMENT',
//         description:
//             'Organize and maintain your card collection in one convenient location.',
//         href: '/tools/collection-management'
//     },
//     {
//         title: 'IMPERIAL DECK TESTING',
//         subtitle: 'COMING SOON',
//         description:
//             'Put your decks to the test and fine-tune your strategies with our advanced deck testing tools.',
//         href: '/tools/imperial-deck-testing'
//     }
// ];

// const aboutMenu = [
//     {
//         title: 'ABOUT IMPERIAL DECK REGISTRY',
//         description:
//             'Learn more about the mission and purpose of the Imperial Deck Registry.',
//         href: '/about/imperial-deck-registry'
//     },
//     {
//         title: 'WEBSITE ROADMAP',
//         description:
//             'Discover the exciting future plans and developments for our STAR WARS: Unlimited hub.',
//         href: '/about/roadmap'
//     },
//     {
//         title: 'HOW TO PLAY',
//         description:
//             'Get started on your STAR WARS: Unlimited journey with a comprehensive guide on how to play.',
//         href: '/about/how-to-play'
//     },
//     {
//         title: 'CONTENT CREATORS',
//         description:
//             'Explore the contributions and insights of our talented content creators within the community.',
//         href: '/about/content-creators'
//     },
//     {
//         title: 'ACRONYMS & JARGON',
//         description:
//             'Demystify the galaxy&apos;s lingo with our guide to common acronyms and jargon used in STAR WARS: Unlimited.',
//         href: '/about/acronyms-and-jargon'
//     },
//     {
//         title: 'RESOURCES',
//         description:
//             'Access valuable resources to enhance your gameplay and deck-building expertise.',
//         href: '/about/resources'
//     }
// ];

export const PageHeader = () => {
    const isAdmin = isUserAdmin();

    return (
        <nav className="flex w-full justify-center border-b-2 border-black p-4 dark:border-white z-50">
            <div className="container flex items-center gap-x-4">
                <div className="flex items-center">
                    <Link href="/">
                        <span className="font-barlow text-header font-bold text-black dark:text-white">
                            IMPERIAL DECK REGISTRY
                        </span>
                    </Link>
                </div>
                <div className="flex gap-x-2">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href={`/cards`}>
                                    <NavigationMenuTrigger>
                                        <div className="flex items-center gap-2">
                                            <Layers size={14} />
                                            <span
                                                className={
                                                    'font-barlow font-bold text-black dark:text-white '
                                                }
                                            >
                                                CARDS
                                            </span>
                                        </div>
                                    </NavigationMenuTrigger>
                                </Link>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/cards/search"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        CARD SEARCH
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Explore the vast STAR
                                                        WARS: Unlimited galaxy
                                                        and find the cards you
                                                        seek with our powerful
                                                        card search tool.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/cards/sets"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        CARD SETS
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Dive into the extensive
                                                        collection of STAR WARS:
                                                        Unlimited card sets,
                                                        from the classics to the
                                                        latest releases, and
                                                        build your decks with
                                                        the Force on your side.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href={`/decks`}>
                                    <NavigationMenuTrigger>
                                        <div className="flex items-center gap-2">
                                            <BookCopy size={14} />
                                            <span
                                                className={
                                                    'font-barlow font-bold text-black dark:text-white'
                                                }
                                            >
                                                DECKS
                                            </span>
                                        </div>
                                    </NavigationMenuTrigger>
                                </Link>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/public"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        PUBLIC
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Explore and draw
                                                        inspiration from a
                                                        galaxy of publicly
                                                        shared decks by fellow
                                                        enthusiasts.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/personal"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        PERSONAL
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Keep your most cherished
                                                        decks close at hand by
                                                        saving them as
                                                        favorites.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/tournament"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        TOURNAMENT
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Analyze the metagame and
                                                        uncover winning
                                                        strategies from top-tier
                                                        tournament decks.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/official"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        OFFICIAL
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Master the galaxy's
                                                        proven strategies with
                                                        our Official Decks,
                                                        crafted and endorsed by
                                                        the creators of STAR
                                                        WARS: Unlimited.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/favorites"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        FAVORITES
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Explore and draw
                                                        inspiration from a
                                                        galaxy of publicly
                                                        shared decks by fellow
                                                        enthusiasts.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/create"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        CREATE
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Explore and draw
                                                        inspiration from a
                                                        galaxy of publicly
                                                        shared decks by fellow
                                                        enthusiasts.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/import"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        IMPORT
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Seamlessly integrate
                                                        your decks from various
                                                        sources to fortify your
                                                        deck-building arsenal.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/decks/generate"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        HOLOCRON
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Unlock the future of
                                                        deck building with
                                                        precision-crafted
                                                        Holocron (AI) Generated
                                                        Decks, guided by
                                                        advanced artificial
                                                        intelligence for your
                                                        STAR WARS: Unlimited
                                                        journey.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            {/* <NavigationMenuItem>
                                <Link href={`/leaders`}>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <div className="flex items-center gap-2">
                                            <User2 size={14} />
                                            <span
                                                className={
                                                    'font-barlow font-bold text-black dark:text-white'
                                                }
                                            >
                                                LEADERS
                                            </span>
                                        </div>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem> */}
                            {/* <NavigationMenuItem>
                                <Link href={`/stats`}>
                                    <NavigationMenuTrigger>
                                        <div className="flex items-center gap-2">
                                            <BarChart3 size={14} />
                                            <span
                                                className={
                                                    'font-barlow font-bold text-black dark:text-white'
                                                }
                                            >
                                                STATS
                                            </span>
                                        </div>
                                    </NavigationMenuTrigger>
                                </Link>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {statsMenu.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem> */}
                            {isAdmin && (
                                <NavigationMenuItem>
                                    <Link href={`/decks`}>
                                        <NavigationMenuTrigger>
                                            <div className="flex items-center gap-2">
                                                <Hammer size={14} />
                                                <span
                                                    className={
                                                        'font-barlow font-bold text-black dark:text-white'
                                                    }
                                                >
                                                    ADMIN TOOLS
                                                </span>
                                            </div>
                                        </NavigationMenuTrigger>
                                    </Link>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/tools/card-management"
                                                        className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                    >
                                                        <div className="text-sm font-bold leading-none">
                                                            CARD MANAGEMENT
                                                        </div>
                                                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                            Take control of your
                                                            card collection with
                                                            powerful management
                                                            tools at your
                                                            fingertips.
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/tools/user-management"
                                                        className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                    >
                                                        <div className="text-sm font-bold leading-none">
                                                            USER MANAGEMENT
                                                        </div>
                                                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                            Step into the
                                                            galactic frontier of
                                                            user management.
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )}
                            <NavigationMenuItem>
                                <Link href={`/decks`}>
                                    <NavigationMenuTrigger>
                                        <div className="flex items-center gap-2">
                                            <Info size={14} />
                                            <span
                                                className={
                                                    'font-barlow font-bold text-black dark:text-white'
                                                }
                                            >
                                                ABOUT
                                            </span>
                                        </div>
                                    </NavigationMenuTrigger>
                                </Link>
                                <NavigationMenuContent>
                                    <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px] ">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/about/roadmap"
                                                    className="dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent-dark focus:text-accent-dark-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                                >
                                                    <div className="text-sm font-bold leading-none">
                                                        WEBSITE ROADMAP
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                        Discover the exciting
                                                        future plans and
                                                        developments for our
                                                        STAR WARS: Unlimited
                                                        hub.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center justify-center gap-x-2">
                    <ModeToggle />

                    <UserNav />
                </div>
            </div>
        </nav>
    );
};
