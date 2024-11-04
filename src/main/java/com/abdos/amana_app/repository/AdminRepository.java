package com.abdos.amana_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.abdos.amana_app.model.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Vous pouvez ajouter des méthodes spécifiques si besoin
    Optional<Admin> findByUserId(Long userId);


}