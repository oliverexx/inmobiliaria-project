"use client";

import { Scale, X } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function CompareFloatingBadge() {
    const { count, isLoaded } = useCompare();
    const pathname = usePathname();

    if (!isLoaded || count === 0 || pathname === "/comparar") return null;

    return (
        <Link
            href="/comparar"
            className={clsx(
                "fixed bottom-24 right-6 z-40 group flex items-center gap-3 bg-white border border-gray-200 shadow-xl rounded-full pl-4 pr-1 py-1 transition-all duration-300 hover:border-amber-400",
                "animate-fadeInUp"
            )}
        >
            <span className="text-sm font-bold text-gray-700">
                Comparar <span className="text-amber-600">({count})</span>
            </span>
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-sm group-hover:bg-amber-600 transition-colors">
                <Scale className="w-5 h-5" />
            </div>
        </Link>
    );
}
