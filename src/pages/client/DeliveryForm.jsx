import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faPhoneAlt, faTag, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import SuccessModal from '../PopUp/SuccessModel';

const DeliveryForm = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
  const [packagePrice, setPackagePrice] = useState(0);
  const [deliveryPriceType, setDeliveryPriceType] = useState('INCLUS');
  const [provincePostalCodeId, setProvincePostalCodeId] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();


  // Fetch provinces from backend
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await api.get('/provinces');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      shippingAddress,
      receiverPhoneNumber,
      packagePrice,
      deliveryPriceType,
      provincePostalCodeId,
    };

    try {
      const response = await api.post('/client/create', data);
      console.log('Commande ajoutée avec succès:', response.data);
      setIsModalOpen(true); // Open the modal on success
      // Wait for the modal to close before redirecting
      setTimeout(() => {
        navigate('/'); // Redirect to the home page
      }, 3000); // Adjust the timing as needed
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
        <FontAwesomeIcon icon={faShippingFast} className="mr-2" />
        Formulaire de Livraison
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2  items-center">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
            Adresse de Livraison
          </label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-[#007784]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2  items-center">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
            Numéro de Téléphone du Destinataire
          </label>
          <input
            type="tel"
            id="receiverPhoneNumber"
            value={receiverPhoneNumber}
            onChange={(e) => setReceiverPhoneNumber(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-[#007784]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2  items-center">
            <FontAwesomeIcon icon={faTag} className="mr-2" />
            Prix du Colis
          </label>
          <input
            type="number"
            id="packagePrice"
            value={packagePrice}
            onChange={(e) => setPackagePrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-[#007784]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Type de Prix de Livraison</label>
          <select
            value={deliveryPriceType}
            onChange={(e) => setDeliveryPriceType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-[#007784]"
          >
            <option value="INCLUS">Inclus</option>
            <option value="NON_INCLUS">Non Inclus</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2 items-center">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
            Province
          </label>
          <select
            id="provincePostalCodeId"
            value={provincePostalCodeId}
            onChange={(e) => setProvincePostalCodeId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-[#007784]"
            required
          >
            <option value="">Sélectionner une province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.provinceName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#007784] text-white py-2 rounded hover:bg-[#005f63] transition"
        >
          Passer Commande
        </button>
      </form>

      {/* Success Modal */}
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DeliveryForm;
