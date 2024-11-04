import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
    return (
        <footer className="bg-[#4DACB5] text-white py-6 border-t border-gray-300 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    
                    {/* Company Information */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h4 className="text-xl font-bold">Notre Société</h4>
                        <p>Votre service de livraison fiable partout au Maroc.</p>
                        <p className="text-sm mt-2">© {new Date().getFullYear()} Delivery Maroc. Tous droits réservés.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h4 className="text-xl font-bold">Liens Rapides</h4>
                        <ul>
                            <li><a href="/home" className="hover:underline">Accueil</a></li>
                            <li><a href="/about" className="hover:underline">À propos</a></li>
                            <li><a href="/services" className="hover:underline">Services</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="text-center md:text-right">
                        <h4 className="text-xl font-bold">Suivez-nous</h4>
                        <div className="flex justify-center md:justify-end space-x-4 mt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-gray-300">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white hover:text-gray-300">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-gray-300">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-gray-300">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
