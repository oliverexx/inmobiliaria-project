import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { getProperties } from "@/lib/queries";
import { propertyCountText } from "@/lib/format";
import { OPERATION_LABELS } from "@calzada/config";

// ISR
export const revalidate = 60;

interface Props {
    searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata(
    { searchParams }: Props
): Promise<Metadata> {
    const params = await searchParams;
    const operation = params.operation;
    const city = params.city;

    let title = "Propiedades";
    if (operation && city) {
        title = `Propiedades en ${OPERATION_LABELS[operation] ?? operation} — ${city}`;
    } else if (operation) {
        title = `Propiedades en ${OPERATION_LABELS[operation] ?? operation}`;
    } else if (city) {
        title = `Propiedades en ${city}`;
    }

    return {
        title,
        description: `Explora las mejores propiedades ${operation ? `en ${OPERATION_LABELS[operation]?.toLowerCase() ?? operation}` : ""
            } ${city ? `en ${city}` : ""} con Calzada Inmobiliaria.`,
    };
}

async function PropertyGrid({ searchParams }: { searchParams: Record<string, string> }) {
    let result;
    try {
        result = await getProperties({
            operation: searchParams.operation,
            propertyType: searchParams.propertyType,
            city: searchParams.city,
            minPrice: searchParams.minPrice,
            maxPrice: searchParams.maxPrice,
            search: searchParams.search,
            sortBy: searchParams.sortBy,
        });
    } catch {
        // Database not available
        result = { properties: [], total: 0 };
    }

    const { properties, total } = result;

    if (properties.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                    No se encontraron propiedades con los filtros seleccionados.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                    Probá modificando los filtros para ver más resultados.
                </p>
            </div>
        );
    }

    return (
        <>
            <p className="text-sm text-gray-500 mb-4">
                {propertyCountText(total)}
            </p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </>
    );
}

export default async function PropiedadesPage({ searchParams }: Props) {
    const params = await searchParams;

    return (
        <>
            <Header />

            <main className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Propiedades</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Encontrá tu próximo hogar en Bahía Blanca y la zona
                        </p>
                    </div>

                    {/* Layout: Sidebar + Grid */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar Filters */}
                        <aside className="lg:w-72 flex-shrink-0">
                            <Suspense fallback={<div className="h-96 bg-white rounded-xl animate-pulse" />}>
                                <PropertyFilters />
                            </Suspense>
                        </aside>

                        {/* Properties Grid */}
                        <section className="flex-1">
                            <Suspense
                                fallback={
                                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
                                        ))}
                                    </div>
                                }
                            >
                                <PropertyGrid searchParams={params} />
                            </Suspense>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
            <WhatsAppFloat />
        </>
    );
}
