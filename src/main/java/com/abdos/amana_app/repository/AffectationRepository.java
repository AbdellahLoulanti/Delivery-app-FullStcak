// AffectationRepository.java
package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Affectation;
import com.abdos.amana_app.model.Client;
import com.abdos.amana_app.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AffectationRepository extends JpaRepository<Affectation, Long> {
    // Ajoutez des méthodes de recherche personnalisées si nécessaire
    List<Affectation> findByLivreurId(Long livreurId);

    @Query("SELECT a FROM Affectation a WHERE a.commande.client = :client")
    List<Affectation> findByCommande_Client(@Param("client") Client client);

    Optional<Affectation> findByCommande(Commande commande);
    int countByStatus(Affectation.Status status);
    @Query("SELECT COUNT(a) FROM Affectation a WHERE a.status = com.abdos.amana_app.model.Affectation.Status.LIVRE")
    Long countByStatusLivre();
}
