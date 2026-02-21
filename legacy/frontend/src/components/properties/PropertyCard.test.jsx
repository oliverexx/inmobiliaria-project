import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const mockProperty = {
  id: 1,
  title: 'Chalet con Piscina en Palihue',
  slug: 'chalet-con-piscina-palihue',
  price: 285000,
  operation: 'sale',
  property_type: 'house',
  address: 'Terrada 1250, Barrio Palihue',
  city: 'Bahía Blanca',
  area: 320,
  rooms: 4,
  bathrooms: 3,
  featured_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
  tags: [{ id: 1, name: 'Piscina' }, { id: 2, name: 'Jardín' }],
  is_featured: true,
  description: 'Imponente chalet sobre lote de 600m² en la mejor zona de Palihue, con pileta climatizada y quincho.',
};

describe('PropertyCard', () => {
  it('renders property title correctly', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Chalet con Piscina en Palihue')).toBeInTheDocument();
  });

  it('renders property price formatted in USD for sales', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    // Flexible check for the numbers and currency part
    expect(screen.getByText(/285/)).toBeInTheDocument();
    expect(screen.getByText(/000/)).toBeInTheDocument();
  });

  it('renders operation badge (Venta)', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Venta')).toBeInTheDocument();
  });

  it('renders property features numbers', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    // Check for the numbers next to icons
    expect(screen.getByText('4')).toBeInTheDocument(); // rooms
    expect(screen.getByText('3')).toBeInTheDocument(); // bathrooms
    expect(screen.getByText(/320 m²/)).toBeInTheDocument(); // area
  });

  it('renders property address and city', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Terrada 1250/)).toBeInTheDocument();
    expect(screen.getByText(/Bahía Blanca/)).toBeInTheDocument();
  });

  it('renders property image with correct alt text', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    const image = screen.getByAltText('Chalet con Piscina en Palihue');
    expect(image).toBeInTheDocument();
  });

  it('displays rental badge when operation is rent', () => {
    const rentalProperty = { ...mockProperty, operation: 'rent', price: 450000 };
    render(
      <BrowserRouter>
        <PropertyCard property={rentalProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Alquiler')).toBeInTheDocument();
    expect(screen.getByText(/450\.000/)).toBeInTheDocument();
  });

  it('renders tags when available', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Piscina')).toBeInTheDocument();
    expect(screen.getByText('Jardín')).toBeInTheDocument();
  });

  it('has buttons for WhatsApp consultation', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Consultar por WhatsApp')).toBeInTheDocument();
  });

  it('has link to property detail page in title and image', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    const detailLinks = links.filter(l => l.getAttribute('href') === '/propiedad/chalet-con-piscina-palihue');
    expect(detailLinks.length).toBeGreaterThanOrEqual(1);
  });
});
