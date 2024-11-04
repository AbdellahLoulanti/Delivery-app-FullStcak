package com.abdos.amana_app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDTO {
    private Long userId;
    private String nom;
    private String email;
    private String adresse;
    private String telephone;
    private String codePostal;
    private String provinceName;
    private String regionName;

    // Ajoutez des champs supplémentaires si nécessaire pour le profil
}
