import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import {
    AGENCY_ADDRESS,
    AGENCY_PHONE,
    AGENCY_EMAIL,
    AGENCY_DESCRIPTION,
    getWhatsAppLink,
} from "@calzada/config";

export default function Footer() {
    const whatsappLink = getWhatsAppLink();

    return (
        <footer className="bg-neutral-900 text-neutral-400 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="mb-4">
                            <Image
                                src="/logo.jpeg"
                                alt="Calzada Inmobiliaria"
                                width={200}
                                height={64}
                                className="h-16 w-auto object-contain rounded-lg bg-white p-1"
                            />
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-500">
                            {AGENCY_DESCRIPTION}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                            Enlaces
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/propiedades?operation=sale"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    Propiedades en Venta
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/propiedades?operation=rent"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    Propiedades en Alquiler
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/propiedades"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    Todas las Propiedades
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                            Contacto
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>{AGENCY_ADDRESS}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>{AGENCY_PHONE}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>{AGENCY_EMAIL}</span>
                            </li>
                            <li>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Escribinos por WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-800 pt-6 text-center text-xs text-neutral-600">
                    <p>
                        © {new Date().getFullYear()} Calzada Inmobiliaria — Bahía Blanca.
                        Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
