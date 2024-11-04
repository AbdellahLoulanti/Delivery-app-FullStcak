import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../api/AuthContext';
import { Link } from 'react-router-dom'; // Ajoutez ceci en haut du fichier


const LivreurProfile = () => {
    const { user } = useAuth();
    const [livreurData, setLivreurData] = useState(null);
    const [affectations, setAffectations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

     // SVG icons for Bell and User
     const BellIcon = () => (
        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-5-5.917V5a2 2 0 10-4 0v.083A6.002 6.002 0 004 11v3c0 .217-.036.422-.095.618L2.5 17h5m2 0v1a3 3 0 106 0v-1m-6 0h6" />
        </svg>
    );

    const UserIcon = () => (
        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.962 8.962 0 0012 21a8.962 8.962 0 006.879-3.196M15 11a3 3 0 01-6 0m-3.879 7.196A8.962 8.962 0 003 13a8.962 8.962 0 013.121-6.804M15 11a3 3 0 00-6 0" />
        </svg>
    );

    useEffect(() => {
        const fetchLivreurData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/livreur/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setLivreurData(response.data);
                    console.log("User Data:", response.data);


                    if (response.data.userId) {
                        const affectationResponse = await axios.get(`/livreur/${response.data.userId}/affectations`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        setAffectations(affectationResponse.data);
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchLivreurData();
        }
    }, [user]);

    const handleStatusUpdate = async (affectationId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const affectationToUpdate = affectations.find(a => a.id === affectationId);
                const commandeId = affectationToUpdate?.commandeId;

                const response = await axios.put(
                    '/livreur/affectations/update-status',
                    { affectationId, status: newStatus, commandeId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 200) {
                    setAffectations(prevAffectations =>
                        prevAffectations.map(affectation =>
                            affectation.id === affectationId ? { ...affectation, status: newStatus } : affectation
                        )
                    );
                }
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token && livreurData) {
                const response = await axios.get(`/livreur/${livreurData.userId}/notifications`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotifications(response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des notifications :", error);
        }
    };

    const handleNotificationsClick = () => {
        fetchNotifications();
        setShowNotifications(true);
    };

    if (loading) return <p className="text-center text-lg">Chargement des informations...</p>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 p-4">
           <header className="flex items-center w-full max-w-8xl p-4 mb-6 bg-white rounded-lg shadow-md">
    {/* Titre "Espace Livreur" */}
    <h1 className="text-2xl font-semibold text-blue-600">Espace Livreur</h1>

    {/* Espace pour centrer le texte */}
    <div className="flex-grow flex justify-center">
        <span className="text-lg font-semibold text-gray-900">Bonjour, {livreurData?.nom || 'Livreur'}!</span>
    </div>

    {/* Icônes de profil et de notification */}
    <div className="flex items-center space-x-4">
    <button className="flex items-center text-lg text-gray-700" onClick={() => {/* Navigate to profile page */}}>
                        <UserIcon />
                        <Link to="/Profile"> <span className="ml-1">Profil</span></Link>
                        </button>
        
        <button className="relative" onClick={handleNotificationsClick}>
                        <BellIcon />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
    </div>
</header>


            {showNotifications && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Mes Notifications</h2>
                        {notifications.length > 0 ? (
                            <ul>
                                {notifications.map((notification) => (
                                    <li key={notification.id} className="py-2">{notification.message}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucune notification disponible.</p>
                        )}
                        <button onClick={() => setShowNotifications(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-8xl bg-white p-8 rounded-lg shadow-md mt-12">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Mes Affectations</h2>

                {affectations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-center">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-2 px-3 font-semibold">ID</th>
                                    <th className="py-2 px-3 font-semibold">Commande ID</th>
                                    <th className="py-2 px-3 font-semibold">Téléphone</th>
                                    <th className="py-2 px-3 font-semibold">Adresse</th>
                                    <th className="py-2 px-3 font-semibold">Prix</th>
                                    <th className="py-2 px-3 font-semibold">Statut</th>
                                    <th className="py-2 px-3 font-semibold">Date_affectation</th>
                                    <th className="py-2 px-3 font-semibold">Date_Livraison</th>
                                    <th className="py-2 px-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {affectations.map((affectation) => (
                                    <tr key={affectation.id} className="hover:bg-blue-100">
                                        <td className="py-2">{affectation.id}</td>
                                        <td className="py-2">{affectation.commandeId}</td>
                                        <td className="py-2">{affectation.receiverPhoneNumber}</td>
                                        <td className="py-2 truncate max-w-xs">{affectation.shippingAddress}</td>
                                        <td className="py-2">{affectation.packagePrice}</td>
                                        <td className="py-2">{affectation.status}</td>
                                        <td className="py-2">{affectation.dateAffectation}</td>
                                        <td className="py-2">{affectation.dateLivraison}</td>
                                        <td className="py-2 space-x-1 flex justify-center">
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                                                onClick={() => handleStatusUpdate(affectation.id, 'RAMASSE')}
                                                disabled={affectation.status === 'LIVRE'}
                                            >
                                                RAMASSE
                                            </button>
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                                                onClick={() => handleStatusUpdate(affectation.id, 'LIVRE')}
                                                disabled={affectation.status === 'LIVRE'}
                                            >
                                                LIVRE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4 text-center">Aucune affectation disponible.</p>
                )}
            </div>
        </div>
    );
};

export default LivreurProfile;
