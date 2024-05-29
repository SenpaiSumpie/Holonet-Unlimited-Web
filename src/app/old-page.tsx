import DynamicUnlimitedCard from '@/modules/home/three-js/dynamic-unlimited-card';
import { Badge } from '@/ui/badge';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';

import { Separator } from '@/ui/separator';

export default function Home() {
    return (
        <main className="container flex flex-col items-center justify-center pt-[16px] pb-[16px] flex-grow">
            <section className="flex flex-col items-center justify-center w-full">
                <a
                    className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
                    href="/about/roadmap"
                >
                    <Badge variant={'imperial'} className="mr-1">
                        NEW
                    </Badge>
                    <span className="sm:hidden"> Checkout the roadmap! </span>
                    <span className="hidden sm:inline">
                        View the roadmap to see what&apos;s coming next!{' '}
                    </span>
                    <svg
                        width={15}
                        height={15}
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                    >
                        <path
                            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </a>
                <div className="flex items-center justify-center flex-grow w-full">
                    <div className="aspect-2/3 w-4/12 bg-transparent">
                        <DynamicUnlimitedCard />
                    </div>
                    <div className="flex w-8/12 flex-col">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col justify-center">
                                    <span className="font-star-jedi text-center text-6xl">
                                        imperial deck registry
                                    </span>
                                    <span className="font-aurebesh text-center text-2xl opacity-60">
                                        imperial deck registry
                                    </span>
                                </div>
                            </div>
                            <span className="font-barlow text-xl">
                                By order of
                                <span className="font-bold">
                                    {' '}
                                    THE EMPEROR
                                </span>{' '}
                                himself, all loyal Imperial Citizens are hereby
                                commanded to register their decks for
                                <span className="font-bold">
                                    {' '}
                                    STAR WARS: UNLIMITED
                                </span>
                                . This mandate serves as a crucial step towards
                                ensuring the unrelenting might of
                                <span className="font-bold">THE EMPIRE</span> in
                                its unyielding quest to suppress the
                                <span className="font-bold"> REBELLION</span>.
                                With your unwavering support, we shall bring
                                order and dominance back to the galaxy. Long
                                live
                                <span className="font-bold"> THE EMPIRE</span>!
                            </span>
                            <Separator className="my-4" />
                        </div>
                        <div className="flex max-w-4xl flex-col items-center justify-center gap-2">
                            <div className="flex w-full gap-2">
                                <div className="flex w-1/2">
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle>
                                                <span className="from-aggression-color-dark to-aggression-color-light inline-block bg-gradient-to-b bg-clip-text text-xl font-bold text-transparent">
                                                    Discover the Galaxy&apos;s
                                                    Most Coveted Cards
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <span className="text-base">
                                                Unearth the hidden treasures of
                                                <span className="font-bold">
                                                    {' '}
                                                    STAR WARS: Unlimited{' '}
                                                </span>
                                                with our extensive card archive.
                                                <span className="font-bold">
                                                    {' '}
                                                    Search
                                                </span>
                                                ,
                                                <span className="font-bold">
                                                    {' '}
                                                    find
                                                </span>
                                                , and
                                                <span className="font-bold">
                                                    {' '}
                                                    wield{' '}
                                                </span>
                                                the
                                                <span className="font-bold">
                                                    {' '}
                                                    Force&apos;s might{' '}
                                                </span>
                                                in your decks like never before.
                                            </span>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="flex w-1/2">
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle>
                                                <span className="from-command-color-dark to-command-color-light inline-block bg-gradient-to-b bg-clip-text text-xl font-bold text-transparent">
                                                    Forge Your Destiny with Deck
                                                    Building Mastery
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <span className="text-base">
                                                Harness the power of the Dark
                                                and Light sides as you
                                                <span className="font-bold">
                                                    {' '}
                                                    craft your ultimate deck
                                                </span>
                                                . Our intuitive
                                                <span className="font-bold">
                                                    {' '}
                                                    deck-building tools{' '}
                                                </span>
                                                are your lightsaber in the
                                                battle for supremacy.
                                            </span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="flex w-full gap-2">
                                <div className="flex w-1/2">
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle>
                                                <span className="from-vigilance-color-dark to-vigilance-color-light inline-block bg-gradient-to-b bg-clip-text text-xl font-bold text-transparent">
                                                    Unite with the Empire or
                                                    Rebel Against It
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <span className="text-base">
                                                Join the ranks of Imperial
                                                loyalists and Rebel sympathizers
                                                by
                                                <span className="font-bold">
                                                    {' '}
                                                    creating an account
                                                </span>
                                                .
                                                <span className="font-bold">
                                                    {' '}
                                                    Share your deck strategies{' '}
                                                </span>
                                                and
                                                <span className="font-bold">
                                                    {' '}
                                                    embrace the camaraderie{' '}
                                                </span>
                                                of the
                                                <span className="font-bold">
                                                    {' '}
                                                    STAR WARS: Unlimited{' '}
                                                </span>
                                                community.
                                            </span>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="flex w-1/2 ">
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle>
                                                <span className="from-cunning-color-dark to-cunning-color-light inline-block bg-gradient-to-b bg-clip-text text-xl font-bold text-transparent">
                                                    Conquer the Galaxy&apos;s
                                                    Toughest Challenges
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <span className="text-base">
                                                <span className="font-bold">
                                                    Dive into the heart of
                                                    tournaments and metas
                                                </span>
                                                .
                                                <span className="font-bold">
                                                    {' '}
                                                    Discover the secrets{' '}
                                                </span>
                                                of the galaxy&apos;s top decks,
                                                <span className="font-bold">
                                                    {' '}
                                                    explore winning strategies{' '}
                                                </span>
                                                and
                                                <span className="font-bold">
                                                    {' '}
                                                    become the ultimate
                                                    cardmaster{' '}
                                                </span>
                                                in your STAR WARS adventure.
                                            </span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="flex flex-col items-center justify-center w-full">
                <SetCarousel />
            </section> */}
        </main>
    );
}
