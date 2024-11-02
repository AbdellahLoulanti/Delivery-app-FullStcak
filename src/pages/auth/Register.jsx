import React, { useRef, useState } from 'react';
import { useAuth } from '../../api/AuthContext';
import { motion } from 'framer-motion';
import ReactCodeInput from 'react-code-input';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaAddressBook, FaPhone, FaMapPin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    adresse: '',
    telephone: '',
    codePostal: '',
    role: 'CLIENT',
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [activationCode, setActivationCode] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const registerRef = useRef(null);

 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await register(formData);
      setSuccess("Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.");
      setRegistrationSuccess(true);
    } catch (err) {
      setError("Échec de l'inscription, veuillez réessayer.");
    }
  };

  const handleCodeChange = (code) => {
    setActivationCode(code);
  };

  const submitActivationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:8088/api/v1/auth/activate-account?token=${activationCode}`);
      setSuccess('Activation réussie !');
    } catch (err) {
      setError("Échec de l'activation, veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Contact Information Section */}
        <div className="w-full lg:w-1/3 bg-primary text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="mb-4">Nous vous répondrons au plus vite !</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-xl" />
              <span>contact@tawssil.ma</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-xl" />
              <span>05 20 02 09 10</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapPin className="text-xl" />
              <span>Ain Sebaa, Casablanca, Morocco</span>
            </div>
          </div>
        </div>

        {/* Registration Form Section */}
        <div ref={registerRef} className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">Inscription Client</h2>
          {!registrationSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="col-span-2">
                  <label className="block text-gray-700">Nom Complet*</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Email*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Mot de Passe*</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de Passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Numéro de téléphone*</label>
                  <input
                    type="text"
                    name="telephone"
                    placeholder="Téléphone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700">Code Postal*</label>
                  <input
                    type="text"
                    name="codePostal"
                    placeholder="Code Postal"
                    value={formData.codePostal}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-600 text-center">{success}</p>}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
              >
                S'inscrire
              </motion.button>

              {/* Login Link */}
              <p className="text-center mt-4">
                Vous avez déjà un compte?{' '}
                <Link to="/login" className="text-teal-600 hover:underline">
                  Connectez-vous
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={submitActivationCode} className="text-center space-y-6">
              <h3 className="text-2xl font-semibold mb-2 text-teal-600">Code d'Activation</h3>
              <p className="text-gray-600 mb-4">Entrez le code que vous avez reçu dans votre email.</p>
              <ReactCodeInput
                type="number"
                fields={6}
                onChange={handleCodeChange}
                value={activationCode}
                className="flex justify-center"
                inputStyle={{
                  margin: '4px',
                  MozAppearance: 'textfield',
                  width: '50px',
                  fontSize: '18px',
                  height: '50px',
                  textAlign: 'center',
                  backgroundColor: '#FAFFE9',
                  color: '#05606E',
                  border: '2px solid #DDDDDD',
                }}
              />
              
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">{success}</p> && <Link to="/login" className="bg-[#007784] text-white rounded-full px-4 py-2 ml-1 font-semibold hover:bg-[#005f63] transition">
                  Connectez-vous
                </Link> }

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
              >
                Valider le Code
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
