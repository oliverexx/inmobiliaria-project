"use client";

import { Heart } from "lucide-react";
import clsx from "clsx";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    propertyId: number;
    className?: string;
    /** Show on cards with absolute positioning over the image */
    variant?: "card" | "detail";
}

export default function FavoriteButton({
    propertyId,
    className,
    variant = "card",
}: FavoriteButtonProps) {
    const { toggle, isFavorite } = useFavorites();
    const active = isFavorite(propertyId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(propertyId);
            }}
            aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
            className={clsx(
                "group/fav transition-all duration-200 rounded-full",
                variant === "card" &&
                "absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md",
                variant === "detail" &&
                "flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-4 py-3 text-sm font-medium w-full justify-center",
                className
            )}
        >
            <Heart
                className={clsx(
                    "transition-all duration-200",
                    variant === "card" ? "w-5 h-5" : "w-4 h-4",
                    active
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-gray-500 group-hover/fav:text-red-400"
                )}
            />
            {variant === "detail" && (
                <span>{active ? "Guardada en favoritos" : "Guardar en favoritos"}</span>
            )}
        </button>
    );
}
