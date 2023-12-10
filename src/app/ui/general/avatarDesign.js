'use client'

import { NextUIProvider, Avatar } from "@nextui-org/react";

export default function AvatarDesign({ path, size }) {
    return (
        <NextUIProvider className="flex justify-center items-center border-2 border-gray-500 p-0.5 rounded-2xl">
            <Avatar radius='lg' src={path || "/avatar_default.jpg"} size={size || "md"} />
        </NextUIProvider>
    )
}