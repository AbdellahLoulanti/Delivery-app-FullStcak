import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../api/AuthContext';
import defaultUserImage from '../../assets/Maersk-Logo.png'; // Chemin vers l'image par défaut

const Profile = () => {
    const { user } = useAuth();
    const [livreurData, setLivreurData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedLivreur, setUpdatedLivreur] = useState({});
    const [submitLoading, setSubmitLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchLivreurData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/livreur/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setLivreurData(response.data);
                    setUpdatedLivreur(response.data);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des données :", err);
                setError("Erreur lors de la récupération des données.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchLivreurData();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedLivreur((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`/livreur/update/${livreurData.id}`, updatedLivreur, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLivreurData(response.data);
            setIsEditing(false);
            setSuccessMessage("Profil mis à jour avec succès");
        } catch (err) {
            setError("Erreur lors de la mise à jour des données du livreur");
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-xl">Chargement...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-100 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full p-4">
                <div className="flex flex-col items-center">
                    <img
                        src={livreurData.image || defaultUserImage}
                        alt="Livreur"
                        className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4 object-cover"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{livreurData.nom || 'Nom Non Disponible'}</h2>
                    {successMessage && <div className="text-green-600 mb-2">{successMessage}</div>}
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Email:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={updatedLivreur.email}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mt-1"
                            />
                        ) : (
                            <p className="text-gray-700">{livreurData.email || 'Non disponible'}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Téléphone:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="telephone"
                                value={updatedLivreur.telephone || ""}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mt-1"
                            />
                        ) : (
                            <p className="text-gray-700">{livreurData.telephone || 'Non disponible'}</p>
                        )}
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-2"
                    >
                        {isEditing ? 'Annuler' : 'Modifier le Profil'}
                    </button>

                    {isEditing && (
                        <button
                            onClick={handleSubmit}
                            disabled={submitLoading}
                            className={`w-full py-2 rounded-lg ${
                                submitLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                            } text-white transition duration-200`}
                        >
                            {submitLoading ? 'Enregistrement...' : 'Sauvegarder les Changements'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
