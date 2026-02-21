// ─── Agency Constants ───────────────────────────────────────────
// WhatsApp — formato: código de país + número, sin espacios ni guiones
export const WHATSAPP_NUMBER = "5492915277261";
export const AGENCY_NAME = "Calzada Inmobiliaria";
export const AGENCY_PHONE = "(0291) 400-0000";
export const AGENCY_EMAIL = "info@calzadainmobiliaria.com";
export const AGENCY_ADDRESS = "San Martín 350, Centro, Bahía Blanca";
export const AGENCY_DESCRIPTION =
    "Tu inmobiliaria de confianza en Bahía Blanca y la zona. Compra, venta y alquiler de propiedades con el mejor asesoramiento profesional.";

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://calzadainmobiliaria.com";

// ─── WhatsApp Link Helpers ──────────────────────────────────────
export function getWhatsAppLink(
    propertyTitle?: string,
    propertyOperation?: string
): string {
    if (propertyTitle && propertyOperation) {
        const operationLabel =
            propertyOperation === "rent" ? "alquiler" : "compra";
        const message = encodeURIComponent(
            `¡Hola! Vi en ${AGENCY_NAME} la propiedad "${propertyTitle}" para ${operationLabel}. ¿Podrían darme más información?`
        );
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    }

    const message = encodeURIComponent(
        "¡Hola! Me interesa conocer las propiedades disponibles. ¿Podrían ayudarme?"
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// ─── Operation / Property Type Labels ───────────────────────────
export const OPERATION_LABELS: Record<string, string> = {
    sale: "Venta",
    rent: "Alquiler",
};

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
    house: "Casa",
    apartment: "Departamento",
    office: "Oficina",
    commercial: "Local Comercial",
    land: "Terreno",
};

export const STATUS_LABELS: Record<string, string> = {
    draft: "Borrador",
    published: "Publicado",
    sold: "Vendido",
    rented: "Alquilado",
};

// ─── Cities ─────────────────────────────────────────────────────
export const CITIES = ["Bahía Blanca", "Monte Hermoso", "Punta Alta"] as const;
export type City = (typeof CITIES)[number];
