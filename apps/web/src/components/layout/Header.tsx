"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Menu, X, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@calzada/config";
import FavoritesHeaderBadge from "@/components/layout/FavoritesHeaderBadge";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const whatsappLink = getWhatsAppLink();

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/propiedades?operation=sale", label: "Comprar" },
        { href: "/propiedades?operation=rent", label: "Alquilar" },
        { href: "/propiedades", label: "Propiedades" },
        { href: "/nosotros", label: "Nosotros" },
    ];

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.jpeg"
                            alt="Calzada Inmobiliaria"
                            width={200}
                            height={64}
                            className="h-16 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-black transition-colors font-medium tracking-wide text-sm uppercase"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Favorites */}
                        <FavoritesHeaderBadge />

                        {/* WhatsApp CTA */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-colors font-semibold text-sm shadow-sm"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Contáctanos
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav
                    className={clsx(
                        "md:hidden overflow-hidden transition-all duration-300",
                        mobileMenuOpen
                            ? "max-h-60 py-4 border-t border-gray-100"
                            : "max-h-0"
                    )}
                >
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-black font-medium uppercase text-sm tracking-wide"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-700 font-semibold text-sm"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Contáctanos por WhatsApp
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
