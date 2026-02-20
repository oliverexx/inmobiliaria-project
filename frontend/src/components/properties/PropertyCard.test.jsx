import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const mockProperty = {
  id: 1,
  title: 'Casa Moderna en Centro',
  slug: 'casa-moderna-en-centro',
  price: 250000,
  operation: 'sale',
  address: 'Av. Principal 123, Ciudad',
  area: 150,
  rooms: 3,
  bathrooms: 2,
  featured_image: '/test-property.jpg',
  tags: [
    { id: 1, name: 'Piscina' },
    { id: 2, name: 'Garaje' },
  ],
};

describe('PropertyCard', () => {
  it('renders property title correctly', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Casa Moderna en Centro')).toBeInTheDocument();
  });

  it('renders property price formatted', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('$250,000')).toBeInTheDocument();
  });

  it('renders operation badge (Venta)', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Venta')).toBeInTheDocument();
  });

  it('renders property features (rooms, bathrooms, area)', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('3 hab')).toBeInTheDocument();
    expect(screen.getByText('2 baños')).toBeInTheDocument();
    expect(screen.getByText('150 m²')).toBeInTheDocument();
  });

  it('renders property address', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Av. Principal 123, Ciudad')).toBeInTheDocument();
  });

  it('renders property image with correct alt text', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    const image = screen.getByAltText('Casa Moderna en Centro');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-property.jpg');
  });

  it('displays rental badge when operation is rent', () => {
    const rentalProperty = { ...mockProperty, operation: 'rent' };
    render(
      <BrowserRouter>
        <PropertyCard property={rentalProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Alquiler')).toBeInTheDocument();
  });

  it('renders tags when available', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    expect(screen.getByText('Piscina')).toBeInTheDocument();
    expect(screen.getByText('Garaje')).toBeInTheDocument();
  });

  it('has link to property detail page', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: /Casa Moderna en Centro/i });
    expect(link).toHaveAttribute('href', '/propiedad/casa-moderna-en-centro');
  });
});
