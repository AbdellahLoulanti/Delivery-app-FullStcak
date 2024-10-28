package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Integer> {
    // Ajoutez ici des méthodes personnalisées si nécessaire
}

