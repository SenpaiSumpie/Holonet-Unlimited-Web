import Image from 'next/image';

import HeroSection from '@/modules/astrolus/HeroSection';
import Features from '@/modules/astrolus/Features';
import Stats from '@/modules/astrolus/Stats';
import Testimonials from '@/modules/astrolus/Testimonials';
import CallToAction from '@/modules/astrolus/CallToAction';
import Blog from '@/modules/astrolus/Blog';
import AppHeader from '@/modules/astrolus/AppHeader';
import AppFooter from '@/modules/astrolus/AppFooter';
import DownloadGame from '@/modules/astrolus/DownloadGame';

export default function Home() {
    return (
        <main className="space-y-40 mb-40">
            {/* <AppHeader /> */}
            <HeroSection />
            {/* <DownloadGame /> */}
            {/* <Features /> */}
            {/* <Stats /> */}
            {/* <Testimonials /> */}
            <CallToAction />
            <AppFooter />
            {/* <Blog /> */}
        </main>
    );
}
