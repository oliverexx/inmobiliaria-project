import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyFilters from './PropertyFilters';

describe('PropertyFilters', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter inputs including City', () => {
    render(
      <PropertyFilters
        currentFilters={{}}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByLabelText(/Buscar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Operación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ciudad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Propiedad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Precio Mín/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Precio Máx/i)).toBeInTheDocument();
  });

  it('calls onFilterChange when apply button is clicked', () => {
    render(
      <PropertyFilters
        currentFilters={{}}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Ubicación/i);
    fireEvent.change(searchInput, { target: { value: 'Palihue' } });

    const applyButton = screen.getByText('Aplicar Filtros');
    fireEvent.click(applyButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'Palihue' })
    );
  });

  it('calls onFilterChange with city selected', () => {
    render(
      <PropertyFilters
        currentFilters={{}}
        onFilterChange={mockOnFilterChange}
      />
    );

    const citySelect = screen.getByLabelText(/Ciudad/i);
    fireEvent.change(citySelect, { target: { value: 'Monte Hermoso' } });

    const applyButton = screen.getByText('Aplicar Filtros');
    fireEvent.click(applyButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ city: 'Monte Hermoso' })
    );
  });

  it('clears filters when clear button is clicked', () => {
    render(
      <PropertyFilters
        currentFilters={{ operation: 'sale', city: 'Bahía Blanca' }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const clearButton = screen.getByText(/Limpiar/i);
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  it('displays current filter values', () => {
    render(
      <PropertyFilters
        currentFilters={{ operation: 'sale', search: 'Palihue', city: 'Bahía Blanca' }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const operationSelect = screen.getByLabelText(/Operación/i);
    expect(operationSelect).toHaveValue('sale');

    const searchInput = screen.getByLabelText(/Buscar/i);
    expect(searchInput).toHaveValue('Palihue');

    const citySelect = screen.getByLabelText(/Ciudad/i);
    expect(citySelect).toHaveValue('Bahía Blanca');
  });
});
