"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 mt-1 text-sm text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/5 transition-colors"
        >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
        </button>
    );
}
