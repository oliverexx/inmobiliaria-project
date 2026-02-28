import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import PropertyCard from "@/components/properties/PropertyCard";
import HeroSearchBar from "@/components/home/HeroSearchBar";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import { getFeaturedProperties } from "@/lib/queries";
import {
    AGENCY_NAME,
    AGENCY_DESCRIPTION,
    getWhatsAppLink,
} from "@calzada/config";

import type { PropertyWithTags } from "@/lib/queries";

// ISR — regenerate every 60 seconds
export const revalidate = 60;

// Hero images for the carousel-like background
const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&h=900&fit=crop",
];

export default async function HomePage() {
    let featuredProperties: PropertyWithTags[];
    try {
        featuredProperties = await getFeaturedProperties();
    } catch {
        // Database not available (first run without seeding)
        featuredProperties = [];
    }

    return (
        <>
            <Header />

            {/* ─── Hero Section ─────────────────────────────────────────── */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <Image
                    src={HERO_IMAGES[0]!}
                    alt="Propiedad destacada"
                    fill
                    className="object-cover animate-slowZoom"
                    priority
                    sizes="100vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                {/* Content */}
                <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
                    {/* Logo */}
                    <div className="mb-8 animate-fadeIn">
                        <Image
                            src="/logo.jpeg"
                            alt={AGENCY_NAME}
                            width={280}
                            height={90}
                            className="mx-auto h-20 w-auto object-contain rounded-xl shadow-2xl bg-white/10 backdrop-blur-sm p-2"
                            priority
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeInUp drop-shadow-lg">
                        Tu próximo hogar
                        <br />
                        <span className="text-amber-400">te está esperando</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 mb-8 animate-fadeInUp max-w-xl mx-auto" style={{ animationDelay: "0.5s" }}>
                        {AGENCY_DESCRIPTION}
                    </p>

                    {/* Search Bar */}
                    <HeroSearchBar />
                </div>
            </section>

            {/* ─── Stats Bar ────────────────────────────────────────────── */}
            <section className="bg-neutral-900 py-8">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { value: "500+", label: "Propiedades gestionadas" },
                        { value: "3", label: "Ciudades" },
                        { value: "15+", label: "Años de experiencia" },
                        { value: "1000+", label: "Clientes satisfechos" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-3xl font-bold text-amber-400">{stat.value}</p>
                            <p className="text-sm text-neutral-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Featured Properties ──────────────────────────────────── */}
            {featuredProperties.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                Propiedades Destacadas
                            </h2>
                            <p className="text-gray-500 max-w-lg mx-auto">
                                Descubrí las mejores opciones seleccionadas por nuestro equipo
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link
                                href="/propiedades"
                                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                            >
                                Ver todas las propiedades
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Cities Section ───────────────────────────────────────── */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Nuestras Ciudades
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto">
                            Operamos en las principales ciudades del sur bonaerense
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                city: "Bahía Blanca",
                                image:
                                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
                                desc: "Centro neurálgico del sur bonaerense",
                            },
                            {
                                city: "Monte Hermoso",
                                image:
                                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
                                desc: "La única ciudad balnearia con playas al norte",
                            },
                            {
                                city: "Punta Alta",
                                image:
                                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
                                desc: "Ciudad portuaria con opciones accesibles",
                            },
                        ].map((item) => (
                            <Link
                                key={item.city}
                                href={`/propiedades?city=${encodeURIComponent(item.city)}`}
                                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.city}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-amber-400" />
                                        {item.city}
                                    </h3>
                                    <p className="text-sm text-white/70">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Testimonials ────────────────────────────────────────── */}
            <TestimonialCarousel />

            {/* ─── CTA Section ──────────────────────────────────────────── */}
            <section className="bg-amber-500 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        ¿Querés vender o alquilar tu propiedad?
                    </h2>
                    <p className="text-amber-100 text-lg mb-8 max-w-lg mx-auto">
                        Contactanos y te asesoramos sin compromiso
                    </p>
                    <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
                    >
                        <Phone className="w-5 h-5" />
                        Hablar con un asesor
                    </a>
                </div>
            </section>

            <Footer />
            <WhatsAppFloat />
        </>
    );
}
