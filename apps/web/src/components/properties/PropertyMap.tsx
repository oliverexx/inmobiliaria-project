"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const PropertyMapContent = dynamic(
    () => import("./PropertyMapContent"),
    {
        ssr: false,
        loading: () => (
            <div className="h-80 w-full rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-3 border border-gray-100 animate-pulse">
                <MapPin className="w-8 h-8 text-gray-300" />
                <p className="text-gray-400 text-sm font-medium">Cargando mapa...</p>
            </div>
        ),
    }
);

interface PropertyMapProps {
    location: string | null;
    title: string;
    address: string;
}

export default function PropertyMap({ location, title, address }: PropertyMapProps) {
    if (!location) return null;

    // Parse "lat, lng" string
    const [latStr, lngStr] = location.split(",");
    const lat = parseFloat(latStr?.trim() ?? "0");
    const lng = parseFloat(lngStr?.trim() ?? "0");

    if (isNaN(lat) || isNaN(lng)) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                Ubicación
            </h2>
            <PropertyMapContent lat={lat} lng={lng} title={title} address={address} />
        </div>
    );
}
