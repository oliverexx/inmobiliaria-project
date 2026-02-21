"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import clsx from "clsx";
import { Search, Filter } from "lucide-react";
import { OPERATION_LABELS, PROPERTY_TYPE_LABELS, CITIES } from "@calzada/config";

interface FilterState {
    operation: string;
    propertyType: string;
    city: string;
    minPrice: string;
    maxPrice: string;
    search: string;
}

export default function PropertyFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const current: FilterState = {
        operation: searchParams.get("operation") ?? "",
        propertyType: searchParams.get("propertyType") ?? "",
        city: searchParams.get("city") ?? "",
        minPrice: searchParams.get("minPrice") ?? "",
        maxPrice: searchParams.get("maxPrice") ?? "",
        search: searchParams.get("search") ?? "",
    };

    const updateFilter = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            startTransition(() => {
                router.push(`/propiedades?${params.toString()}`);
            });
        },
        [searchParams, router]
    );

    const clearFilters = useCallback(() => {
        startTransition(() => {
            router.push("/propiedades");
        });
    }, [router]);

    const hasFilters = Object.values(current).some(Boolean);

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <Filter className="w-4 h-4 text-amber-500" />
                    Filtros
                </h3>
                {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {/* Search */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Buscar
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={current.search}
                            onChange={(e) => updateFilter("search", e.target.value)}
                            placeholder="Título, ubicación..."
                            className={clsx(
                                "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm pl-9",
                                "focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400",
                                "placeholder:text-gray-400"
                            )}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </div>

                {/* Operation */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Operación
                    </label>
                    <select
                        value={current.operation}
                        onChange={(e) => updateFilter("operation", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                    >
                        <option value="">Todas</option>
                        {Object.entries(OPERATION_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Property Type */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Tipo
                    </label>
                    <select
                        value={current.propertyType}
                        onChange={(e) => updateFilter("propertyType", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                    >
                        <option value="">Todos</option>
                        {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Ciudad
                    </label>
                    <select
                        value={current.city}
                        onChange={(e) => updateFilter("city", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                    >
                        <option value="">Todas</option>
                        {CITIES.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Precio min.
                        </label>
                        <input
                            type="number"
                            value={current.minPrice}
                            onChange={(e) => updateFilter("minPrice", e.target.value)}
                            placeholder="0"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Precio máx.
                        </label>
                        <input
                            type="number"
                            value={current.maxPrice}
                            onChange={(e) => updateFilter("maxPrice", e.target.value)}
                            placeholder="∞"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                        />
                    </div>
                </div>
            </div>

            {/* Loading indicator */}
            {isPending && (
                <div className="mt-3 text-center">
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-r-transparent" />
                </div>
            )}
        </div>
    );
}
