import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CompareFloatingBadge from "@/components/properties/CompareFloatingBadge";
import {
    AGENCY_NAME,
    AGENCY_DESCRIPTION,
    SITE_URL,
} from "@calzada/config";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${AGENCY_NAME} — Inmobiliaria en Bahía Blanca`,
        template: `%s | ${AGENCY_NAME}`,
    },
    description: AGENCY_DESCRIPTION,
    keywords: [
        "inmobiliaria",
        "Bahía Blanca",
        "propiedades",
        "casas en venta",
        "departamentos en alquiler",
        "Monte Hermoso",
        "Punta Alta",
        AGENCY_NAME,
    ],
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: SITE_URL,
        siteName: AGENCY_NAME,
        title: `${AGENCY_NAME} — Inmobiliaria en Bahía Blanca`,
        description: AGENCY_DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: `${AGENCY_NAME} — Inmobiliaria en Bahía Blanca`,
        description: AGENCY_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // JSON-LD Organization
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: AGENCY_NAME,
        description: AGENCY_DESCRIPTION,
        url: SITE_URL,
        telephone: "+5492915277261",
        address: {
            "@type": "PostalAddress",
            streetAddress: "San Martín 350",
            addressLocality: "Bahía Blanca",
            addressRegion: "Buenos Aires",
            addressCountry: "AR",
        },
        areaServed: [
            { "@type": "City", name: "Bahía Blanca" },
            { "@type": "City", name: "Monte Hermoso" },
            { "@type": "City", name: "Punta Alta" },
        ],
    };

    return (
        <html lang="es">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
                <CompareFloatingBadge />
            </body>
        </html>
    );
}
