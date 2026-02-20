import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '../../../context/AuthContext';
import InquiryForm from '../../inquieries/InquiryForm';
import { propertyService } from '../../../services/propertyService';

// Mock del servicio
vi.mock('../../../services/propertyService', () => ({
  propertyService: {
    createInquiry: vi.fn(),
  },
}));

const mockAuthContext = {
  isAuthenticated: true,
  user: {
    username: 'testuser',
    email: 'test@example.com',
  },
};

describe('InquiryForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <InquiryForm propertySlug="test-property" />
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(screen.getByText('Enviar Consulta')).toBeInTheDocument();
  });

  it('pre-fills user data from context', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <InquiryForm propertySlug="test-property" />
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText(/Nombre Completo/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('test@example.com');
  });

  it('submits form successfully', async () => {
    propertyService.createInquiry.mockResolvedValue({ success: true });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <InquiryForm propertySlug="test-property" onSuccess={vi.fn()} />
      </AuthContext.Provider>
    );

    const messageField = screen.getByLabelText(/Mensaje/i);
    fireEvent.change(messageField, { target: { value: 'Nuevo mensaje de prueba' } });

    const submitButton = screen.getByText('Enviar Consulta');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(propertyService.createInquiry).toHaveBeenCalledWith(
        'test-property',
        expect.objectContaining({
          client_name: 'testuser',
          client_email: 'test@example.com',
          message: 'Nuevo mensaje de prueba',
        })
      );
    });
  });

  it('shows success message after submission', async () => {
    propertyService.createInquiry.mockResolvedValue({ success: true });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <InquiryForm propertySlug="test-property" />
      </AuthContext.Provider>
    );

    const submitButton = screen.getByText('Enviar Consulta');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('¡Consulta enviada!')).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    propertyService.createInquiry.mockRejectedValue({
      response: { data: { detail: 'Error al enviar' } },
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <InquiryForm propertySlug="test-property" />
      </AuthContext.Provider>
    );

    const submitButton = screen.getByText('Enviar Consulta');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Error al enviar')).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <InquiryForm propertySlug="test-property" />
      </AuthContext.Provider>
    );

    // Limpiar campos requeridos
    const nameField = screen.getByLabelText(/Nombre Completo/i);
    const emailField = screen.getByLabelText(/Email/i);
    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.change(emailField, { target: { value: '' } });

    const submitButton = screen.getByText('Enviar Consulta');
    fireEvent.click(submitButton);

    // El form no debería enviar si está vacío (validación HTML5)
    await waitFor(() => {
      expect(propertyService.createInquiry).not.toHaveBeenCalled();
    });
  });
});
