import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import {
    LayoutDashboard,
    Building2,
    MessageSquare,
    LogOut,
    ChevronRight,
} from "lucide-react";
import AdminLogoutButton from "./AdminLogoutButton";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    if (!session) redirect("/admin/login");

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/propiedades", label: "Propiedades", icon: Building2 },
        { href: "/admin/consultas", label: "Consultas", icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
                {/* Brand */}
                <div className="p-5 border-b border-gray-800">
                    <h1 className="text-lg font-bold text-white tracking-tight">
                        Calzada
                    </h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                        Panel de Gestión
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors group"
                        >
                            <item.icon className="w-4.5 h-4.5 text-gray-500 group-hover:text-amber-500 transition-colors" />
                            {item.label}
                            <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </nav>

                {/* User */}
                <div className="p-3 border-t border-gray-800">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-amber-500">
                                {session.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {session.name}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">
                                {session.email}
                            </p>
                        </div>
                    </div>
                    <AdminLogoutButton />
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
