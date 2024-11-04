package com.abdos.amana_app.controller;

import com.abdos.amana_app.auth.RegistrationRequest;
import com.abdos.amana_app.dto.GestionnaireDTO;
import com.abdos.amana_app.dto.GestionnaireResponseDTO;
import com.abdos.amana_app.service.AdminService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Ajouter un Gestionnaire
    @PostMapping("/add-gestionnaire")
    public ResponseEntity<String> addGestionnaire(@RequestBody RegistrationRequest request) {
        try {
            String responseMessage = adminService.addGestionnaire(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseMessage);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'envoi de l'email.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur de validation : " + e.getMessage());
        }
    }

    // Afficher tous les gestionnaires
    @GetMapping("/gestionnaires")
    public ResponseEntity<List<GestionnaireDTO>> getAllGestionnaires() {
        List<GestionnaireDTO> gestionnaires = adminService.getAllGestionnaires();
        return ResponseEntity.ok(gestionnaires);
    }

    // Mettre à jour un Gestionnaire
    @PutMapping("/update-gestionnaire/{id}")
    public ResponseEntity<GestionnaireDTO> updateGestionnaire(@PathVariable Integer id,
                                                              @RequestBody GestionnaireDTO dto) {
        try {
            GestionnaireDTO updatedGestionnaire = adminService.updateGestionnaire(id, dto);
            return ResponseEntity.ok(updatedGestionnaire);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    // Supprimer un Gestionnaire
    @DeleteMapping("/delete-gestionnaire/{id}")
    public ResponseEntity<GestionnaireResponseDTO> deleteGestionnaire(@PathVariable Long id) {
        try {
            GestionnaireResponseDTO response = adminService.deleteGestionnaire(id);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GestionnaireResponseDTO(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GestionnaireResponseDTO("Erreur lors de la suppression du gestionnaire."));
 }
}
}
