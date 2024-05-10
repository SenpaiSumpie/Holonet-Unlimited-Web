import type { FC } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// //** Cloudinary */
// import type { ImageProps } from '@/utils/cloudinary/types';

// import { ScrollArea } from '@/ui/scroll-area';

// import { getImagesBySet } from '@/modules/card-management/services/getImages';

interface PageProps {
    params: {
        set: string;
    };
}

export function generateStaticParams() {
    const sets = ['sor', 'sog', 'tor'];

    return sets.map((set) => {
        return {
            set
        };
    });
}

const page: FC<PageProps> = async () => {
    // const images: ImageProps[] =
    //     ((await getImagesBySet(params.set)) as ImageProps[]) || [];

    return (
        <div className="container flex items-center justify-center pt-8 pb-8 flex-grow">
            {/* <ScrollArea className="h-[650px] w-full">
                <div className="grid grid-cols-5 gap-4 overflow-y-auto max-h-full">
                    {images.map(
                        (
                            { id, public_id, format } //eslint-disable-line
                        ) => (
                            <Link
                                key={id} //eslint-disable-line
                                href={`/?photoId=${id}`}
                                as={`/p/${id}`}
                                shallow
                                className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                            >
                                <Image
                                    alt="Next.js Conf photo"
                                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                    style={{
                                        transform: 'translate3d(0, 0, 0)'
                                    }}
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                                    width={720}
                                    height={480}
                                    sizes="(max-width: 640px) 100vw,
					(max-width: 1280px) 50vw,
					(max-width: 1536px) 33vw,
					25vw"
                                />
                            </Link>
                        )
                    )}
                </div>
            </ScrollArea> */}
        </div>
    );
};

export default page;
