"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface CardImageCarouselProps {
    images: string[];
    title: string;
}

export default function CardImageCarousel({
    images,
    title,
}: CardImageCarouselProps) {
    const [current, setCurrent] = useState(0);
    const total = images.length;

    if (total === 0) {
        return (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                Sin imagen
            </div>
        );
    }

    const prev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrent((c) => (c === 0 ? total - 1 : c - 1));
    };

    const next = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrent((c) => (c === total - 1 ? 0 : c + 1));
    };

    return (
        <div className="relative w-full h-full group/carousel">
            <Image
                src={images[current]!}
                alt={`${title} - ${current + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {total > 1 && (
                <>
                    {/* Arrows — visible on hover */}
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm z-[5]"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm z-[5]"
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-[5]">
                        {images.slice(0, 5).map((_, i) => (
                            <span
                                key={i}
                                className={clsx(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                                    current === i
                                        ? "bg-white w-3"
                                        : "bg-white/50"
                                )}
                            />
                        ))}
                        {total > 5 && (
                            <span className="text-white text-[8px] ml-0.5 leading-none self-center">
                                +{total - 5}
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
