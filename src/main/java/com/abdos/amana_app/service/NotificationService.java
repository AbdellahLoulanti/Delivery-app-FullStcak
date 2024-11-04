package com.abdos.amana_app.service;

import com.abdos.amana_app.model.Notification;
import com.abdos.amana_app.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createLivreurNotification(Long livreurId, String message) {
        Notification notification = new Notification();
        notification.setUserId(livreurId);
        notification.setUserType(Notification.UserType.LIVREUR);
        notification.setMessage(message);
        notification.setDateEnvoi(LocalDateTime.now());

        notificationRepository.save(notification);
    }
    public void createClientNotification(Long clientId, String message) {
        Notification notification = new Notification();
        notification.setUserId(clientId);
        notification.setUserType(Notification.UserType.CLIENT);
        notification.setMessage(message);
        notification.setDateEnvoi(LocalDateTime.now());

        notificationRepository.save(notification);
}
}