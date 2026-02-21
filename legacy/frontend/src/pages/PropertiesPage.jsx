import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyFilters from '../components/properties/PropertyFilters';
import { mockProperties } from '../data/properties';
import { Search, Building2 } from 'lucide-react';

const PropertiesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const operation = searchParams.get('operation') || '';
    const propertyType = searchParams.get('property_type') || '';
    const city = searchParams.get('city') || '';
    const search = searchParams.get('search') || '';
    const minPrice = searchParams.get('min_price') || '';
    const maxPrice = searchParams.get('max_price') || '';

    // Filter mock data based on current params
    const filteredProperties = useMemo(() => {
        return mockProperties.filter(p => {
            if (operation && p.operation !== operation) return false;
            if (propertyType && p.property_type !== propertyType) return false;
            if (city && p.city !== city) return false;
            if (minPrice && p.price < Number(minPrice)) return false;
            if (maxPrice && p.price > Number(maxPrice)) return false;
            if (search) {
                const q = search.toLowerCase();
                const searchable = `${p.title} ${p.address} ${p.city} ${p.description} ${p.tags.map(t => t.name).join(' ')}`.toLowerCase();
                if (!searchable.includes(q)) return false;
            }
            return true;
        });
    }, [operation, propertyType, city, search, minPrice, maxPrice]);

    const handleFilterChange = (filters) => {
        // Remove empty values
        const cleanFilters = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value) cleanFilters[key] = value;
        });
        setSearchParams(cleanFilters);
    };

    // Page title based on filter
    const pageTitle = operation === 'sale'
        ? 'Propiedades en Venta'
        : operation === 'rent'
            ? 'Propiedades en Alquiler'
            : 'Todas las Propiedades';

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Header */}
            <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-3">
                        <Building2 className="w-8 h-8 opacity-80" />
                        <h1 className="text-4xl font-bold">{pageTitle}</h1>
                    </div>
                    <p className="text-lg opacity-90">
                        {filteredProperties.length} propiedad{filteredProperties.length !== 1 ? 'es' : ''} encontrada{filteredProperties.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4">
                        <PropertyFilters
                            currentFilters={{ operation, property_type: propertyType, city, search, min_price: minPrice, max_price: maxPrice }}
                            onFilterChange={handleFilterChange}
                        />
                    </aside>

                    {/* Property Grid */}
                    <main className="lg:w-3/4">
                        {filteredProperties.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredProperties.map(property => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    No se encontraron propiedades
                                </h3>
                                <p className="text-gray-500">
                                    Intenta ajustar los filtros de búsqueda
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;