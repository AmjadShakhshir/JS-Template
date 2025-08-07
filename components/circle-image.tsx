"use client"

import Image from 'next/image'

const CircleImage = () => {
    return (
        <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
            <Image src="/fallback/project-placeholder.svg" width="300" height="300" className="w-full h-full opacity-20" alt="Decorative circles" />
        </div>

    );
}

export default CircleImage;
