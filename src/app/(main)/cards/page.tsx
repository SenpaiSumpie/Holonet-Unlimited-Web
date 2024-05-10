import type { Card } from '@prisma/client';
import { getCards } from '@/server/_cards';
import Image from 'next/image';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card';

async function getData() {
    const cards = await getCards();
    return cards;
}

const CardsPage = async () => {
    const { cards = [] } = await getData();
    console.log(cards);
    return (
        <div className="container flex w-full flex-grow pb-8 pt-8">
            <div className="w-full flex">
                {cards.map((card: Card) => (
                    <div key={card.id} className="flex flex-col w-full">
                        {card.name}
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Image
                                    src={card.frontImgUrl ?? ''}
                                    width={250}
                                    height={250}
                                    alt="Picture of the author"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <Image
                                    src={card.frontImgUrl ?? ''}
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"
                                />
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsPage;
