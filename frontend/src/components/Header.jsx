import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/properties';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const generalWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Me interesa conocer las propiedades disponibles. ¿Podrían ayudarme?')}`;

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo.jpeg" alt="Calzada Inmobiliaria" className="h-16 object-contain" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/propiedades?operation=sale" className="text-gray-700 hover:text-black transition-colors font-medium tracking-wide text-sm uppercase">
                            Comprar
                        </Link>
                        <Link to="/propiedades?operation=rent" className="text-gray-700 hover:text-black transition-colors font-medium tracking-wide text-sm uppercase">
                            Alquilar
                        </Link>
                        <Link to="/propiedades" className="text-gray-700 hover:text-black transition-colors font-medium tracking-wide text-sm uppercase">
                            Propiedades
                        </Link>

                        {/* WhatsApp CTA */}
                        <a
                            href={generalWhatsAppLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-colors font-semibold text-sm shadow-sm"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Contáctanos
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col gap-4">
                            <Link to="/propiedades?operation=sale" className="text-gray-700 hover:text-black font-medium uppercase text-sm tracking-wide"
                                onClick={() => setMobileMenuOpen(false)}>
                                Comprar
                            </Link>
                            <Link to="/propiedades?operation=rent" className="text-gray-700 hover:text-black font-medium uppercase text-sm tracking-wide"
                                onClick={() => setMobileMenuOpen(false)}>
                                Alquilar
                            </Link>
                            <Link to="/propiedades" className="text-gray-700 hover:text-black font-medium uppercase text-sm tracking-wide"
                                onClick={() => setMobileMenuOpen(false)}>
                                Propiedades
                            </Link>
                            <a
                                href={generalWhatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-green-700 font-semibold text-sm"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Contáctanos por WhatsApp
                            </a>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;