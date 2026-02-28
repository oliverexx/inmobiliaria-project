"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import clsx from "clsx";

export default function FavoritesHeaderBadge() {
    const { count } = useFavorites();

    return (
        <Link
            href="/favoritos"
            className={clsx(
                "relative flex items-center gap-1.5 text-gray-700 hover:text-red-500 transition-colors font-medium tracking-wide text-sm uppercase"
            )}
            aria-label={`Favoritos (${count})`}
        >
            <Heart
                className={clsx(
                    "w-5 h-5 transition-all",
                    count > 0 ? "fill-red-500 text-red-500" : ""
                )}
            />
            {count > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                    {count > 9 ? "9+" : count}
                </span>
            )}
        </Link>
    );
}
