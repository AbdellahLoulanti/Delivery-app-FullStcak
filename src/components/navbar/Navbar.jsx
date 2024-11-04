import React, { useState, useRef, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaHistory, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../api/AuthContext'; // Assure-toi que le chemin est correct
import Logo from '../../assets/Maersk-Logo.png';
import { link } from 'framer-motion/client';

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtiens l'utilisateur depuis le contexte
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  //navigate to delivery form
  const handleNavigateToDelivery = () => {
    navigate('/livraison-colis');
};
  // Toggle dropdown on click
  const handleDropdownClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout(); // Appelle la méthode logout du contexte
    setIsDropdownOpen(false); // Ferme le menu déroulant après déconnexion
  };

  return (
    <nav className="bg-[#e8f7f9] py-3 px-6 shadow-lg relative z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Retour à l'accueil">
          <img src={Logo} alt="Tawssil Logo" className="w-32" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-darkCyan font-medium hover:text-primary">
            Accueil
          </Link>
          <Link to="/About" className="text-darkCyan font-medium hover:text-primary">
            À propos
          </Link>
          <button className="border-2 border-primary text-primary rounded-full px-4 py-1 font-medium hover:bg-primary hover:text-white transition" onClick={handleNavigateToDelivery}>
            Livraison
          </button>
          <button className="bg-[#007784] text-white rounded-full px-4 py-1 font-semibold hover:bg-[#005f63] transition">
            Contactez-nous
          </button>

          {/* Dropdown Menu for Login/Signup or User Profile */}
          <div ref={dropdownRef} className="relative" onClick={handleDropdownClick}>
            
            {user ? (
            <div className="flex flex-col items-center">
            <span className="bg-[#007784] text-white rounded-full px-4 py-1 font-semibold flex items-center hover:bg-[#005f63] transition">
              {user.nom}
            </span>
            <span className="text-gray-500 text-xs">{user.email}</span>
          </div>
           
            ) : (
              <button className="bg-[#007784] text-white rounded-full px-4 py-1 font-semibold flex items-center hover:bg-[#005f63] transition">
                Se connecter <span className="ml-2">&#x25BC;</span>
              </button>
            )} 
          

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                {user ? (
                  <>
                    <Link to="/mon-profile" className="flex items-center px-4 py-2 text-[#007784] hover:bg-gray-100 rounded">
                      <FaUserCircle className="mr-2" /> Profil
                    </Link>
                    <Link to="/historique-commandes" className="flex items-center px-4 py-2 text-[#007784] hover:bg-gray-100 rounded">
                      <FaHistory className="mr-2" /> Historique des commandes
                    </Link>
                    <button
                      className="flex items-center px-4 py-2 text-[#007784] hover:bg-gray-100 rounded w-full text-left"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="mr-2" /> Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="flex items-center px-4 py-2 text-[#007784] hover:bg-gray-100 rounded">
                      <FaUser className="mr-2" /> Inscription
                    </Link>
                    <Link to="/login" className="flex items-center px-4 py-2 text-[#007784] hover:bg-gray-100 rounded">
                      <FaSignInAlt className="mr-2" /> Connexion
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
