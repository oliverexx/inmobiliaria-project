"use client";

import { Scale, Check, Plus } from "lucide-react";
import clsx from "clsx";
import { useCompare } from "@/hooks/useCompare";
import type { PropertyWithTags } from "@/lib/queries";

interface CompareButtonProps {
    property: PropertyWithTags;
    variant?: "card" | "detail";
}

export default function CompareButton({
    property,
    variant = "card",
}: CompareButtonProps) {
    const { toggleCompare, isInCompare, isFull, isLoaded } = useCompare();

    if (!isLoaded) return null;

    const active = isInCompare(property.id);

    if (variant === "detail") {
        return (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleCompare(property);
                }}
                disabled={!active && isFull}
                className={clsx(
                    "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all w-full border",
                    active
                        ? "bg-amber-100 border-amber-200 text-amber-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
                    !active && isFull && "opacity-50 cursor-not-allowed"
                )}
            >
                <Scale className={clsx("w-4 h-4", active && "fill-amber-700/10")} />
                {active ? "En comparador" : "Comparar propiedad"}
            </button>
        );
    }

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(property);
            }}
            disabled={!active && isFull}
            title={active ? "Quitar de comparar" : isFull ? "Comparador lleno" : "Agregar a comparar"}
            className={clsx(
                "absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-lg backdrop-blur-md transition-all z-[5]",
                active
                    ? "bg-amber-500 text-white shadow-lg"
                    : "bg-black/20 text-white hover:bg-black/40",
                !active && isFull && "opacity-50 cursor-not-allowed"
            )}
        >
            {active ? (
                <Check className="w-4 h-4" />
            ) : (
                <Scale className="w-4 h-4" />
            )}
        </button>
    );
}
