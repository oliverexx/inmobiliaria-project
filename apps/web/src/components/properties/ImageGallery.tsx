"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [current, setCurrent] = useState(0);

    if (images.length === 0) return null;

    const open = (index: number) => {
        setCurrent(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const close = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "";
    };

    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    return (
        <>
            {/* Gallery Grid */}
            <div
                className={clsx(
                    "grid gap-2 rounded-xl overflow-hidden",
                    images.length === 1 && "grid-cols-1",
                    images.length === 2 && "grid-cols-2",
                    images.length >= 3 && "grid-cols-2 md:grid-cols-4"
                )}
            >
                {images.slice(0, 4).map((src, idx) => (
                    <button
                        key={idx}
                        onClick={() => open(idx)}
                        className={clsx(
                            "relative aspect-[4/3] overflow-hidden",
                            "hover:opacity-90 transition-opacity cursor-pointer",
                            idx === 0 && images.length >= 3 && "col-span-2 row-span-2"
                        )}
                    >
                        <Image
                            src={src}
                            alt={`${title} - Imagen ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes={
                                idx === 0
                                    ? "(max-width: 768px) 100vw, 50vw"
                                    : "(max-width: 768px) 50vw, 25vw"
                            }
                        />
                        {/* Show "+N" overlay on last image if there are more */}
                        {idx === 3 && images.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-xl font-bold">
                                    +{images.length - 4}
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                    {/* Close */}
                    <button
                        onClick={close}
                        className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
                        aria-label="Cerrar"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Prev */}
                    {images.length > 1 && (
                        <button
                            onClick={prev}
                            className="absolute left-4 text-white/70 hover:text-white z-10"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>
                    )}

                    {/* Image */}
                    <div className="relative w-full max-w-5xl aspect-video mx-4">
                        <Image
                            src={images[current]!}
                            alt={`${title} - Imagen ${current + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Next */}
                    {images.length > 1 && (
                        <button
                            onClick={next}
                            className="absolute right-4 text-white/70 hover:text-white z-10"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>
                    )}

                    {/* Counter */}
                    <div className="absolute bottom-4 text-white/50 text-sm">
                        {current + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}
