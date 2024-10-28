// Notification.java
package com.abdos.amana_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false)
    private UserType userType;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "date_envoi", nullable = false)
    private LocalDateTime dateEnvoi;

    public enum UserType {
        CLIENT, LIVREUR
    }
}

