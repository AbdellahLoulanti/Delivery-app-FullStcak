package com.abdos.amana_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.abdos.amana_app.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
    // Vous pouvez ajouter des méthodes spécifiques si besoin
}
