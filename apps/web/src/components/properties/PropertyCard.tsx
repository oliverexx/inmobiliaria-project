import Link from "next/link";
import clsx from "clsx";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { PropertyWithTags } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { OPERATION_LABELS } from "@calzada/config";
import FavoriteButton from "@/components/properties/FavoriteButton";
import CardImageCarousel from "@/components/properties/CardImageCarousel";
import CompareButton from "@/components/properties/CompareButton";

interface PropertyCardProps {
    property: PropertyWithTags;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const operationLabel =
        OPERATION_LABELS[property.operation] ?? property.operation;
    const isRent = property.operation === "rent";

    return (
        <Link
            href={`/propiedad/${property.slug}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
            {/* Image Carousel */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <CardImageCarousel
                    images={[
                        ...(property.featuredImage ? [property.featuredImage] : []),
                        ...((property.gallery as string[]) ?? []),
                    ]}
                    title={property.title}
                />

                {/* Operation Badge */}
                <span
                    className={clsx(
                        "absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md",
                        isRent
                            ? "bg-blue-600 text-white"
                            : "bg-amber-500 text-white"
                    )}
                >
                    {operationLabel}
                </span>

                {/* Featured Badge */}
                {property.isFeatured && (
                    <span className="absolute top-3 right-14 px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg shadow-md z-[5]">
                        DESTACADA
                    </span>
                )}

                {/* Favorite Button */}
                <FavoriteButton propertyId={property.id} />

                {/* Compare Button */}
                <CompareButton property={property} />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                    <p className="text-xl font-bold text-gray-900">
                        {formatPrice(Number(property.price), property.operation)}
                    </p>
                    {isRent && property.rentalPrices && !property.rentalPrices.longTerm && (
                        <span className="text-[10px] text-amber-600 font-bold uppercase bg-amber-50 px-1.5 py-0.5 rounded leading-none">
                            T. Corto
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-700 mb-2 line-clamp-1">
                    {property.title}
                </h3>

                {/* Location */}
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="line-clamp-1">
                        {property.address}, {property.city}
                    </span>
                </p>

                {/* Features */}
                <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
                    {property.rooms > 0 && (
                        <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5" />
                            {property.rooms}
                        </span>
                    )}
                    {property.bathrooms > 0 && (
                        <span className="flex items-center gap-1">
                            <Bath className="w-3.5 h-3.5" />
                            {property.bathrooms}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5" />
                        {property.area} m²
                    </span>
                </div>
            </div>
        </Link>
    );
}
