import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { FaMapMarkerAlt, FaPhone, FaBox, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const HistoriqueCommandes = () => {
    const [commandes, setCommandes] = useState([]);
    const [filteredCommandes, setFilteredCommandes] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // Fonction pour récupérer les commandes
    const fetchHistoriqueCommandes = async () => {
        try {
            const response = await axios.get('/client/historique');
            setCommandes(response.data);
            setFilteredCommandes(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes", error);
        }
    };

    useEffect(() => {
        fetchHistoriqueCommandes();
    }, []);

    // Fonction de filtrage
    const filterCommandes = () => {
        let result = commandes;

        if (selectedStatus) {
            result = result.filter((commande) => commande.status === selectedStatus);
        }
        if (selectedDate) {
            result = result.filter((commande) => commande.dateLivraison === selectedDate);
        }

        setFilteredCommandes(result);
    };

    useEffect(() => {
        filterCommandes();
    }, [selectedStatus, selectedDate]);

    return (
        <section className="section-historique-commandes py-10 bg-[#4DACB5] min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Historique des Commandes</h2>

                {/* Barre de filtres */}
                <div className="flex justify-center gap-4 mb-8">
                    <select 
                        value={selectedStatus} 
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 rounded bg-white text-gray-700"
                    >
                        <option value="">Filtrer par statut</option>
                        <option value="En attente">En attente</option>
                        <option value="LIVRE">Livré</option>
                        <option value="AFFECTE">Affecté</option>
                        <option value="RAMASSE">Ramassé</option>
                    </select>
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 rounded bg-white text-gray-700"
                    />
                    <button 
                        onClick={() => { setSelectedStatus(''); setSelectedDate(''); setFilteredCommandes(commandes); }}
                        className="px-4 py-2 rounded bg-red-500 text-white"
                    >
                        Réinitialiser
                    </button>
                </div>

                {filteredCommandes.length === 0 ? (
                    <p className="text-center text-white">Aucune commande trouvée.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCommandes.map((commande, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-4 text-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-[#4DACB5]">Commande #{commande.commandeId}</span>
                                    <span className="flex items-center text-green-600">
                                        <FaCheckCircle className="mr-1" />
                                        {commande.status}
                                    </span>
                                </div>
                                <p className="flex items-center text-gray-600">
                                    <FaMapMarkerAlt className="mr-2" />
                                    {commande.shippingAddress}
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <FaPhone className="mr-2" />
                                    {commande.receiverPhoneNumber}
                                </p>
                                <div className="flex justify-between mt-2 text-gray-600">
                                    <span>Prix : {commande.packagePrice} MAD</span>
                                    <span>Livraison : {commande.deliveryPrice}</span>
                                </div>
                                <p className="flex items-center text-gray-600 mt-2">
                                    <FaCalendarAlt className="mr-2" />
                                    Date Ramassage : {commande.dateRamassage || "En attente"}
                                </p>
                                <p className="flex items-center text-gray-600 mt-2">
                                    <FaCalendarAlt className="mr-2" />
                                    Date Livraison : {commande.dateLivraison || "En attente"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HistoriqueCommandes;
