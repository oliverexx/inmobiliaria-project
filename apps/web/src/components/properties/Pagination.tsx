"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    total: number;
    pageSize: number;
}

export default function Pagination({ total, pageSize }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const goToPage = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            if (page <= 1) {
                params.delete("page");
            } else {
                params.set("page", String(page));
            }
            startTransition(() => {
                router.push(`/propiedades?${params.toString()}`);
            });
        },
        [searchParams, router]
    );

    if (totalPages <= 1) return null;

    // Generate page numbers to show
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push("ellipsis");

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - 2) pages.push("ellipsis");
        pages.push(totalPages);
    }

    return (
        <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Paginación">
            {/* Previous */}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1 || isPending}
                className={clsx(
                    "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors",
                    currentPage <= 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                )}
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Page Numbers */}
            {pages.map((page, i) =>
                page === "ellipsis" ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        disabled={isPending}
                        className={clsx(
                            "w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-all duration-200 font-medium",
                            page === currentPage
                                ? "bg-amber-500 text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages || isPending}
                className={clsx(
                    "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors",
                    currentPage >= totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                )}
            >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </nav>
    );
}
