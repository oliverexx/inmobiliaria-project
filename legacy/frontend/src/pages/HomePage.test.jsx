import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
    it('renders the centered logo', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        const logo = screen.getByAltText('Calzada Inmobiliaria');
        expect(logo).toBeInTheDocument();
    });

    it('renders tagline and location text', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(screen.getByText(/Tu inmobiliaria de confianza/i)).toBeInTheDocument();
        expect(screen.getByText(/Bahía Blanca y la zona/i)).toBeInTheDocument();
    });

    it('renders CTA buttons for Sale and Rent', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(screen.getByText('Propiedades en Venta')).toBeInTheDocument();
        expect(screen.getByText('Alquileres')).toBeInTheDocument();
    });

    it('has correct links in the CTA buttons', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        const saleLink = screen.getByRole('link', { name: /Propiedades en Venta/i });
        const rentLink = screen.getByRole('link', { name: /Alquileres/i });

        expect(saleLink).toHaveAttribute('href', '/propiedades?operation=sale');
        expect(rentLink).toHaveAttribute('href', '/propiedades?operation=rent');
    });

    it('renders WhatsApp contact link', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(screen.getByText(/¿Tenés consultas\? Escribinos por WhatsApp/i)).toBeInTheDocument();
    });
});
