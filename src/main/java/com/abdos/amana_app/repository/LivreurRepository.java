package com.abdos.amana_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.abdos.amana_app.model.Livreur;

public interface LivreurRepository extends JpaRepository<Livreur, Long> {
    // Vous pouvez ajouter des méthodes spécifiques si besoin
}

