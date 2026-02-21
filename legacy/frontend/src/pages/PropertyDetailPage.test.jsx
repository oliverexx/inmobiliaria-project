import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyDetailPage from './PropertyDetailPage';

// Mock properties data if needed, but here it imports from ../data/properties
// For unit testing, it's better to render with a specific slug

describe('PropertyDetailPage', () => {
    it('renders property not found when slug is invalid', () => {
        render(
            <MemoryRouter initialEntries={['/propiedad/no-existe']}>
                <Routes>
                    <Route path="/propiedad/:slug" element={<PropertyDetailPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText(/Propiedad no encontrada/i)).toBeInTheDocument();
    });

    it('renders property details for a valid slug', () => {
        // Using the first mock property from data/properties: chalent-con-piscina-palihue
        render(
            <MemoryRouter initialEntries={['/propiedad/chalet-con-piscina-palihue']}>
                <Routes>
                    <Route path="/propiedad/:slug" element={<PropertyDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { level: 1, name: /Chalet con Piscina en Palihue/i })).toBeInTheDocument();
        expect(screen.getByText(/Terrada 1250/i)).toBeInTheDocument();
        expect(screen.getAllByText(/285/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/000/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Imponente chalet sobre lote de 600m²/i)).toBeInTheDocument();
    });

    it('renders features grid numbers', () => {
        render(
            <MemoryRouter initialEntries={['/propiedad/chalet-con-piscina-palihue']}>
                <Routes>
                    <Route path="/propiedad/:slug" element={<PropertyDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Use getAllByText as numbers appear in both grid and summary
        expect(screen.getAllByText('4').length).toBeGreaterThanOrEqual(1); // Hab
        expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1); // Baños
        expect(screen.getAllByText('320').length).toBeGreaterThanOrEqual(1); // m2
    });

    it('has WhatsApp and Call buttons', () => {
        render(
            <MemoryRouter initialEntries={['/propiedad/chalet-con-piscina-palihue']}>
                <Routes>
                    <Route path="/propiedad/:slug" element={<PropertyDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Consultar por WhatsApp')).toBeInTheDocument();
        expect(screen.getByText('Llamar a la inmobiliaria')).toBeInTheDocument();
    });

    it('renders descriptive tags', () => {
        render(
            <MemoryRouter initialEntries={['/propiedad/chalet-con-piscina-palihue']}>
                <Routes>
                    <Route path="/propiedad/:slug" element={<PropertyDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Piscina')).toBeInTheDocument();
        expect(screen.getByText('Jardín')).toBeInTheDocument();
    });
});
