'use client';

import { Card, CardHeader, Image, Button, CardFooter } from '@nextui-org/react';

export default function ShowDefault() {
    return (
        <div className="w-full gap-4 flex justify-between">
            <Card className="w-full h-[300px] dark">
                <CardHeader className="w-full absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
                    <h4 className="text-white font-medium text-large">Trending</h4>
                </CardHeader>
                {/* <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/logo.gif"
                /> */}
            </Card>

            <Card className="w-full h-[300px] dark">
                <CardHeader className="w-full absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
                    <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
                </CardHeader>
                {/* <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/avatar_default.jpg"
                /> */}
            </Card>

            <Card className="w-full h-[300px] dark">
                <CardHeader className="w-full absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
                    <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
                </CardHeader>
                {/* <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/icon.jpeg"
                /> */}
            </Card>
        </div>
    );
}