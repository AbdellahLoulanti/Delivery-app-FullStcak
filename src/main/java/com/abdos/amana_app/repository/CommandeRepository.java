// CommandeRepository.java
package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Client;
import com.abdos.amana_app.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    // Ajoutez des méthodes de recherche personnalisées si nécessaire
    @Query("SELECT c FROM Commande c WHERE c.id NOT IN (SELECT a.commande.id FROM Affectation a)")
    List<Commande> findUnassignedCommandes();
    List<Commande> findByClient(Client client);

    List<Commande> findByClientId(Long clientId);

}

