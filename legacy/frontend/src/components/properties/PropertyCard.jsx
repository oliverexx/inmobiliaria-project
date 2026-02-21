import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize2, Tag, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/properties';

const PropertyCard = ({ property }) => {
    const {
        title,
        slug,
        price,
        operation,
        address,
        featured_image,
        rooms,
        bathrooms,
        area,
        tags,
        city,
        description,
    } = property;

    const isRent = operation === 'rent';

    const formattedPrice = isRent
        ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)
        : new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

    const operationLabel = isRent ? 'Alquiler' : 'Venta';
    const operationColor = isRent ? 'bg-emerald-600' : 'bg-neutral-800';
    const priceLabel = isRent ? `${formattedPrice}/mes` : formattedPrice;

    const whatsappLink = getWhatsAppLink(title, operation);

    return (
        <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
            {/* Image — clickable to detail */}
            <Link to={`/propiedad/${slug}`} className="relative overflow-hidden block">
                <img
                    src={featured_image}
                    alt={title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <span className={`absolute top-3 left-3 ${operationColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                    {operationLabel}
                </span>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-lg font-bold px-3 py-1 rounded-lg">
                    {priceLabel}
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <Link to={`/propiedad/${slug}`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors">
                        {title}
                    </h3>
                </Link>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{address}{city ? `, ${city}` : ''}</span>
                </div>

                {description && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
                )}

                {/* Features */}
                <div className="flex items-center gap-4 text-gray-600 text-sm mb-3 border-t border-gray-100 pt-3">
                    {rooms > 0 && (
                        <div className="flex items-center gap-1" title="Habitaciones">
                            <BedDouble className="w-4 h-4" />
                            <span>{rooms}</span>
                        </div>
                    )}
                    {bathrooms > 0 && (
                        <div className="flex items-center gap-1" title="Baños">
                            <Bath className="w-4 h-4" />
                            <span>{bathrooms}</span>
                        </div>
                    )}
                    {area > 0 && (
                        <div className="flex items-center gap-1" title="Área">
                            <Maximize2 className="w-4 h-4" />
                            <span>{area} m²</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.map(tag => (
                            <span
                                key={tag.id}
                                className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full"
                            >
                                <Tag className="w-3 h-3" />
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* WhatsApp Button — pushed to bottom */}
                <div className="mt-auto pt-2">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Consultar por WhatsApp
                    </a>
                </div>
            </div>
        </article>
    );
};

export default PropertyCard;
