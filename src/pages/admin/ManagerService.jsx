// managerService.js
import api from '../../api/axios';  // Assurez-vous que l'importation est correcte

export const getManagers = async () => {
    const response = await api.get('/admin/gestionnaires');
    return response.data;  // Retourne la liste des gestionnaires
};

// Fonction pour supprimer un gestionnaire
export const deleteManager = async (id) => {
    try {
const response = await api.delete(`admin/delete-gestionnaire/${id}`); // Assurez-vous d'utiliser le bon format
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression du gestionnaire :", error);
      throw error;
    }
  };


export const updateManager = async (id, updatedData) => {
    try {
        const response = await api.put(`admin/update-gestionnaire/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du gestionnaire :", error);
        throw error;
    }
};

