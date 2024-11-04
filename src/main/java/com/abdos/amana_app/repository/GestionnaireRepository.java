package com.abdos.amana_app.repository;


import com.abdos.amana_app.model.Gestionnaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GestionnaireRepository extends JpaRepository<Gestionnaire, Long> {
    // Ajoutez ici des méthodes personnalisées si nécessaire
    Optional<Gestionnaire> findByUser_Email(String email);
}

