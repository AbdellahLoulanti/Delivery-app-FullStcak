package com.abdos.amana_app.dto;

import com.abdos.amana_app.model.Affectation.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AffectationDTO {
    private Long id;
    private Long commandeId;
    private Long livreurId;
    private Long gestionnaireId;
    private String dateAffectation;
    private String dateRamassage;
    private String dateLivraison;
    private Status status;

    // Ajout des champs pour les détails de la commande
    private String shippingAddress;      // Adresse de livraison
    private String receiverPhoneNumber;  // Numéro de téléphone du destinataire
    private String packagePrice;
}