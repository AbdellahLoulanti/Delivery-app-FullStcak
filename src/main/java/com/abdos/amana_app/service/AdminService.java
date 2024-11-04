package com.abdos.amana_app.service;
import com.abdos.amana_app.service.RegionService;
import org.springframework.data.domain.Pageable;

import com.abdos.amana_app.auth.RegistrationRequest;
import com.abdos.amana_app.dto.AdminDTO;
import com.abdos.amana_app.dto.GestionnaireDTO;
import com.abdos.amana_app.dto.GestionnaireResponseDTO;
import com.abdos.amana_app.mapper.MapperUtil;
import com.abdos.amana_app.model.*;
import com.abdos.amana_app.repository.*;
import com.abdos.amana_app.auth.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final RegionService regionService; // Ajoutez cette ligne
    private final GestionnaireRepository gestionnaireRepository;
    private final AdminRepository adminRepository;
    private final AuthenticationService authenticationService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    public AdminService(GestionnaireRepository gestionnaireRepository, AuthenticationService authenticationService,RegionService regionService,TokenRepository tokenRepository,UserRepository userRepository,AdminRepository adminRepository,CommandeRepository commandeRepository) {
        this.gestionnaireRepository = gestionnaireRepository;
        this.authenticationService = authenticationService;
        this.regionService=regionService;
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.commandeRepository=commandeRepository;
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
    // Méthode pour obtenir le profil de l'administrateur connecté



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

    //prf
    public AdminDTO getAdminData() {
        // Récupérer l'utilisateur avec le rôle d'administrateur
        Optional<User> adminOptional = userRepository.findByRole(Role.ADMIN); // Remplacez Role.ADMIN par votre constante appropriée

        return adminOptional.map(user -> {
            AdminDTO adminDTO = new AdminDTO();
            adminDTO.setUserId(user.getUserId());
            adminDTO.setNom(user.getNom());
            adminDTO.setEmail(user.getEmail());
            adminDTO.setTelephone(user.getAdmin().getTelephone());




            // Récupérer le téléphone depuis le modèle Admin si nécessaire
            // adminDTO.setTelephone(user.getAdmin().getTelephone());
            return adminDTO;
        }).orElseThrow(() -> new RuntimeException("Aucun admin trouvé"));
    }

    public AdminDTO updateAdmin(long id, AdminDTO adminDTO) {
        User adminUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Administrateur non trouvé"));

        // Mettez à jour les propriétés de l'administrateur à partir du DTO
        adminUser.setNom(adminDTO.getNom());
        adminUser.setEmail(adminDTO.getEmail());
        Admin admin = adminUser.getAdmin();
        if (admin != null) {
            admin.setTelephone(adminDTO.getTelephone());
        } else {
            // Gérer le cas où l'administrateur est nul, par exemple, lancer une exception ou créer une nouvelle entité Admin
            throw new RuntimeException("Aucun admin associé trouvé pour cet utilisateur.");
        }        // Mettez à jour d'autres propriétés si nécessaire
        // Si vous avez d'autres entités associées, mettez à jour également leurs propriétés

        // Enregistrez l'administrateur mis à jour dans la base de données
        userRepository.save(adminUser);

        // Retournez le DTO mis à jour
        return MapperUtil.toAdminDTO(adminUser);
    }


    //stat
    @Autowired
    private CommandeRepository commandeRepository;


    @Autowired
    private AffectationRepository affectationRepository;

    public long getTotalCommandes() {
        return commandeRepository.count();
    }

    public long getTotalGestionnaires() {
        return gestionnaireRepository.count();
    }

    public double getTotalRevenu() {
        // Compter les affectations avec le statut "LIVRE" et multiplier par 40
        return affectationRepository.countByStatus(Affectation.Status.LIVRE) * 40;
    }





    public Map<String, Object> getAdminStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCommandes", getTotalCommandes());
        stats.put("totalGestionnaires", getTotalGestionnaires());
        stats.put("totalRevenu", getTotalRevenu());

        return stats;
    }



    public List<Map<String, Object>> getTopCustomers(int limit) {
        List<Object[]> results = commandeRepository.findTopCustomers(); // Appelle sans pageable

        List<Map<String, Object>> topCustomers = new ArrayList<>();

        for (int i = 0; i < Math.min(limit, results.size()); i++) {
            Object[] result = results.get(i);
            Client client = (Client) result[0]; // Assurez-vous que le type est correct
            long totalOrders = (long) result[1]; // Assurez-vous que cela correspond à votre requête

            Map<String, Object> customerData = new HashMap<>();
            customerData.put("name", client.getUser().getNom()); // Assurez-vous d'avoir une méthode getNom() dans l'entité Client
            customerData.put("totalSpent", totalOrders); // Ajustez ceci selon ce que vous souhaitez afficher
            topCustomers.add(customerData);
        }

        return topCustomers; // Retourner la liste des meilleurs clients
    }

    public BigDecimal calculateMonthlyRevenue() {
        // Déterminer la date 30 jours en arrière
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);

        // Compter le nombre de commandes livrées dans les 30 derniers jours
        Long deliveredCount = commandeRepository.countDeliveredOrders(thirtyDaysAgo);

        // Calculer le revenu
        BigDecimal deliveryFee = BigDecimal.valueOf(40); // Frais de livraison
        BigDecimal monthlyRevenue = BigDecimal.valueOf(deliveredCount).multiply(deliveryFee).multiply(BigDecimal.valueOf(30)); // 30 jours

        return monthlyRevenue;
}

}