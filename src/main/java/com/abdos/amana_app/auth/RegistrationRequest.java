package com.abdos.amana_app.auth;

import com.abdos.amana_app.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {

    // Champs communs à tous les utilisateurs
    @NotEmpty(message = "Le nom est obligatoire")
    @NotNull(message = "Le nom est obligatoire")
    private String nom;

    @Email(message = "Le format de l'email est incorrect")
    @NotEmpty(message = "L'email est obligatoire")
    @NotNull(message = "L'email est obligatoire")
    private String email;

    @NotEmpty(message = "Le mot de passe est obligatoire")
    @NotNull(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;

    @NotNull(message = "Le rôle est obligatoire")
    private Role role;

    // Champs pour le client uniquement
    private String adresse; // Non obligatoire, seulement pour les clients

    private String telephone; // Optionnel selon le rôle

    private String codePostal; // Optionnel selon le rôle

    // Méthode pour valider les champs selon le rôle
    public boolean isValidForRole() {
        switch (role) {
            case CLIENT:
                return adresse != null && !adresse.isEmpty() &&
                        telephone != null && !telephone.isEmpty() &&
                        codePostal != null && !codePostal.isEmpty();
            case LIVREUR:
                return telephone != null && !telephone.isEmpty() &&
                        codePostal != null && !codePostal.isEmpty();
            case GESTIONNAIRE:
            case ADMIN:
                return true; // Pas d'autres champs spécifiques pour ces rôles
            default:
                return false;
        }
    }
}
