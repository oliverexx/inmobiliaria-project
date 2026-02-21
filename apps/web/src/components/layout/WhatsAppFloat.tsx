"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@calzada/config";

export default function WhatsAppFloat() {
    return (
        <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
        </a>
    );
}
