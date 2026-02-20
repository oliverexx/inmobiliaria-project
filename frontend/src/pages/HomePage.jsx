import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/properties';

const heroImages = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1499793983394-12dec4a33a4f?w=1920&h=1080&fit=crop',
];

const HomePage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImage(prev => (prev + 1) % heroImages.length);
                setIsTransitioning(false);
            }, 1000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Preload images
    useEffect(() => {
        heroImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Me interesa conocer las propiedades disponibles. ¿Podrían ayudarme?')}`;

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Images */}
            {heroImages.map((img, index) => (
                <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
                    style={{
                        opacity: index === currentImage && !isTransitioning ? 1 : 0,
                        zIndex: index === currentImage ? 1 : 0,
                    }}
                >
                    <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover scale-105"
                        style={{
                            animation: index === currentImage ? 'slowZoom 8s ease-in-out forwards' : 'none',
                        }}
                    />
                </div>
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55 z-10" />

            {/* Content */}
            <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
                {/* Logo */}
                <div className="mb-8 animate-fadeIn">
                    <img
                        src="/logo.jpeg"
                        alt="Calzada Inmobiliaria"
                        className="w-64 md:w-80 lg:w-96 object-contain rounded-2xl shadow-2xl bg-white/95 p-4"
                    />
                </div>

                {/* Tagline */}
                <p className="text-white/90 text-lg md:text-xl lg:text-2xl text-center mb-2 font-light tracking-wide animate-fadeInUp">
                    Tu inmobiliaria de confianza en
                </p>
                <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 animate-fadeInUp tracking-tight">
                    Bahía Blanca y la zona
                </h2>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp">
                    <Link
                        to="/propiedades?operation=sale"
                        className="flex items-center justify-center gap-2 bg-white text-neutral-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        Propiedades en Venta
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        to="/propiedades?operation=rent"
                        className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    >
                        Alquileres
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* WhatsApp Floating */}
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center gap-2 text-white/80 hover:text-green-400 transition-colors text-sm font-medium animate-fadeInUp"
                >
                    <MessageCircle className="w-5 h-5" />
                    ¿Tenés consultas? Escribinos por WhatsApp
                </a>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
                        <div className="w-1.5 h-2.5 bg-white/60 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes slowZoom {
                    0% { transform: scale(1.05); }
                    100% { transform: scale(1.15); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1); }
                }
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 1.2s ease-out forwards;
                }
                .animate-fadeInUp {
                    animation: fadeInUp 1s ease-out forwards;
                    animation-delay: 0.3s;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default HomePage;
