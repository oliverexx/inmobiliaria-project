"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import clsx from "clsx";

interface Testimonial {
    name: string;
    text: string;
    rating: number;
    role: string;
    avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        name: "María García",
        text: "Excelente atención desde el primer momento. Nos ayudaron a encontrar la casa perfecta para nuestra familia en menos de un mes. ¡Muy profesionales!",
        rating: 5,
        role: "Compradora en Bahía Blanca",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
        name: "Carlos Rodríguez",
        text: "Vendí mi departamento en tiempo récord gracias a su gestión. El equipo siempre estuvo disponible y me mantuvieron informado en cada paso del proceso.",
        rating: 5,
        role: "Vendedor en Bahía Blanca",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
        name: "Laura Martínez",
        text: "Alquilé mi primer departamento con ellos y la experiencia fue impecable. Me guiaron con todos los trámites y documentación necesaria.",
        rating: 5,
        role: "Inquilina en Monte Hermoso",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
        name: "Jorge Fernández",
        text: "Invertí en un terreno en Punta Alta siguiendo su recomendación. Hoy ese terreno vale el doble. Confío plenamente en su criterio profesional.",
        rating: 5,
        role: "Inversor en Punta Alta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
        name: "Ana Lucía Pérez",
        text: "Vendieron mi casa en menos de 3 semanas a un precio justo. La difusión que le dieron fue increíble. Sin dudas los volvería a elegir.",
        rating: 5,
        role: "Vendedora en Bahía Blanca",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={clsx(
                        "w-4 h-4",
                        i < count
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                    )}
                />
            ))}
        </div>
    );
}

export default function TestimonialCarousel() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const total = TESTIMONIALS.length;

    useEffect(() => {
        if (!isAutoPlaying) return;
        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isAutoPlaying, total]);

    const goTo = (index: number) => {
        setCurrent(index);
        setIsAutoPlaying(false);
        // Resume after 10s of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prev = () => goTo(current === 0 ? total - 1 : current - 1);
    const next = () => goTo((current + 1) % total);

    return (
        <section className="py-16 bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-neutral-400 max-w-lg mx-auto">
                        Historias reales de quienes confiaron en nosotros
                    </p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-amber-500/20 absolute -top-2 left-4 md:left-0" />

                    {/* Testimonial Card */}
                    <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-2xl p-8 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center">
                        <Stars count={TESTIMONIALS[current]!.rating} />

                        <p className="text-white/90 text-lg md:text-xl leading-relaxed mt-5 mb-6 italic">
                            &ldquo;{TESTIMONIALS[current]!.text}&rdquo;
                        </p>

                        <div className="flex items-center gap-3">
                            <Image
                                src={TESTIMONIALS[current]!.avatar}
                                alt={TESTIMONIALS[current]!.name}
                                width={48}
                                height={48}
                                className="rounded-full object-cover w-12 h-12"
                            />
                            <div className="text-left">
                                <p className="text-white font-semibold text-sm">
                                    {TESTIMONIALS[current]!.name}
                                </p>
                                <p className="text-neutral-400 text-xs">
                                    {TESTIMONIALS[current]!.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 text-white/50 hover:text-white transition-colors"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 text-white/50 hover:text-white transition-colors"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Testimonio ${i + 1}`}
                                className={clsx(
                                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                    current === i
                                        ? "bg-amber-500 w-6"
                                        : "bg-neutral-600 hover:bg-neutral-500"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
