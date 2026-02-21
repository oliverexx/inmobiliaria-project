import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const PropertyFilters = ({ currentFilters, onFilterChange }) => {
    const [filters, setFilters] = useState({
        operation: currentFilters.operation || '',
        property_type: currentFilters.property_type || '',
        city: currentFilters.city || '',
        search: currentFilters.search || '',
        min_price: '',
        max_price: '',
        min_rooms: '',
        min_bathrooms: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== '')
        );
        onFilterChange(activeFilters);
    };

    const clearFilters = () => {
        setFilters({
            operation: '',
            property_type: '',
            city: '',
            search: '',
            min_price: '',
            max_price: '',
            min_rooms: '',
            min_bathrooms: '',
        });
        onFilterChange({});
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtros
                </h2>
                <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                    <X className="w-4 h-4" />
                    Limpiar
                </button>
            </div>

            <div className="space-y-4">
                {/* Búsqueda */}
                <div>
                    <label htmlFor="filter-search" className="block text-sm font-medium text-gray-700 mb-1">
                        Buscar
                    </label>
                    <input
                        id="filter-search"
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Ubicación, características..."
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </div>

                {/* Operación */}
                <div>
                    <label htmlFor="filter-operation" className="block text-sm font-medium text-gray-700 mb-1">
                        Operación
                    </label>
                    <select
                        id="filter-operation"
                        name="operation"
                        value={filters.operation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        <option value="">Todas</option>
                        <option value="sale">Venta</option>
                        <option value="rent">Alquiler</option>
                    </select>
                </div>

                {/* Ciudad */}
                <div>
                    <label htmlFor="filter-city" className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad
                    </label>
                    <select
                        id="filter-city"
                        name="city"
                        value={filters.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        <option value="">Todas</option>
                        <option value="Bahía Blanca">Bahía Blanca</option>
                        <option value="Monte Hermoso">Monte Hermoso</option>
                        <option value="Punta Alta">Punta Alta</option>
                    </select>
                </div>

                {/* Tipo de Propiedad */}
                <div>
                    <label htmlFor="filter-property-type" className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Propiedad
                    </label>
                    <select
                        id="filter-property-type"
                        name="property_type"
                        value={filters.property_type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        <option value="">Todos</option>
                        <option value="house">Casa</option>
                        <option value="apartment">Departamento</option>
                        <option value="office">Oficina</option>
                        <option value="commercial">Local Comercial</option>
                    </select>
                </div>

                {/* Precio */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="filter-min-price" className="block text-sm font-medium text-gray-700 mb-1">
                            Precio Mín
                        </label>
                        <input
                            id="filter-min-price"
                            type="number"
                            name="min_price"
                            value={filters.min_price}
                            onChange={handleChange}
                            placeholder="$"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="filter-max-price" className="block text-sm font-medium text-gray-700 mb-1">
                            Precio Máx
                        </label>
                        <input
                            id="filter-max-price"
                            type="number"
                            name="max_price"
                            value={filters.max_price}
                            onChange={handleChange}
                            placeholder="$"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                </div>

                {/* Habitaciones */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Habitaciones Mín
                    </label>
                    <select
                        name="min_rooms"
                        value={filters.min_rooms}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        <option value="">Cualquiera</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>

                {/* Baños */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Baños Mín
                    </label>
                    <select
                        name="min_bathrooms"
                        value={filters.min_bathrooms}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        <option value="">Cualquiera</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                    </select>
                </div>

                {/* Botón Aplicar */}
                <button
                    onClick={applyFilters}
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors font-semibold"
                >
                    Aplicar Filtros
                </button>
            </div>
        </div>
    );
};

export default PropertyFilters;