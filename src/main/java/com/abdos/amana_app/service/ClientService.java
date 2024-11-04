package com.abdos.amana_app.service;

import com.abdos.amana_app.dto.ClientDTO;
import com.abdos.amana_app.dto.ClientUpdateDTO;
import com.abdos.amana_app.model.Client;
import com.abdos.amana_app.model.ProvincePostalCode;
import com.abdos.amana_app.model.User;
import com.abdos.amana_app.repository.ClientRepository;
import com.abdos.amana_app.repository.ProvincePostalCodeRepository;
import com.abdos.amana_app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProvincePostalCodeRepository provincePostalCodeRepository;

    public Client getClientByAuthenticatedUser() {
        String email = getAuthenticatedUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé pour l'email : " + email));

        if (user.getClient() == null) {
            throw new EntityNotFoundException("Client non trouvé pour l'utilisateur : " + email);
        }

        return user.getClient();
    }

    private String getAuthenticatedUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            throw new IllegalStateException("Utilisateur non authentifié.");
        }
    }

    public ClientDTO convertToClientDTO(Client client) {
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setUserId(client.getUser().getUserId());
        clientDTO.setNom(client.getUser().getNom());
        clientDTO.setEmail(client.getUser().getEmail());
        clientDTO.setAdresse(client.getAdresse());
        clientDTO.setTelephone(client.getTelephone());
        clientDTO.setCodePostal(client.getCodePostal());

        if (client.getProvincePostalCode() != null) {
            clientDTO.setProvinceName(client.getProvincePostalCode().getProvinceName());
            if (client.getProvincePostalCode().getRegion() != null) {
                clientDTO.setRegionName(client.getProvincePostalCode().getRegion().getRegionName());
            }
        }

        return clientDTO;
    }

    public Client updateProfile(ClientUpdateDTO clientUpdateDTO) {
        // Récupération de l'email de l'utilisateur authentifié
        String email = getAuthenticatedUserEmail();

        // Trouver le client par email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé pour l'email : " + email));
        Client client = user.getClient();

        // Appliquer les mises à jour
        if (clientUpdateDTO.getAdresse() != null) {
            client.setAdresse(clientUpdateDTO.getAdresse());
        }
        if (clientUpdateDTO.getTelephone() != null) {
            client.setTelephone(clientUpdateDTO.getTelephone());
        }
        if (clientUpdateDTO.getCodePostal() != null) {
            // Mettre à jour le code postal et la province correspondante
            client.setCodePostal(clientUpdateDTO.getCodePostal());
            ProvincePostalCode province = provincePostalCodeRepository
                    .findByPostalCodeRange(Integer.parseInt(clientUpdateDTO.getCodePostal()))
                    .orElseThrow(() -> new IllegalArgumentException("Province non trouvée pour le code postal : " + clientUpdateDTO.getCodePostal()));
            client.setProvincePostalCode(province);
        }


        // Sauvegarder les changements
        clientRepository.save(client);
        userRepository.save(user);

        return client;
    }

    public void updatePassword(String oldPassword, String newPassword) {
        Client client = getClientByAuthenticatedUser();
        User user = client.getUser();

        // Vérifiez que l'ancien mot de passe est correct
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("L'ancien mot de passe est incorrect.");
        }

        // Encodez et mettez à jour le nouveau mot de passe
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
