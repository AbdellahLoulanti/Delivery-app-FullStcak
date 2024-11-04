package com.abdos.amana_app.dto;

import lombok.Data;

@Data
public class AdminDTO {
    private Long userId;
    private String nom;
    private String telephone; // Téléphone de l'admin
    private String email;  // Email du Useassocié
}