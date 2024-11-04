package com.abdos.amana_app.service;

import com.abdos.amana_app.auth.AuthenticationService;
import com.abdos.amana_app.auth.RegistrationRequest;
import com.abdos.amana_app.dto.CommandeUpdateDTO;
import com.abdos.amana_app.dto.GestionnaireDTO;
import com.abdos.amana_app.model.*;
import com.abdos.amana_app.repository.*;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class GestionnaireService {

    private final AuthenticationService authenticationService;
    private final ProvincePostalCodeRepository provincePostalCodeRepository;
    private final CommandeRepository commandeRepository;
    private final LivreurRepository livreurRepository;
    private final AffectationRepository affectationRepository;
    private final GestionnaireRepository gestionnaireRepository;
    private final UserRepository userRepository;

    public GestionnaireService(AuthenticationService authenticationService,
                               ProvincePostalCodeRepository provincePostalCodeRepository,
                               CommandeRepository commandeRepository,
                               LivreurRepository livreurRepository,
                               AffectationRepository affectationRepository,
                               GestionnaireRepository gestionnaireRepository, UserRepository usuarioRepository, UserRepository userRepository) {
        this.authenticationService = authenticationService;
        this.provincePostalCodeRepository = provincePostalCodeRepository;
        this.commandeRepository = commandeRepository;
        this.livreurRepository = livreurRepository;
        this.affectationRepository = affectationRepository;
        this.gestionnaireRepository = gestionnaireRepository;

        this.userRepository = userRepository;
    }

    public Gestionnaire getGestionnaireByAuthenticatedUser() {
        String email = getAuthenticatedUserEmail(); // Récupère l'email de l'utilisateur authentifié
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé pour l'email : " + email));

        if (user.getGestionnaire() == null) {
            throw new EntityNotFoundException("Gestionnaire non trouvé pour l'utilisateur : " + email);
        }

        return user.getGestionnaire(); // Renvoie l'objet Gestionnaire associé à l'utilisateur
    }
    private String getAuthenticatedUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername(); // Renvoie l'email de l'utilisateur
        } else {
            throw new IllegalStateException("Utilisateur non authentifié."); // Lance une exception si l'utilisateur n'est pas authentifié
        }
    }
    public GestionnaireDTO convertToGestionnaireDTO(Gestionnaire gestionnaire) {
        User user = gestionnaire.getUser();  // Récupère l'utilisateur associé au gestionnaire
        String regionName = gestionnaire.getRegion() != null ? gestionnaire.getRegion().getRegionName() : null; // Récupère le nom de la région

        GestionnaireDTO gestionnaireDTO = new GestionnaireDTO();
        gestionnaireDTO.setNom(user.getNom());
        gestionnaireDTO.setUserId(gestionnaire.getUserId());
        gestionnaireDTO.setTelephone(gestionnaire.getTelephone());
        gestionnaireDTO.setRole(user.getRole().name()); // Récupère le rôle en tant que chaîne
        gestionnaireDTO.setEmail(user.getEmail());
        gestionnaireDTO.setRegion(regionName); // Récupère le nom de la région

        return gestionnaireDTO;
    }



    public ResponseEntity<String> addLivreur(RegistrationRequest request) {
        try {
            request.setRole(Role.LIVREUR);
            authenticationService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("Livreur ajouté avec succès. Un email d'activation a été envoyé.");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'envoi de l'email.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur de validation : " + e.getMessage());
        }
    }

    public ResponseEntity<String> updateCommande(Long id, CommandeUpdateDTO updatedCommandeDTO) {
        Optional<Commande> commandeOpt = commandeRepository.findById(id);
        if (commandeOpt.isPresent()) {
            Commande commande = commandeOpt.get();
            commande.setShippingAddress(updatedCommandeDTO.getShippingAddress());
            commande.setReceiverPhoneNumber(updatedCommandeDTO.getReceiverPhoneNumber());
            commande.setPackagePrice(updatedCommandeDTO.getPackagePrice());
            commande.setDeliveryPrice(updatedCommandeDTO.getDeliveryPrice());

            provincePostalCodeRepository.findById(updatedCommandeDTO.getProvincePostalCodeId())
                    .ifPresent(commande::setProvincePostalCode);

            commandeRepository.save(commande);
            return ResponseEntity.ok("Commande mise à jour avec succès.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Commande non trouvée");
        }
    }

    public List<Commande> getUnassignedCommandes() {
        return commandeRepository.findUnassignedCommandes();
    }

    public ResponseEntity<String> assignCommandeToLivreur(Long commandeId, Long livreurId, Long gestionnaireId) {
        Optional<Commande> commandeOpt = commandeRepository.findById(commandeId);
        Optional<Livreur> livreurOpt = livreurRepository.findById(livreurId);
        Optional<Gestionnaire> gestionnaireOpt = gestionnaireRepository.findById(gestionnaireId);

        if (commandeOpt.isPresent() && livreurOpt.isPresent() && gestionnaireOpt.isPresent()) {
            Affectation affectation = new Affectation();
            affectation.setCommande(commandeOpt.get());
            affectation.setLivreur(livreurOpt.get());
            affectation.setGestionnaire(gestionnaireOpt.get());
            affectation.setDateAffectation(LocalDate.now());
            affectation.setStatus(Affectation.Status.AFFECTE);

            affectationRepository.save(affectation);
            return ResponseEntity.ok("Commande assigned to Livreur successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Commande, Livreur, or Gestionnaire not found.");
        }
    }
}

