// LivreurService.java
package com.abdos.amana_app.service;

import com.abdos.amana_app.dto.LivreurDTO;
import com.abdos.amana_app.dto.LivreurUpdateDTO;
import com.abdos.amana_app.dto.NotificationDTO;
import com.abdos.amana_app.mapper.MapperUtil;
import com.abdos.amana_app.model.Livreur;
import com.abdos.amana_app.model.User;
import com.abdos.amana_app.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LivreurService {

    private final LivreurRepository livreurRepository;
    private final UserRepository userRepository;
    private final ProvincePostalCodeRepository provincePostalCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;

    @Transactional
    public void updateLivreur(Long id, LivreurUpdateDTO updatedLivreurDTO) {
        Optional<Livreur> livreurOpt = livreurRepository.findById(id);

        if (livreurOpt.isPresent()) {
            Livreur livreur = livreurOpt.get();
            User user = livreur.getUser();

            // Mise à jour des champs de l'utilisateur et du livreur
            if (updatedLivreurDTO.getNom() != null) {
                user.setNom(updatedLivreurDTO.getNom());
            }
            if (updatedLivreurDTO.getTelephone() != null) {
                livreur.setTelephone(updatedLivreurDTO.getTelephone());
            }
            if (updatedLivreurDTO.getProvincePostalCodeId() != null) {
                provincePostalCodeRepository.findById(updatedLivreurDTO.getProvincePostalCodeId())
                        .ifPresent(livreur::setProvincePostalCode);
            }
            if (updatedLivreurDTO.getEmail() != null) {
                user.setEmail(updatedLivreurDTO.getEmail());
            }
            if (updatedLivreurDTO.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(updatedLivreurDTO.getPassword()));
            }
            user.setAccountLocked(updatedLivreurDTO.isAccountLocked());

            // Sauvegarde des modifications
            livreurRepository.save(livreur);
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Livreur non trouvé");
        }
    }

    public Livreur getLivreurByAuthenticatedUser() {
        String email = getAuthenticatedUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé pour l'email : " + email));

        if (user.getLivreur() == null) {
            throw new EntityNotFoundException("Livreur non trouvé pour l'utilisateur : " + email);
        }

        return user.getLivreur();
    }

    private String getAuthenticatedUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            throw new IllegalStateException("Utilisateur non authentifié.");
        }
    }

    public LivreurDTO convertToLivreurDTO(Livreur livreur) {
        LivreurDTO livreurDTO = new LivreurDTO();
        livreurDTO.setUserId(livreur.getUser().getUserId());
        livreurDTO.setNom(livreur.getUser().getNom());
        livreurDTO.setEmail(livreur.getUser().getEmail());
        return livreurDTO;

    }
    public void deleteLivreur(Long id) {
        if (!livreurRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Livreur non trouvé");
        }
        livreurRepository.deleteById(id);
        tokenRepository.deleteTokenByUserId(id);
        userRepository.deleteById(id);
    }

    @Autowired
    private NotificationRepository notificationRepository;

    public List<NotificationDTO> getNotificationByLivreurId(Long livreurId) {
        return notificationRepository.findByUserId(livreurId)
                .stream()
                .map(MapperUtil::toNotificationDTO)
                .collect(Collectors.toList());
}

}
