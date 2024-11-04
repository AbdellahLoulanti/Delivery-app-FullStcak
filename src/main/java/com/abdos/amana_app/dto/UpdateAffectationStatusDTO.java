package com.abdos.amana_app.dto;

import com.abdos.amana_app.model.Affectation.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAffectationStatusDTO {
    private Long affectationId; // ID de l'affectation à mettre à jour
    private Status status; // Nouveaustatut
}