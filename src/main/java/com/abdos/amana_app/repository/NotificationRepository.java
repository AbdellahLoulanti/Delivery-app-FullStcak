
package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Exemple de méthode pour trouver les notifications par utilisateur et type de utilisateur
    List<Notification> findByUserIdAndUserType(Long userId, Notification.UserType userType);
}

