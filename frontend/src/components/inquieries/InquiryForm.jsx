import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { propertyService } from '../../services/propertyService';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

const InquiryForm = ({ propertySlug, onSuccess }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        client_name: user?.username || '',
        client_email: user?.email || '',
        client_phone: '',
        message: `Hola, estoy interesado en esta propiedad. ¿Podrían darme más información?`,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await propertyService.createInquiry(propertySlug, formData);
            setSuccess(true);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.response?.data?.detail || 'Error al enviar consulta');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center">
                <p className="font-semibold">¡Consulta enviada!</p>
                <p className="text-sm">El agente te contactará pronto.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Nombre */}
            <div>
                <label htmlFor="inquiry-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        id="inquiry-name"
                        type="text"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Tu nombre"
                        required
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="inquiry-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        id="inquiry-email"
                        type="email"
                        name="client_email"
                        value={formData.client_email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="tu@email.com"
                        required
                    />
                </div>
            </div>

            {/* Teléfono */}
            <div>
                <label htmlFor="inquiry-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono (Opcional)
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        id="inquiry-phone"
                        type="tel"
                        name="client_phone"
                        value={formData.client_phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="+1 234 567 890"
                    />
                </div>
            </div>

            {/* Mensaje */}
            <div>
                <label htmlFor="inquiry-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                </label>
                <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                        id="inquiry-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                        placeholder="Escribe tu consulta..."
                        required
                    />
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors font-semibold disabled:opacity-50"
            >
                {loading ? 'Enviando...' : 'Enviar Consulta'}
            </button>
        </form>
    );
};

export default InquiryForm;