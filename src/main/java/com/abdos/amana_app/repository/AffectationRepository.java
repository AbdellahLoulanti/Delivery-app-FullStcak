// AffectationRepository.java
package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Affectation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AffectationRepository extends JpaRepository<Affectation, Long> {
    // Ajoutez des méthodes de recherche personnalisées si nécessaire
}
