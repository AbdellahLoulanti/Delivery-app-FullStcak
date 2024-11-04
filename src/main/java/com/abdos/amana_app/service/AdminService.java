package com.abdos.amana_app.service;

import com.abdos.amana_app.auth.RegistrationRequest;
import com.abdos.amana_app.dto.GestionnaireDTO;
import com.abdos.amana_app.dto.GestionnaireResponseDTO;
import com.abdos.amana_app.mapper.MapperUtil;
import com.abdos.amana_app.model.Gestionnaire;
import com.abdos.amana_app.model.Token;
import com.abdos.amana_app.model.User;
import com.abdos.amana_app.repository.GestionnaireRepository;
import com.abdos.amana_app.auth.AuthenticationService;
import com.abdos.amana_app.repository.TokenRepository;
import com.abdos.amana_app.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final RegionService regionService; // Ajoutez cette ligne
    private final GestionnaireRepository gestionnaireRepository;
    private final AuthenticationService authenticationService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    public AdminService(GestionnaireRepository gestionnaireRepository, AuthenticationService authenticationService,RegionService regionService,TokenRepository tokenRepository,UserRepository userRepository) {
        this.gestionnaireRepository = gestionnaireRepository;
        this.authenticationService = authenticationService;
        this.regionService=regionService;
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    // Ajouter un gestionnaire
    public String addGestionnaire(RegistrationRequest request) throws MessagingException {
        authenticationService.register(request);
        return "Gestionnaire ajouté avec succès. Un email d'activation a été envoyé.";
    }

    // Afficher tous les gestionnaires (retourne une liste de DTOs)
    public List<GestionnaireDTO> getAllGestionnaires() {
        List<Gestionnaire> gestionnaires = gestionnaireRepository.findAll();
        return gestionnaires.stream()
                .map(MapperUtil::toGestionnaireDTO)
                .collect(Collectors.toList());
    }
    // mettre a jour gestionnaire
    public GestionnaireDTO updateGestionnaire(long id, GestionnaireDTO dto) {
        Gestionnaire gestionnaire = gestionnaireRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Gestionnaire non trouvé"));

        // Mettez à jour les propriétés de gestionnaire à partir de DTO
        MapperUtil.updateGestionnaireFromDTO(gestionnaire, dto, regionService);

        // Enregistrez le gestionnaire mis à jour dans la base de données
        gestionnaireRepository.save(gestionnaire);

        // Retournez le DTO mis à jour
        return MapperUtil.toGestionnaireDTO(gestionnaire);
    }

    // supprimer gestionnaire
// Méthode pour supprimer un gestionnaire
    @Transactional
    public GestionnaireResponseDTO deleteGestionnaire(Long gestionnaireId) {
        Optional<Gestionnaire> gestionnaireOptional = gestionnaireRepository.findById(gestionnaireId);

        if (gestionnaireOptional.isPresent()) {
            Gestionnaire gestionnaire = gestionnaireOptional.get();
            User user = gestionnaire.getUser();

            // Supprimer les tokens associés à l'utilisateur
            List<Token> tokens = tokenRepository.findByUser(user);
            tokenRepository.deleteAll(tokens);

            // Supprimer le gestionnaire
            gestionnaireRepository.delete(gestionnaire);

            // Supprimer également l'utilisateur s'il n'est pas utilisé ailleurs
            userRepository.delete(user);

            return new GestionnaireResponseDTO("Gestionnaire et ses tokens supprimés avec succès.");
        } else {
            return new GestionnaireResponseDTO("Gestionnaire non trouvé.");
   }
}


}