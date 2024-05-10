import { Barlow } from "next/font/google";
import localFont from "next/font/local";

export const barlow = Barlow({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	subsets: ['latin'],
	variable: "--font-barlow",
});

export const aurebesh = localFont({
    src: [
        {
            path: '../../../public/fonts/AB-Equinox.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-aurebesh',
});

export const avantGarde = localFont({
    src: [
        {
            path: '../../../public/fonts/AvantGarde.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-avant-garde',
});

export const soloist = localFont({
    src: [
        {
            path: '../../../public/fonts/Soloist-Z6M8.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-soloist',
});

export const starJedi = localFont({
    src: [
        {
            path: '../../../public/fonts/Starjedi.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-star-jedi',
});