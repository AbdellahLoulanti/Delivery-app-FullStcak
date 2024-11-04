import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import defaultAdminImage from '../../assets/Maersk-Logo.png'; // Chemin vers l'image par défaut

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false); // Nouvel état pour le chargement de la soumission
  const [successMessage, setSuccessMessage] = useState(null); // État pour afficher un message de succès

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('/admin/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAdmin(response.data);
        setUpdatedAdmin(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des données de l'administrateur");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const response = await axios.put(`http://localhost:8088/api/v1/admin/update-admin/${admin.userId}`, updatedAdmin, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAdmin(response.data);
      setIsEditing(false);
      setSuccessMessage("Profil mis à jour avec succès");
    } catch (err) {
      setError("Erreur lors de la mise à jour des données de l'administrateur");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full p-4">
        <div className="flex flex-col items-center">
          <img
            src={admin.image || defaultAdminImage}
            alt="Admin"
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{admin.nom}</h2>
          <p className="text-gray-500 text-sm mb-4">Administrator</p>
          {successMessage && <div className="text-green-600 mb-2">{successMessage}</div>}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={updatedAdmin.email}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1"
              />
            ) : (
              <p className="text-gray-700">{admin.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="telephone"
                value={updatedAdmin.telephone || ""}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1"
              />
            ) : (
              <p className="text-gray-700">{admin.telephone}</p>
            )}
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-2"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>

          {isEditing && (
            <button
              onClick={handleSubmit}
              disabled={submitLoading}
              className={`w-full py-2 rounded-lg ${
                submitLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              } text-white transition duration-200`}
            >
              {submitLoading ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
