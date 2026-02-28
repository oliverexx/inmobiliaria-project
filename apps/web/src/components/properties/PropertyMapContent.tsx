"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon in Leaflet + Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface PropertyMapContentProps {
    lat: number;
    lng: number;
    title: string;
    address: string;
}

export default function PropertyMapContent({
    lat,
    lng,
    title,
    address,
}: PropertyMapContentProps) {
    const position: [number, number] = [lat, lng];

    return (
        <div className="h-80 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm z-0">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup className="custom-popup">
                        <div className="p-1">
                            <p className="font-bold text-gray-900 text-sm leading-tight">{title}</p>
                            <p className="text-gray-500 text-xs mt-1">{address}</p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
