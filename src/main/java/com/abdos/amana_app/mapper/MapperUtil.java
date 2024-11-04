// MapperUtil.java
package com.abdos.amana_app.mapper;


import com.abdos.amana_app.dto.GestionnaireDTO;
import com.abdos.amana_app.model.Admin;
import com.abdos.amana_app.model.Gestionnaire;
import com.abdos.amana_app.model.Region;
import com.abdos.amana_app.service.*;
import com.abdos.amana_app.dto.AffectationDTO;
import com.abdos.amana_app.model.Affectation;

public class MapperUtil {



    public static GestionnaireDTO toGestionnaireDTO(Gestionnaire gestionnaire) {
        GestionnaireDTO dto = new GestionnaireDTO();
        dto.setUserId(gestionnaire.getUserId());
        dto.setNom(gestionnaire.getUser().getNom());
        dto.setTelephone(gestionnaire.getTelephone());
        dto.setEmail(gestionnaire.getUser().getEmail());
        dto.setRegion(gestionnaire.getRegion().getRegionName());  // Utiliser getRegionName() au lieu de getNom()
        return dto;
    }

    public static void updateGestionnaireFromDTO(Gestionnaire gestionnaire, GestionnaireDTO dto ,RegionService regionService) {
        if (dto.getUserId() != null) {
            gestionnaire.setUserId(dto.getUserId());
        }
        if (dto.getNom() != null) {
            gestionnaire.getUser().setNom(dto.getNom());
        }
        if (dto.getTelephone() != null) {
            gestionnaire.setTelephone(dto.getTelephone());
        }
        if (dto.getEmail() != null) {
            gestionnaire.getUser().setEmail(dto.getEmail()); // Assurez-vous que l'utilisateur est initialisé
        }
        if (dto.getRegion() != null) {
            // Ici, vous devez récupérer la région à partir de votre service ou repository
            // Supposons que vous ayez une méthode pour obtenir une région par son nom

            Region region = regionService.findByName(dto.getRegion());
            gestionnaire.setRegion(region); // Mettre à jour la région
        }
    }




    public static AffectationDTO toAffectationDTO(Affectation affectation) {
        AffectationDTO dto = new AffectationDTO();
        dto.setId(affectation.getId());
        dto.setDateAffectation(affectation.getDateAffectation().toString());
        dto.setDateRamassage(affectation.getDateRamassage() != null ? affectation.getDateRamassage().toString() : null);
        dto.setDateLivraison(affectation.getDateLivraison() != null ? affectation.getDateLivraison().toString() : null);
        dto.setStatus(affectation.getStatus());
        // Récupérer les détails de la commande
        dto.setShippingAddress(affectation.getCommande().getShippingAddress());
        dto.setReceiverPhoneNumber(affectation.getCommande().getReceiverPhoneNumber());
        dto.setPackagePrice(affectation.getCommande().getPackagePrice().toString());

        return dto;
    }


    public static Affectation toAffectation(AffectationDTO dto) {
        Affectation affectation = new Affectation();
        affectation.setId(dto.getId());
        // Set Commande, Livreur, and Gestionnaire based on their IDs
        // Assurez-vous de créer des objets ou de les récupérer correctement
        return affectation;
}


}