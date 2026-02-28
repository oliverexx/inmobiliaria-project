"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { useCompare } from "@/hooks/useCompare";
import { formatPrice } from "@/lib/format";
import { OPERATION_LABELS, PROPERTY_TYPE_LABELS } from "@calzada/config";
import { X, Scale, Bed, Bath, Maximize, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ComparePage() {
    const { compareList, removeFromCompare, clearCompare, isLoaded } = useCompare();

    if (!isLoaded) return null;

    if (compareList.length === 0) {
        return (
            <>
                <Header />
                <main className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-gray-50">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
                        <Scale className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu comparador está vacío</h1>
                        <p className="text-gray-500 mb-6">Agregá propiedades desde el listado para comparar sus características lado a lado.</p>
                        <Link
                            href="/propiedades"
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                            Ver propiedades
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="bg-gray-50 min-h-screen pb-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <Link
                                href="/propiedades"
                                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Volver a propiedades
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Comparar Propiedades</h1>
                        </div>
                        <button
                            onClick={clearCompare}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            Limpiar comparador
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[800px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="w-48 p-6 bg-gray-50/50 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Características
                                        </th>
                                        {compareList.map((p) => (
                                            <th key={p.id} className="p-4 relative min-w-[200px]">
                                                <button
                                                    onClick={() => removeFromCompare(p.id)}
                                                    className="absolute top-2 right-2 w-6 h-6 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                                <Link href={`/propiedad/${p.slug}`} className="block group">
                                                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                                                        <Image
                                                            src={p.featuredImage || "/placeholder.jpg"}
                                                            alt={p.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-amber-600 transition-colors">
                                                        {p.title}
                                                    </p>
                                                </Link>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {/* Price */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 font-semibold text-gray-700">Precio</td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6 text-lg font-bold text-amber-600">
                                                {formatPrice(Number(p.price), p.operation)}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Operation */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 font-semibold text-gray-700">Operación</td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6 text-gray-600 capitalize">
                                                {OPERATION_LABELS[p.operation] ?? p.operation}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Type */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 font-semibold text-gray-700">Tipo</td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6 text-gray-600 capitalize">
                                                {PROPERTY_TYPE_LABELS[p.propertyType] ?? p.propertyType}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Area */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 font-semibold text-gray-700">Superficie</td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Maximize className="w-4 h-4 text-gray-400" />
                                                    {p.area} m²
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Rooms */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 font-semibold text-gray-700">Ambientes</td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Bed className="w-4 h-4 text-gray-400" />
                                                    {p.rooms} {p.rooms === 1 ? 'Habitación' : 'Habitaciones'}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Bathrooms */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 font-semibold text-gray-700">Baños</td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Bath className="w-4 h-4 text-gray-400" />
                                                    {p.bathrooms} {p.bathrooms === 1 ? 'Baño' : 'Baños'}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Location */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 font-semibold text-gray-700">Ubicación</td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6 text-gray-600 text-sm">
                                                {p.city}, {p.address}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Actions */}
                                    <tr>
                                        <td className="p-6 bg-gray-50/50"></td>
                                        {compareList.map((p) => (
                                            <td key={p.id} className="p-6">
                                                <Link
                                                    href={`/propiedad/${p.slug}`}
                                                    className="block w-full text-center bg-gray-900 hover:bg-amber-500 text-white text-sm font-bold py-2 rounded-lg transition-colors"
                                                >
                                                    Ver ficha
                                                </Link>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFloat />
        </>
    );
}
