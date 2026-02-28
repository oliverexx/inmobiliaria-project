import { db } from "@/db";
import { properties, users } from "@/db/schema";
import { count, sum, eq } from "drizzle-orm";
import { Building2, Eye, Users, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    // Fetch stats
    const [propCount] = await db.select({ value: count() }).from(properties);
    const [viewsTotal] = await db
        .select({ value: sum(properties.viewsCount) })
        .from(properties);
    const [agentCount] = await db
        .select({ value: count() })
        .from(users)
        .where(eq(users.role, "admin"));

    const stats = [
        {
            label: "Propiedades",
            value: propCount.value,
            icon: Building2,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            label: "Visitas Totales",
            value: Number(viewsTotal.value ?? 0).toLocaleString("es-AR"),
            icon: Eye,
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
        {
            label: "Agentes",
            value: agentCount.value,
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}
                            >
                                <stat.icon
                                    className={`w-6 h-6 ${stat.color}`}
                                />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-lg font-semibold text-white mb-4">
                Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                    href="/admin/propiedades/nueva"
                    className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 hover:bg-amber-500/20 transition-colors group"
                >
                    <Building2 className="w-5 h-5 text-amber-500" />
                    <div>
                        <p className="text-sm font-bold text-white">
                            Nueva Propiedad
                        </p>
                        <p className="text-xs text-gray-500">
                            Agregar una propiedad al sitio
                        </p>
                    </div>
                </a>
                <a
                    href="/admin/consultas"
                    className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 hover:bg-blue-500/20 transition-colors group"
                >
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <div>
                        <p className="text-sm font-bold text-white">
                            Ver Consultas
                        </p>
                        <p className="text-xs text-gray-500">
                            Revisar mensajes de clientes
                        </p>
                    </div>
                </a>
            </div>
        </div>
    );
}
