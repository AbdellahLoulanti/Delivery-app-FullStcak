import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { getManagers, deleteManager, updateManager } from './ManagerService';
import axios from '../../api/axios';

const ManageManagers = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    region: ''
  });

  const fetchManagers = async () => {
    try {
      const managersData = await getManagers();
      setManagers(managersData);
    } catch (error) {
      console.error('Erreur lors de la récupération des gestionnaires', error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleEdit = (manager) => {
    setSelectedManager(manager.userId);
    setFormData({
      nom: manager.nom,
      email: manager.email,
      telephone: manager.telephone,
      region: manager.region
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateManager(selectedManager, formData);
      fetchManagers();
      setSelectedManager(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du gestionnaire :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce gestionnaire ?')) {
      try {
        await deleteManager(id);
        fetchManagers();
      } catch (error) {
        console.error('Erreur lors de la suppression du gestionnaire', error);
      }
    }
  };


  //---------------------ADD GESTIONNAIRE --------------------------------


  const [showAddGestionnaireModal, setShowAddGestionnaireModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newGestionnaireData, setNewGestionnaireData] = useState({
    nom: '',
    email: '',
    password: '',
    telephone: '',
    regionId: '1', // Assurez-vous de définir les régions ailleurs dans votre code si elles sont dynamiques
  });

  const handleAddGestionnaire = async () => {
    try {
      await axios.post('/admin/add-gestionnaire', { ...newGestionnaireData, role: 'GESTIONNAIRE' });
      // Appelez une fonction pour actualiser la liste des gestionnaires après ajout
      setSuccessMessage('Gestionnaire ajouté avec succès!');
      setShowAddGestionnaireModal(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout du gestionnaire :", error);
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Gestion des Gestionnaires</h2>
        
    <div>
       {/* Message de succès */}
       {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      {/* Bouton pour ouvrir la modal d'ajout de gestionnaire */}
      <button
      onClick={() => setShowAddGestionnaireModal(true)}
      className="px-6 py-3 mb-4 text-white font-semibold text-lg rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 
                shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:from-indigo-500 hover:to-purple-500 
                focus:ring-4 focus:ring-purple-300 focus:outline-none"
    >
      Ajouter un Gestionnaire +
    </button>

      {/* Modal d'ajout de gestionnaire */}
      {showAddGestionnaireModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Ajouter Gestionnaire</h2>
            <input
              type="text"
              placeholder="Nom"
              value={newGestionnaireData.nom}
              onChange={(e) => setNewGestionnaireData({ ...newGestionnaireData, nom: e.target.value })}
              className="w-full mb-2 p-2 border"
            />
            <input
              type="email"
              placeholder="Email"
              value={newGestionnaireData.email}
              onChange={(e) => setNewGestionnaireData({ ...newGestionnaireData, email: e.target.value })}
              className="w-full mb-2 p-2 border"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={newGestionnaireData.password}
              onChange={(e) => setNewGestionnaireData({ ...newGestionnaireData, password: e.target.value })}
              className="w-full mb-2 p-2 border"
            />
            
            <input
              type="text"
              placeholder="Téléphone"
              value={newGestionnaireData.telephone}
              onChange={(e) => setNewGestionnaireData({ ...newGestionnaireData, telephone: e.target.value })}
              className="w-full mb-2 p-2 border"
            />
            <select
              value={newGestionnaireData.regionId}
              onChange={(e) => setNewGestionnaireData({ ...newGestionnaireData, regionId: e.target.value })}
              className="w-full mb-2 p-2 border"
            >
              {/* Option statique pour la région Tanger-Tétouan-Al Hoceima */}
              <option value="1">Tanger-Tétouan-Al Hoceima</option>
            </select>
            <button
              onClick={handleAddGestionnaire}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Ajouter
            </button>
            <button
              onClick={() => setShowAddGestionnaireModal(false)}
              className="mt-4 px-4 py-2 bg-gray text-darkCyan rounded-full ml-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
        {/* Tableau des gestionnaires */}
        <table className="min-w-full">
          <thead className="bg-blue-300">
            <tr>
              {['ID', 'Nom', 'Email', 'Téléphone', 'Région', 'Actions'].map((header, index) => (
                <th key={index} className="py-3 px-4 text-gray-700 font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {managers.map(manager => (
              <tr key={manager.userId} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                <td className="py-2 px-4 text-center">{manager.userId}</td>
                <td className="py-2 px-4 text-center">{manager.nom}</td>
                <td className="py-2 px-4 text-center">{manager.email}</td>
                <td className="py-2 px-4 text-center">{manager.telephone}</td>
                <td className="py-2 px-4 text-center">{manager.region}</td>
                <td className="py-2 px-4 text-center flex justify-center space-x-4">
                  <button 
                    className="text-blue-600 hover:text-blue-800 transition duration-200 flex items-center"
                    onClick={() => handleEdit(manager)}>
                    <FaEdit className="mr-1" /> {/* Icone pour l'édition */}
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800 transition duration-200 flex items-center"
                    onClick={() => handleDelete(manager.userId)}>
                    <FaTrashAlt className="mr-1" /> {/* Icone pour la suppression */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       {/* Formulaire de mise à jour du gestionnaire */}
{selectedManager && (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
    <h3 className="text-2xl font-semibold mb-4">Mettre à jour le gestionnaire</h3>
    <form onSubmit={handleUpdate}>
      {['Nom', 'Email', 'Telephone', 'Region'].map((label, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-gray-700 font-medium">{label}</label>
          <input
            type={label === 'Email' ? 'email' : 'text'}
            name={label.toLowerCase()} // Conserve la logique de nommage
            value={formData[label.toLowerCase()]} 
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Mettre à jour
        </button>
        <button type="button" onClick={() => setSelectedManager(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
          Annuler
        </button>
      </div>
    </form>
  </div>
)}

        
      </div>
    </div>
  );
};

export default ManageManagers;