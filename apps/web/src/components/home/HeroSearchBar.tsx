"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Search, Home, Key, Building2, MapPin } from "lucide-react";
import { PROPERTY_TYPE_LABELS, CITIES } from "@calzada/config";

const OPERATION_TABS = [
    { value: "sale", label: "Comprar", icon: Home },
    { value: "rent", label: "Alquilar", icon: Key },
] as const;

export default function HeroSearchBar() {
    const router = useRouter();
    const [operation, setOperation] = useState<string>("sale");
    const [city, setCity] = useState<string>("");
    const [propertyType, setPropertyType] = useState<string>("");

    const handleSearch = useCallback(() => {
        const params = new URLSearchParams();
        if (operation) params.set("operation", operation);
        if (city) params.set("city", city);
        if (propertyType) params.set("propertyType", propertyType);
        router.push(`/propiedades?${params.toString()}`);
    }, [operation, city, propertyType, router]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleSearch();
        },
        [handleSearch]
    );

    return (
        <div className="w-full max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            {/* Operation Tabs */}
            <div className="flex">
                {OPERATION_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setOperation(tab.value)}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-t-xl transition-all duration-200",
                            operation === tab.value
                                ? "bg-white text-gray-900 shadow-sm"
                                : "bg-white/20 text-white/80 hover:bg-white/30 backdrop-blur-sm"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search Panel */}
            <div className="bg-white rounded-b-xl rounded-tr-xl shadow-2xl p-4">
                <div className="flex flex-col sm:flex-row gap-3" onKeyDown={handleKeyDown}>
                    {/* City Select */}
                    <div className="flex-1 relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 appearance-none bg-white cursor-pointer"
                        >
                            <option value="">Todas las ciudades</option>
                            {CITIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Property Type Select */}
                    <div className="flex-1 relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 appearance-none bg-white cursor-pointer"
                        >
                            <option value="">Todos los tipos</option>
                            {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
                    >
                        <Search className="w-4 h-4" />
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    );
}
