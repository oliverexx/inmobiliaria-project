"use client";

import { useState, useEffect, useCallback } from "react";
import type { PropertyWithTags } from "@/lib/queries";

const STORAGE_KEY = "calzada_compare_list";
const MAX_COMPARE = 4;

export function useCompare() {
    const [compareList, setCompareList] = useState<PropertyWithTags[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setCompareList(JSON.parse(stored));
            } catch (e) {
                console.error("Error parsing compare list", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
        }
    }, [compareList, isLoaded]);

    const addToCompare = useCallback((property: PropertyWithTags) => {
        setCompareList((prev) => {
            if (prev.find((p) => p.id === property.id)) return prev;
            if (prev.length >= MAX_COMPARE) {
                // Could show a toast here, but for now just don't add
                return prev;
            }
            return [...prev, property];
        });
    }, []);

    const removeFromCompare = useCallback((id: number) => {
        setCompareList((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const toggleCompare = useCallback((property: PropertyWithTags) => {
        setCompareList((prev) => {
            const exists = prev.find((p) => p.id === property.id);
            if (exists) {
                return prev.filter((p) => p.id !== property.id);
            }
            if (prev.length >= MAX_COMPARE) return prev;
            return [...prev, property];
        });
    }, []);

    const isInCompare = useCallback((id: number) => {
        return compareList.some((p) => p.id === id);
    }, [compareList]);

    const clearCompare = useCallback(() => {
        setCompareList([]);
    }, []);

    return {
        compareList,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        isFull: compareList.length >= MAX_COMPARE,
        count: compareList.length,
        isLoaded,
    };
}
