// // imageUtils.ts
// import cloudinary from '@/utils/cloudinary/cloudinary';
// import type { ImageProps } from '@/utils/cloudinary/types';

// export async function getImagesBySet(
//     set: string
// ): Promise<ImageProps[] | { notFound: boolean }> {
//     if (!set) {
//         return {
//             notFound: true
//         };
//     }

//     const results = await cloudinary.v2.search //eslint-disable-line
//         .expression(`folder:swu-${set}/*`)
//         .sort_by('public_id', 'desc')
//         .max_results(400)
//         .execute();
//     const reducedResults: ImageProps[] = [];

//     let i = 0;
//     //eslint-disable-next-line
//     for (const result of results.resources) {
//         //eslint-disable-line
//         reducedResults.push({
//             id: i,
//             height: result.height, //eslint-disable-line
//             width: result.width, //eslint-disable-line
//             public_id: result.public_id, //eslint-disable-line
//             format: result.format //eslint-disable-line
//         });
//         i++;
//     }

//     return reducedResults;
// }

// export async function getImages(): Promise<
//     ImageProps[] | { notFound: boolean }
// > {
//     const results = await cloudinary.v2.search //eslint-disable-line
//         .sort_by('public_id', 'desc')
//         .max_results(400)
//         .execute();

//     const reducedResults: ImageProps[] = [];

//     let i = 0;
//     //eslint-disable-next-line
//     for (const result of results.resources) {
//         //eslint-disable-line
//         reducedResults.push({
//             id: i,
//             height: result.height, //eslint-disable-line
//             width: result.width, //eslint-disable-line
//             public_id: result.public_id, //eslint-disable-line
//             format: result.format //eslint-disable-line
//         });
//         i++;
//     }

//     return reducedResults;
// }
