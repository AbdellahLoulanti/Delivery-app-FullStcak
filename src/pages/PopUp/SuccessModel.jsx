
import React from 'react';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-lg font-bold text-center mb-4">Commande ajoutée avec succès!</h2>
        <p className="text-center">Votre commande a été enregistrée. Vous serez redirigé vers la page d'accueil.</p>
        <div className="mt-6 text-center">
          <button 
            className="bg-[#007784] text-white py-2 px-4 rounded hover:bg-[#005f63] transition"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
