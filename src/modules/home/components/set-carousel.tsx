import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/ui/carousel';

import Image from 'next/image';

const SetCarousel = () => {
    return (
        <Carousel className="w-full max-w-xs h-20">
            <CarouselContent>
                <CarouselItem>
                    <Image
                        src={'/sor.webp'}
                        fill={true}
                        style={{ objectFit: 'contain' }}
                        alt="Spark of Rebellion"
                    />
                </CarouselItem>
                <CarouselItem>2</CarouselItem>
                <CarouselItem>3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default SetCarousel;
