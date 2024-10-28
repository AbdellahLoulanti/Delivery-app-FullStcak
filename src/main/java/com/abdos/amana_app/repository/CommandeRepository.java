// CommandeRepository.java
package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    // Ajoutez des méthodes de recherche personnalisées si nécessaire
}

