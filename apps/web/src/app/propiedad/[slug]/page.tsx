import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    Bed,
    Bath,
    Maximize,
    MapPin,
    Calendar,
    Eye,
    ArrowLeft,
    MessageCircle,
    Share2,
    Tag,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ImageGallery from "@/components/properties/ImageGallery";
import InquiryForm from "@/components/properties/InquiryForm";
import PropertyCard from "@/components/properties/PropertyCard";
import FavoriteButton from "@/components/properties/FavoriteButton";
import MortgageCalculator from "@/components/properties/MortgageCalculator";
import PropertyMap from "@/components/properties/PropertyMap";
import CompareButton from "@/components/properties/CompareButton";
import {
    getPropertyBySlug,
    getRelatedProperties,
    incrementViews,
    getAllPropertySlugs,
    type PropertyWithTags,
} from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import {
    OPERATION_LABELS,
    PROPERTY_TYPE_LABELS,
    SITE_URL,
    getWhatsAppLink,
    RENTAL_PERIOD_LABELS,
} from "@calzada/config";

// ISR
export const revalidate = 60;

interface Props {
    params: Promise<{ slug: string }>;
}

// Pre-generate all property pages at build time
export async function generateStaticParams() {
    try {
        const slugs = await getAllPropertySlugs();
        return slugs.map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    let property;
    try {
        property = await getPropertyBySlug(slug);
    } catch {
        return { title: "Propiedad" };
    }

    if (!property) return { title: "Propiedad no encontrada" };

    const operationLabel =
        OPERATION_LABELS[property.operation] ?? property.operation;

    return {
        title: `${property.title} — ${operationLabel}`,
        description:
            property.metaDescription ??
            property.description.slice(0, 150),
        openGraph: {
            title: property.title,
            description: property.description.slice(0, 200),
            images: property.featuredImage
                ? [{ url: property.featuredImage, width: 1200, height: 630 }]
                : undefined,
            type: "article",
            url: `${SITE_URL}/propiedad/${property.slug}`,
        },
    };
}

export default async function PropertyDetailPage({ params }: Props) {
    const { slug } = await params;

    let property;
    try {
        property = await getPropertyBySlug(slug);
    } catch {
        notFound();
    }

    if (!property) notFound();

    // Increment views (fire-and-forget)
    incrementViews(slug).catch(() => { });

    // Get related properties
    let related: PropertyWithTags[];
    try {
        related = await getRelatedProperties(property.id, property.city);
    } catch {
        related = [];
    }

    const operationLabel =
        OPERATION_LABELS[property.operation] ?? property.operation;
    const typeLabel =
        PROPERTY_TYPE_LABELS[property.propertyType] ?? property.propertyType;
    const whatsappLink = getWhatsAppLink(property.title, property.operation);

    // Combine featured + gallery images
    const allImages = [
        ...(property.featuredImage ? [property.featuredImage] : []),
        ...(property.gallery ?? []),
    ];

    // JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: property.title,
        description: property.description,
        url: `${SITE_URL}/propiedad/${property.slug}`,
        image: property.featuredImage,
        offers: {
            "@type": "Offer",
            price: property.price,
            priceCurrency: property.operation === "rent" ? "ARS" : "USD",
            availability: "https://schema.org/InStock",
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: property.address,
            addressLocality: property.city,
            addressRegion: property.state ?? "Buenos Aires",
            addressCountry: "AR",
        },
        numberOfRooms: property.rooms,
        numberOfBathroomsTotal: property.bathrooms,
        floorSize: {
            "@type": "QuantitativeValue",
            value: property.area,
            unitCode: "MTK",
        },
    };

    return (
        <>
            <Header />

            <main className="bg-gray-50 min-h-screen">
                {/* JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <div className="container mx-auto px-4 py-6">
                    {/* Back link */}
                    <Link
                        href="/propiedades"
                        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a propiedades
                    </Link>

                    {/* Gallery */}
                    <ImageGallery images={allImages} title={property.title} />

                    {/* Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mt-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title + Price */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold uppercase">
                                        {operationLabel}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                        {typeLabel}
                                    </span>
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                    {property.title}
                                </h1>
                                <p className="text-3xl font-bold text-amber-600">
                                    {formatPrice(Number(property.price), property.operation)}
                                </p>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-gray-500">
                                <MapPin className="w-5 h-5 text-amber-500" />
                                <span>
                                    {property.address}, {property.city}
                                    {property.state ? `, ${property.state}` : ""}
                                </span>
                            </div>

                            {/* Key Features */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    {
                                        icon: Maximize,
                                        value: `${property.area} m²`,
                                        label: "Superficie",
                                    },
                                    ...(property.rooms > 0
                                        ? [
                                            {
                                                icon: Bed,
                                                value: String(property.rooms),
                                                label: property.rooms === 1 ? "Habitación" : "Habitaciones",
                                            },
                                        ]
                                        : []),
                                    ...(property.bathrooms > 0
                                        ? [
                                            {
                                                icon: Bath,
                                                value: String(property.bathrooms),
                                                label: property.bathrooms === 1 ? "Baño" : "Baños",
                                            },
                                        ]
                                        : []),
                                    ...(property.yearBuilt
                                        ? [
                                            {
                                                icon: Calendar,
                                                value: String(property.yearBuilt),
                                                label: "Año",
                                            },
                                        ]
                                        : []),
                                ].map((feat) => (
                                    <div
                                        key={feat.label}
                                        className="bg-white rounded-xl p-4 text-center border border-gray-100"
                                    >
                                        <feat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                        <p className="text-lg font-bold text-gray-900">
                                            {feat.value}
                                        </p>
                                        <p className="text-xs text-gray-500">{feat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Rental Pricing Table */}
                            {property.operation === "rent" && property.rentalPrices && (
                                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-amber-500" />
                                        Opciones de Alquiler
                                    </h2>
                                    <div className="overflow-hidden rounded-lg border border-gray-100">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                                                <tr>
                                                    <th className="px-4 py-3">Tipo de Estadía</th>
                                                    <th className="px-4 py-3 text-right">Precio</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {Object.entries(property.rentalPrices).map(([key, value]) => {
                                                    if (!value) return null;
                                                    return (
                                                        <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="px-4 py-3 font-medium text-gray-700 capitalize">
                                                                {RENTAL_PERIOD_LABELS[key as keyof typeof RENTAL_PERIOD_LABELS] || key}
                                                            </td>
                                                            <td className="px-4 py-3 text-right font-bold text-amber-600">
                                                                {new Intl.NumberFormat("es-AR", {
                                                                    style: "currency",
                                                                    currency: "ARS",
                                                                    maximumFractionDigits: 0,
                                                                }).format(value)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="mt-4 text-xs text-gray-400 italic">
                                        * Los precios pueden variar según temporada o disponibilidad. Consultar para más detalles.
                                    </p>
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-xl p-6 border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    Descripción
                                </h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </div>

                            {/* Map */}
                            {property.gpsLocation && (
                                <div className="bg-white rounded-xl p-6 border border-gray-100">
                                    <PropertyMap
                                        location={property.gpsLocation}
                                        title={property.title}
                                        address={property.address}
                                    />
                                </div>
                            )}

                            {/* Tags */}
                            {property.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    {property.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3.5 h-3.5" />
                                    {property.viewsCount} visitas
                                </span>
                                {property.publishedAt && (
                                    <span>
                                        Publicada el{" "}
                                        {new Date(property.publishedAt).toLocaleDateString("es-AR")}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            {/* WhatsApp CTA */}
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-4 font-semibold transition-colors shadow-sm w-full"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Consultar por WhatsApp
                            </a>

                            {/* Favorite */}
                            <FavoriteButton
                                propertyId={property.id}
                                variant="detail"
                            />

                            {/* Compare */}
                            <CompareButton
                                property={property}
                                variant="detail"
                            />

                            {/* Share */}
                            <button
                                onClick={undefined}
                                className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-4 py-3 text-sm font-medium transition-colors w-full"
                            >
                                <Share2 className="w-4 h-4" />
                                Compartir
                            </button>

                            {/* Inquiry Form */}
                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                <InquiryForm
                                    propertyId={property.id}
                                    propertyTitle={property.title}
                                    operation={property.operation}
                                    rentalPrices={property.rentalPrices}
                                />
                            </div>

                            {/* Mortgage Calculator — only for sales */}
                            {property.operation === "sale" && (
                                <MortgageCalculator
                                    propertyPrice={Number(property.price)}
                                    currency="USD"
                                />
                            )}
                        </aside>
                    </div>

                    {/* Related Properties */}
                    {related.length > 0 && (
                        <section className="mt-16 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Propiedades similares en {property.city}
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {related.map((rp) => (
                                    <PropertyCard key={rp.id} property={rp} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
            <WhatsAppFloat />
        </>
    );
}
