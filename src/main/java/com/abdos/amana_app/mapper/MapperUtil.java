// MapperUtil.java
package com.abdos.amana_app.mapper;


import com.abdos.amana_app.dto.AdminDTO;
import com.abdos.amana_app.dto.GestionnaireDTO;
import com.abdos.amana_app.dto.NotificationDTO;
import com.abdos.amana_app.model.*;
import com.abdos.amana_app.service.*;
import com.abdos.amana_app.dto.AffectationDTO;

import java.time.LocalDateTime;

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
        dto.setCommandeId(affectation.getCommande() != null ? affectation.getCommande().getId() : null);
        dto.setLivreurId(affectation.getLivreur() != null ? affectation.getLivreur().getId() : null);
        dto.setGestionnaireId(affectation.getGestionnaire() != null ? affectation.getGestionnaire().getUserId() : null);

        // Vérifiez si les dates sont nulles avant de les convertir
        dto.setDateAffectation(affectation.getDateAffectation() != null ? affectation.getDateAffectation().toString() : null);
        dto.setDateRamassage(affectation.getDateRamassage() != null ? affectation.getDateRamassage().toString() : null);
        dto.setDateLivraison(affectation.getDateLivraison() != null ? affectation.getDateLivraison().toString() : null);
        dto.setStatus(affectation.getStatus());

        // Récupérer les détails de la commande si elle n'est pas nulle
        if (affectation.getCommande() != null) {
            dto.setShippingAddress(affectation.getCommande().getShippingAddress());
            dto.setReceiverPhoneNumber(affectation.getCommande().getReceiverPhoneNumber());
            dto.setPackagePrice(affectation.getCommande().getPackagePrice() != null ? affectation.getCommande().getPackagePrice().toString() : null);
        }

        return dto;
}

    public static Affectation toAffectation(AffectationDTO dto) {
        Affectation affectation = new Affectation();
        affectation.setId(dto.getId());
        //Set Commande, Livreur, and Gestionnaire based on their IDs
        // Assurez-vous de créer des objets ou de les récupérer correctement
        return affectation;
    }

    public static NotificationDTO toNotificationDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setDateEnvoi(LocalDateTime.parse(notification.getDateEnvoi().toString()));
        dto.setMessage(notification.getMessage());
        return dto;
    }

    public static AdminDTO toAdminDTO(User admin) {
        AdminDTO adminDTO = new AdminDTO();
        adminDTO.setUserId(admin.getUserId());
        adminDTO.setNom(admin.getNom());
        adminDTO.setEmail(admin.getEmail());
        adminDTO.setTelephone(admin.getAdmin().getTelephone()); // Si vous avez une entité Admin associée
        return adminDTO;
}

}