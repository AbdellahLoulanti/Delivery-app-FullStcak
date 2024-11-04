package com.abdos.amana_app.controller;

import com.abdos.amana_app.dto.*;
import com.abdos.amana_app.model.Affectation;
import com.abdos.amana_app.model.Client;
import com.abdos.amana_app.model.Livreur;
import com.abdos.amana_app.service.AffectationService;
import com.abdos.amana_app.service.LivreurService;
import com.abdos.amana_app.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livreur")

public class LivreurController {

    @Autowired
    private AffectationService affectationService;
    @Autowired
    private LivreurService livreurService;
    @GetMapping("/me")
    public ResponseEntity<LivreurDTO> getLivreurDetails() {
        Livreur livreur = livreurService.getLivreurByAuthenticatedUser();
        return ResponseEntity.ok(livreurService.convertToLivreurDTO(livreur));
    }

    @GetMapping("/{livreurId}/affectations")
    public ResponseEntity<List<AffectationDTO>> getAffectations(@PathVariable Long livreurId) {
        List<AffectationDTO> affectations = affectationService.getAffectationsByLivreurId(livreurId);
        return ResponseEntity.ok(affectations);
    }

    // Endpoint pour mettre à jour le statut d'une affectation
    @PutMapping("/affectations/update-status")
    public ResponseEntity<String> updateStatus(@RequestBody UpdateAffectationStatusDTO updateStatusDTO) {
        String resultMessage = affectationService.updateStatus(
                updateStatusDTO.getAffectationId(),
                updateStatusDTO.getStatus(),
                updateStatusDTO.getCommandeId()
        );
        return ResponseEntity.ok(resultMessage);
}


    // Afficher tous les notifications
    @GetMapping("/{livreurId}/notifications")
    public ResponseEntity<List<NotificationDTO>> getNotifications(@PathVariable Long livreurId) {
        List<NotificationDTO> notifications = livreurService.getNotificationByLivreurId(livreurId);
        return ResponseEntity.ok(notifications);
}


}