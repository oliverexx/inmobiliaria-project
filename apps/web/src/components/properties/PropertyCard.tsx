import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { PropertyWithTags } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { OPERATION_LABELS } from "@calzada/config";

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
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                {property.featuredImage ? (
                    <Image
                        src={property.featuredImage}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        Sin imagen
                    </div>
                )}

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
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg shadow-md">
                        DESTACADA
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Price */}
                <p className="text-xl font-bold text-gray-900 mb-1">
                    {formatPrice(Number(property.price), property.operation)}
                </p>

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
