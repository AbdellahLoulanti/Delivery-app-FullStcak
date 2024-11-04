package com.abdos.amana_app.controller;

import com.abdos.amana_app.auth.RegistrationRequest;
import com.abdos.amana_app.dto.*;
import com.abdos.amana_app.model.*;
import com.abdos.amana_app.repository.GestionnaireRepository;
import com.abdos.amana_app.repository.LivreurRepository;
import com.abdos.amana_app.security.UserDetailsServiceImpl;
import com.abdos.amana_app.service.GestionnaireService;
import com.abdos.amana_app.service.LivreurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/gestionnaire")
public class GestionnaireController {

    private final GestionnaireService gestionnaireService;
    private final GestionnaireRepository gestionnaireRepository;
    private final LivreurService livreurService;
     private final LivreurRepository livreurRepository;

    public GestionnaireController(GestionnaireService gestionnaireService, GestionnaireRepository gestionnaireRepository, LivreurService livreurService, LivreurRepository livreurRepository) {
        this.gestionnaireService = gestionnaireService;
        this.gestionnaireRepository = gestionnaireRepository;
        this.livreurService = livreurService;
        this.livreurRepository = livreurRepository;
    }
    @GetMapping("/me")
    public ResponseEntity<GestionnaireDTO> getGestionnaireDetails() {
        Gestionnaire gestionnaire = gestionnaireService.getGestionnaireByAuthenticatedUser(); // Récupère le gestionnaire authentifié

        return ResponseEntity.ok(gestionnaireService.convertToGestionnaireDTO(gestionnaire));
    }

    @GetMapping("/livreurs")
    public ResponseEntity<List<LivreurDTO>> getAllLivreurs() {
        List<LivreurDTO> livreurs = livreurRepository.findAll()
                .stream()
                .map(Livreur::toLivreurDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(livreurs);
    }
    @PostMapping("/add-livreur")
    public ResponseEntity<String> addLivreur(@RequestBody RegistrationRequest request) {
        return gestionnaireService.addLivreur(request);
    }

    @PutMapping("/update-commande/{id}")
    public ResponseEntity<String> updateCommande(@PathVariable Long id, @RequestBody CommandeUpdateDTO updatedCommandeDTO) {
        return gestionnaireService.updateCommande(id, updatedCommandeDTO);
    }

    @GetMapping("/unassigned-commandes")
    public ResponseEntity<List<Commande>> getUnassignedCommandes() {
        List<Commande> unassignedCommandes = gestionnaireService.getUnassignedCommandes();
        return ResponseEntity.ok(unassignedCommandes);
    }

    @PostMapping("/assign-commande/{commandeId}/livreur/{livreurId}")
    public ResponseEntity<String> assignCommandeToLivreur(
            @PathVariable Long commandeId,
            @PathVariable Long livreurId,
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        // Récupérez le gestionnaire en fonction de l'email de l'utilisateur connecté
        Gestionnaire gestionnaire = gestionnaireRepository.findByUser_Email(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Gestionnaire not found for user email: " + userDetails.getUsername()));

        Long gestionnaireId = gestionnaire.getUserId();  // Récupère l'ID de l'utilisateur connecté
        return gestionnaireService.assignCommandeToLivreur(commandeId, livreurId, gestionnaireId);
    }


    // Mettre à jour un livreur
    @PutMapping("/update-livreur/{id}")
    public ResponseEntity<String> updateLivreur(@PathVariable Long id, @RequestBody LivreurUpdateDTO updatedLivreurDTO) {
        try {
            livreurService.updateLivreur(id, updatedLivreurDTO);
            return ResponseEntity.ok("Livreur mis à jour avec succès.");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @DeleteMapping("/drop-livreur/{id}")
    public ResponseEntity<String> deleteLivreur(@PathVariable Long id) {
        try {
            livreurService.deleteLivreur(id);
            return ResponseEntity.ok("Livreur supprimé avec succès.");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }


}
