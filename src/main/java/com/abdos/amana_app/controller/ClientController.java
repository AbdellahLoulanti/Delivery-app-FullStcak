package com.abdos.amana_app.controller;

import com.abdos.amana_app.dto.*;
import com.abdos.amana_app.model.Client;
import com.abdos.amana_app.model.Commande;
import com.abdos.amana_app.service.ClientService;
import com.abdos.amana_app.service.CommandeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;
    private final CommandeService commandeService;

    @GetMapping("/me")
    public ResponseEntity<ClientDTO> getClientDetails() {
        Client client = clientService.getClientByAuthenticatedUser();
        return ResponseEntity.ok(clientService.convertToClientDTO(client));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<ClientDTO> updateClientProfile(@RequestBody ClientUpdateDTO clientUpdateDTO) {

        Client client = clientService.updateProfile(clientUpdateDTO);
        ClientDTO clientDTO = clientService.convertToClientDTO(client);
        return ResponseEntity.ok(clientDTO);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        clientService.updatePassword(passwordChangeRequest.getOldPassword(), passwordChangeRequest.getNewPassword());
        return ResponseEntity.ok("Mot de passe mis à jour avec succès.");
    }


    @PostMapping("/create")
    public ResponseEntity<Commande> createCommande(@RequestBody CommandeDTO commandeDTO) {
        Commande commande = commandeService.createCommande(commandeDTO);
        return ResponseEntity.ok(commande);
    }

    @GetMapping("/historique")
    public ResponseEntity<List<CommandeHistoriqueDTO>> getHistoriqueCommandes() {
        List<CommandeHistoriqueDTO> historique = commandeService.getCommandeHistorique();
        return ResponseEntity.ok(historique);
    }

}
