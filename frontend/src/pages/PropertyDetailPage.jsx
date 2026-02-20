import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    MapPin, BedDouble, Bath, Maximize2, Tag, MessageCircle,
    ChevronLeft, ChevronRight, X, Share2, ArrowLeft, Home,
    Calendar, Building2, Car, Layers
} from 'lucide-react';
import { mockProperties, getWhatsAppLink, WHATSAPP_NUMBER } from '../data/properties';

const PropertyDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const property = useMemo(
        () => mockProperties.find(p => p.slug === slug),
        [slug]
    );

    if (!property) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Propiedad no encontrada</h2>
                    <p className="text-gray-500 mb-6">La propiedad que buscás no existe o fue removida.</p>
                    <Link
                        to="/propiedades"
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ver todas las propiedades
                    </Link>
                </div>
            </div>
        );
    }

    const {
        title, price, operation, property_type, address, city,
        featured_image, rooms, bathrooms, area, tags, description,
        is_featured
    } = property;

    // Build gallery from featured image + extra variations
    const gallery = property.gallery || [featured_image];

    const isRent = operation === 'rent';
    const formattedPrice = isRent
        ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)
        : new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
    const operationLabel = isRent ? 'Alquiler' : 'Venta';
    const priceLabel = isRent ? `${formattedPrice}/mes` : formattedPrice;

    const whatsappLink = getWhatsAppLink(title, operation);

    const propertyTypeLabels = {
        house: 'Casa',
        apartment: 'Departamento',
        office: 'Oficina',
        commercial: 'Local Comercial',
    };

    const nextImage = () => setCurrentImage(i => (i + 1) % gallery.length);
    const prevImage = () => setCurrentImage(i => (i - 1 + gallery.length) % gallery.length);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title, text: `${title} — ${operationLabel}`, url });
        } else {
            navigator.clipboard.writeText(url);
            alert('¡Link copiado al portapapeles!');
        }
    };

    // Related properties (same city & operation, excluding current)
    const related = useMemo(
        () => mockProperties
            .filter(p => p.id !== property.id && p.city === city)
            .slice(0, 3),
        [property.id, city]
    );

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/propiedades" className="hover:text-amber-700 transition-colors">Propiedades</Link>
                        <span>/</span>
                        <span className="text-gray-800 font-medium truncate">{title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4 text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column — Gallery + Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="relative rounded-2xl overflow-hidden bg-gray-200 group">
                            <img
                                src={gallery[currentImage]}
                                alt={`${title} - Imagen ${currentImage + 1}`}
                                className="w-full h-[450px] object-cover cursor-pointer transition-transform"
                                onClick={() => setLightboxOpen(true)}
                            />

                            {/* Operation Badge */}
                            <span className={`absolute top-4 left-4 ${isRent ? 'bg-emerald-600' : 'bg-neutral-800'} text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wide`}>
                                {operationLabel}
                            </span>

                            {/* Share Button */}
                            <button
                                onClick={handleShare}
                                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-sm transition-colors"
                                title="Compartir"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>

                            {/* Gallery Navigation */}
                            {gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {gallery.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentImage(i)}
                                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImage ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {gallery.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {gallery.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImage(i)}
                                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === currentImage ? 'border-amber-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'}`}
                                    >
                                        <img src={img} alt={`Miniatura ${i + 1}`} className="w-20 h-14 object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Title & Location */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                            <div className="flex items-center gap-2 text-gray-500">
                                <MapPin className="w-5 h-5 text-amber-600" />
                                <span className="text-lg">{address}, {city}</span>
                            </div>
                        </div>

                        {/* Key Features Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {rooms > 0 && (
                                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                    <BedDouble className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                                    <p className="text-2xl font-bold text-gray-800">{rooms}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Habitaciones</p>
                                </div>
                            )}
                            {bathrooms > 0 && (
                                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                    <Bath className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                                    <p className="text-2xl font-bold text-gray-800">{bathrooms}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Baños</p>
                                </div>
                            )}
                            {area > 0 && (
                                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                    <Maximize2 className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                                    <p className="text-2xl font-bold text-gray-800">{area}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">m² totales</p>
                                </div>
                            )}
                            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                <Building2 className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                                <p className="text-lg font-bold text-gray-800">{propertyTypeLabels[property_type] || property_type}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Tipo</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Descripción</h2>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {description}
                            </p>
                        </div>

                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">Características</h2>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <span
                                            key={tag.id}
                                            className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-sm px-3 py-1.5 rounded-full font-medium"
                                        >
                                            <Tag className="w-3.5 h-3.5" />
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column — Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Price Card */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">{operationLabel}</p>
                                <p className="text-3xl font-bold text-gray-900">{priceLabel}</p>
                                {isRent && (
                                    <p className="text-xs text-gray-400 mt-1">Precio mensual — consultar por expensas</p>
                                )}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Consultar por WhatsApp
                            </a>

                            {/* Phone CTA */}
                            <a
                                href={`tel:+${WHATSAPP_NUMBER}`}
                                className="flex items-center justify-center gap-3 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-4 rounded-xl transition-colors duration-200 text-lg"
                            >
                                <Home className="w-5 h-5" />
                                Llamar a la inmobiliaria
                            </a>

                            {/* Property Summary */}
                            <div className="bg-neutral-900 text-white rounded-xl p-6">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-amber-400 mb-3">Resumen</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Tipo</span>
                                        <span className="font-medium">{propertyTypeLabels[property_type]}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Operación</span>
                                        <span className="font-medium">{operationLabel}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Ciudad</span>
                                        <span className="font-medium">{city}</span>
                                    </div>
                                    {area > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Superficie</span>
                                            <span className="font-medium">{area} m²</span>
                                        </div>
                                    )}
                                    {rooms > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Habitaciones</span>
                                            <span className="font-medium">{rooms}</span>
                                        </div>
                                    )}
                                    {bathrooms > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Baños</span>
                                            <span className="font-medium">{bathrooms}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Properties */}
                {related.length > 0 && (
                    <section className="mt-16 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Otras propiedades en {city}</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {related.map(p => {
                                const relIsRent = p.operation === 'rent';
                                const relPrice = relIsRent
                                    ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(p.price) + '/mes'
                                    : new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.price);

                                return (
                                    <Link
                                        key={p.id}
                                        to={`/propiedad/${p.slug}`}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
                                    >
                                        <div className="relative">
                                            <img src={p.featured_image} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <span className={`absolute top-2 left-2 ${relIsRent ? 'bg-emerald-600' : 'bg-neutral-800'} text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase`}>
                                                {relIsRent ? 'Alquiler' : 'Venta'}
                                            </span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-amber-700 transition-colors">{p.title}</h3>
                                            <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />{p.address}
                                            </p>
                                            <p className="font-bold text-gray-900">{relPrice}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <img
                        src={gallery[currentImage]}
                        alt={title}
                        className="max-w-[90vw] max-h-[85vh] object-contain"
                        onClick={e => e.stopPropagation()}
                    />

                    {gallery.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-4 text-white/60 text-sm">
                        {currentImage + 1} / {gallery.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetailPage;
