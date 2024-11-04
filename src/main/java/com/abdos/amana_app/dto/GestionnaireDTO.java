// GestionnaireDTO.java
package com.abdos.amana_app.dto;

import lombok.Data;

@Data
public class GestionnaireDTO {
    private String nom;
    private Long userId;
    private String telephone;
    private String role;
    private String email;  // Email du User associé
    private String region; // Nom de la région associée
}