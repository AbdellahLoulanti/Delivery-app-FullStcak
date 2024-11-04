// CommandeRepository.java
package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Client;
import com.abdos.amana_app.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    // Ajoutez des méthodes de recherche personnalisées si nécessaire
    @Query("SELECT c FROM Commande c WHERE c.id NOT IN (SELECT a.commande.id FROM Affectation a)")
    List<Commande> findUnassignedCommandes();
    List<Commande> findByClient(Client client);

    List<Commande> findByClientId(Long clientId);
    long count(); // Ajoute cette méthode pour compter le nombre de commandes

    @Query("SELECT c.client, COUNT(c) FROM Commande c GROUP BY c.client ORDER BY COUNT(c) DESC")
    List<Object[]> findTopCustomers();
    @Query("SELECT COUNT(a) FROM Affectation a WHERE a.dateLivraison >= :startDate AND a.status = com.abdos.amana_app.model.Affectation.Status.LIVRE")
    Long countDeliveredOrders(LocalDate startDate);

}

