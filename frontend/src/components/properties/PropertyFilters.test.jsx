import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyFilters from './PropertyFilters';

describe('PropertyFilters', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter inputs', () => {
    render(
      <PropertyFilters
        currentFilters={{}}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByLabelText(/Buscar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Operación/i)).toBeInTheDocument();
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
    fireEvent.change(searchInput, { target: { value: 'Madrid' } });

    const applyButton = screen.getByText('Aplicar Filtros');
    fireEvent.click(applyButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'Madrid' })
    );
  });

  it('clears filters when clear button is clicked', () => {
    render(
      <PropertyFilters
        currentFilters={{ operation: 'sale' }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const clearButton = screen.getByText(/Limpiar/i);
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({});
  });

  it('displays current filter values', () => {
    render(
      <PropertyFilters
        currentFilters={{ operation: 'sale', search: 'Barcelona' }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const operationSelect = screen.getByLabelText(/Operación/i);
    expect(operationSelect).toHaveValue('sale');

    const searchInput = screen.getByLabelText(/Buscar/i);
    expect(searchInput).toHaveValue('Barcelona');
  });
});
