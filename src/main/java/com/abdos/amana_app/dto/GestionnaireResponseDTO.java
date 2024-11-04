package com.abdos.amana_app.dto;

import lombok.Data;

@Data
public class GestionnaireResponseDTO {
    private String message;

    public GestionnaireResponseDTO(String message) {
        this.message = message;
}
}
