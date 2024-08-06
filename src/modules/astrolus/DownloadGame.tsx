'use client';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { WindowsLogo, AppleLogo } from '@phosphor-icons/react';

const DownloadGame = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 flex justify-center gap-x-5">
            <Card className="w-1/5 aspect-square">
                <CardContent className="flex flex-col items-center justify-center w-full h-full">
                    <WindowsLogo className="w-1/5 h-1/5" />
                    <span>Windows</span>
                </CardContent>
            </Card>
            <Card className="w-1/5 aspect-square">
                <CardContent className="flex flex-col items-center justify-center w-full h-full">
                    <AppleLogo className="w-1/5 h-1/5" />
                    <span>Apple</span>
                </CardContent>
            </Card>
        </div>
    );
};

export default DownloadGame;
