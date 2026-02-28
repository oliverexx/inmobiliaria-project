import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    Users,
    Award,
    Shield,
    MapPin,
    Phone,
    Mail,
    Clock,
    ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import {
    AGENCY_NAME,
    AGENCY_PHONE,
    AGENCY_EMAIL,
    AGENCY_ADDRESS,
    getWhatsAppLink,
} from "@calzada/config";

export const metadata: Metadata = {
    title: "Nosotros — Quiénes Somos",
    description: `Conocé al equipo detrás de ${AGENCY_NAME}. Más de 15 años de experiencia en el mercado inmobiliario del sur bonaerense.`,
};

const TEAM = [
    {
        name: "Roberto Calzada",
        role: "Director",
        bio: "Más de 20 años de experiencia en bienes raíces. Especialista en inversiones inmobiliarias.",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    },
    {
        name: "Lucía Méndez",
        role: "Asesora Comercial",
        bio: "Experta en propiedades residenciales. Atención personalizada para encontrar tu hogar ideal.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    },
    {
        name: "Martín Torres",
        role: "Asesor de Alquileres",
        bio: "Especialista en alquileres y administración de propiedades. Te acompaña en cada paso.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
];

const VALUES = [
    {
        icon: Shield,
        title: "Confianza",
        desc: "Transparencia total en cada operación. Sin sorpresas ni costos ocultos.",
    },
    {
        icon: Users,
        title: "Cercanía",
        desc: "Atención humana y personalizada. Cada cliente es único para nosotros.",
    },
    {
        icon: Award,
        title: "Profesionalismo",
        desc: "Equipo capacitado con años de experiencia en el mercado inmobiliario.",
    },
];

export default function NosotrosPage() {
    return (
        <>
            <Header />

            <main className="bg-gray-50 min-h-screen">
                {/* Hero */}
                <section className="relative bg-neutral-900 py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Quiénes <span className="text-amber-400">Somos</span>
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
                            Tu inmobiliaria de confianza en Bahía Blanca y la zona
                            desde hace más de 15 años.
                        </p>
                    </div>
                </section>

                {/* Story */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Nuestra Historia
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {AGENCY_NAME} nació con el objetivo de ofrecer un
                                    servicio inmobiliario diferente: cercano, transparente
                                    y orientado a las necesidades reales de las personas.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Desde nuestros inicios en Bahía Blanca, fuimos creciendo
                                    hasta consolidarnos en las principales ciudades del sur
                                    bonaerense. Hoy contamos con un equipo de profesionales
                                    comprometidos con brindar la mejor experiencia.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Ya sea que busques comprar tu primera casa, invertir en
                                    un terreno o alquilar un departamento, estamos acá para
                                    acompañarte en cada paso del camino.
                                </p>
                            </div>
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                                    alt="Oficina de Calzada Inmobiliaria"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Nuestros Valores
                            </h2>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Los pilares que guían cada decisión que tomamos
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {VALUES.map((v) => (
                                <div
                                    key={v.title}
                                    className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100"
                                >
                                    <v.icon className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {v.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Nuestro Equipo
                            </h2>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Profesionales comprometidos con tu satisfacción
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {TEAM.map((member) => (
                                <div
                                    key={member.name}
                                    className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <Image
                                        src={member.avatar}
                                        alt={member.name}
                                        width={100}
                                        height={100}
                                        className="rounded-full mx-auto mb-4 object-cover w-24 h-24"
                                    />
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {member.name}
                                    </h3>
                                    <p className="text-amber-600 text-sm font-medium mb-2">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-500 text-sm">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 bg-neutral-900">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold text-white mb-8">
                            Visitanos o contactanos
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
                            <div className="text-center">
                                <MapPin className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                <p className="text-neutral-400 text-sm">{AGENCY_ADDRESS}</p>
                            </div>
                            <div className="text-center">
                                <Phone className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                <p className="text-neutral-400 text-sm">{AGENCY_PHONE}</p>
                            </div>
                            <div className="text-center">
                                <Mail className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                <p className="text-neutral-400 text-sm">{AGENCY_EMAIL}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                            >
                                💬 Hablar por WhatsApp
                            </a>
                            <Link
                                href="/propiedades"
                                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                            >
                                Ver propiedades
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <WhatsAppFloat />
        </>
    );
}
