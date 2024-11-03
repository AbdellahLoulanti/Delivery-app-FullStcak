import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const ProfilePage = () => {
    const [selectedTab, setSelectedTab] = useState('account-general');
    const [userData, setUserData] = useState({
        nom: '',
        email: '',
        adresse: '',
        telephone: '',
        codePostal: '',
        provinceName: '',
        regionName: ''
    });
    const [editData, setEditData] = useState({
        adresse: '',
        telephone: '',
        codePostal: ''
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const fetchProfile = async () => {
        try {
            const response = await axios.get('/client/me');
            setUserData(response.data);
            setEditData({
                adresse: response.data.adresse,
                telephone: response.data.telephone,
                codePostal: response.data.codePostal
            });
        } catch (error) {
            setMessage("Erreur lors de la récupération des informations de profil");
            setMessageType("error");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/client/update-profile', editData);
            setMessage('Profil mis à jour avec succès');
            setMessageType("success");
            fetchProfile();
        } catch (error) {
            setMessage("Erreur lors de la mise à jour du profil");
            setMessageType("error");
            console.error(error);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/client/change-password', passwordData);
            setMessage('Mot de passe mis à jour avec succès');
            setMessageType("success");
            setPasswordData({ oldPassword: '', newPassword: '' });
        } catch (error) {
            setMessage("Erreur lors de la modification du mot de passe");
            setMessageType("error");
            console.error(error);
        }
    };

    return (
        <section className="account-settings-page py-16 bg-white min-h-screen text-gray-900">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
                    Paramètres de compte
                </h2>

                {message && (
                    <div className={`text-center py-3 px-4 rounded-lg mb-8 shadow-lg ${
                        messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 p-4 bg-gray-50 shadow-md rounded-l-lg">
                        <div className="space-y-4">
                            <button
                                className={`w-full text-left p-2 rounded-lg font-semibold ${
                                    selectedTab === 'account-general' ? 'bg-darkCyan text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setSelectedTab('account-general')}
                            >
                                Informations générales
                            </button>
                            <button
                                className={`w-full text-left p-2 rounded-lg font-semibold ${
                                    selectedTab === 'account-update-profile' ? 'bg-darkCyan text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setSelectedTab('account-update-profile')}
                            >
                                Mettre à jour le profil
                            </button>
                            <button
                                className={`w-full text-left p-2 rounded-lg font-semibold ${
                                    selectedTab === 'account-change-password' ? 'bg-darkCyan text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setSelectedTab('account-change-password')}
                            >
                                Changer le mot de passe
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-3/4 p-6 bg-white shadow-md rounded-r-lg">
                        {selectedTab === 'account-general' && (
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Informations personnelles</h3>
                                <p className="mb-2"><strong>Nom :</strong> {userData.nom}</p>
                                <p className="mb-2"><strong>Email :</strong> {userData.email}</p>
                                <p className="mb-2"><strong>Adresse :</strong> {userData.adresse}</p>
                                <p className="mb-2"><strong>Téléphone :</strong> {userData.telephone}</p>
                                <p className="mb-2"><strong>Code Postal :</strong> {userData.codePostal}</p>
                                <p className="mb-2"><strong>Province :</strong> {userData.provinceName}</p>
                                <p><strong>Région :</strong> {userData.regionName}</p>
                            </div>
                        )}

                        {selectedTab === 'account-update-profile' && (
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Mise à jour du profil</h3>
                                <div>
                                    <label className="block text-gray-700">Adresse</label>
                                    <input
                                        type="text"
                                        value={editData.adresse}
                                        onChange={(e) => setEditData({ ...editData, adresse: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Téléphone</label>
                                    <input
                                        type="text"
                                        value={editData.telephone}
                                        onChange={(e) => setEditData({ ...editData, telephone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Code Postal</label>
                                    <input
                                        type="text"
                                        value={editData.codePostal}
                                        onChange={(e) => setEditData({ ...editData, codePostal: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-block bg-transparent border-2 border-blue-500 text-darkCyan text-l py-3 px-6 rounded-full transition duration-300 hover:bg-deepCyan hover:text-white"
                                >
                                    Mettre à jour le profil
                                </button>
                            </form>
                        )}

                        {selectedTab === 'account-change-password' && (
                            <form onSubmit={handleChangePassword} className="space-y-6">
                                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Changer le mot de passe</h3>
                                <div>
                                    <label className="block text-gray-700">Ancien mot de passe</label>
                                    <input
                                        type="password"
                                        value={passwordData.oldPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-800"
                                >
                                    Changer le mot de passe
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
