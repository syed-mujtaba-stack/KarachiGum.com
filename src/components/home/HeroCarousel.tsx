"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
    "/Hero/hero1.jpg",
    "/Hero/hero2.jpg",
    "/Hero/hero3.jpg",
    "/Hero/hero4.jpg",
];

export function HeroCarousel() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full z-0">
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Hero Background ${index + 1}`}
                        fill
                        className="object-cover object-center"
                        priority={index === 0}
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            ))}
        </div>
    );
}
