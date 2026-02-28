"use client";

import { useEffect, useState } from "react";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import PropertyCard from "@/components/properties/PropertyCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { PropertyWithTags } from "@/lib/queries";

export default function FavoritosPage() {
    const { favorites, clear, count } = useFavorites();
    const [properties, setProperties] = useState<PropertyWithTags[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (favorites.length === 0) {
            setProperties([]);
            setLoading(false);
            return;
        }

        async function fetchFavorites() {
            try {
                const params = new URLSearchParams();
                favorites.forEach((id) => params.append("ids", String(id)));
                const res = await fetch(`/api/favorites?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setProperties(data.properties);
                }
            } catch {
                setProperties([]);
            } finally {
                setLoading(false);
            }
        }

        fetchFavorites();
    }, [favorites]);

    return (
        <>
            <Header />

            <main className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Link
                                href="/propiedades"
                                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Volver a propiedades
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                                Mis Favoritos
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                {count === 0
                                    ? "Aún no guardaste ninguna propiedad"
                                    : `${count} ${count === 1 ? "propiedad guardada" : "propiedades guardadas"}`}
                            </p>
                        </div>

                        {count > 0 && (
                            <button
                                onClick={clear}
                                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors border border-gray-200 hover:border-red-200 rounded-lg px-3 py-2"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Limpiar todo
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
                            ))}
                        </div>
                    ) : properties.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                No tenés favoritos aún
                            </h2>
                            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                                Explorá nuestras propiedades y tocá el corazón
                                para guardar las que más te gusten.
                            </p>
                            <Link
                                href="/propiedades"
                                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                            >
                                Ver propiedades
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <WhatsAppFloat />
        </>
    );
}
