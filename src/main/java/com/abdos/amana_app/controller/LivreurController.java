package com.abdos.amana_app.controller;

import com.abdos.amana_app.dto.AffectationDTO;
import com.abdos.amana_app.dto.LivreurDTO;
import com.abdos.amana_app.dto.UpdateAffectationStatusDTO;
import com.abdos.amana_app.model.Affectation;
import com.abdos.amana_app.model.Livreur;
import com.abdos.amana_app.service.AffectationService;
import com.abdos.amana_app.service.LivreurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livreur")
public class LivreurController {

    @Autowired
    private AffectationService affectationService;
    private final LivreurService livreurService;

    public LivreurController(LivreurService livreurService) {
        this.livreurService = livreurService;
    }

    @GetMapping("/{livreurId}/affectations")
    public ResponseEntity<List<AffectationDTO>> getAffectations(@PathVariable Long livreurId) {
        List<AffectationDTO> affectations = affectationService.getAffectationsByLivreurId(livreurId);
        return ResponseEntity.ok(affectations);
    }

    // Endpoint pour mettre à jour le statut d'une affectation
    @PutMapping("/affectations/update-status")
    public ResponseEntity<String> updateStatus(@RequestBody UpdateAffectationStatusDTO updateStatusDTO) {
        affectationService.updateStatus(updateStatusDTO.getAffectationId(), updateStatusDTO.getStatus());
        return ResponseEntity.ok("Statut de l'affectation mis à jour avec succès");

}
    @GetMapping("/me")
    public ResponseEntity<LivreurDTO> getLivreurDetails() {
        Livreur livreur = livreurService.getLivreurByAuthenticatedUser();
        return ResponseEntity.ok(livreurService.convertToLivreurDTO(livreur));
}

}