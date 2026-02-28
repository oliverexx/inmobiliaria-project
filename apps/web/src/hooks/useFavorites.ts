"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "calzada-favorites";

function getFavs(): number[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([]);

    // Hydrate from localStorage
    useEffect(() => {
        setFavorites(getFavs());

        const handler = () => setFavorites(getFavs());
        window.addEventListener("favorites-updated", handler);
        return () => window.removeEventListener("favorites-updated", handler);
    }, []);

    const toggle = useCallback((id: number) => {
        setFavorites((prev) => {
            const next = prev.includes(id)
                ? prev.filter((fav) => fav !== id)
                : [...prev, id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            window.dispatchEvent(new Event("favorites-updated"));
            return next;
        });
    }, []);

    const isFavorite = useCallback(
        (id: number) => favorites.includes(id),
        [favorites]
    );

    const clear = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setFavorites([]);
        window.dispatchEvent(new Event("favorites-updated"));
    }, []);

    return { favorites, toggle, isFavorite, count: favorites.length, clear };
}
