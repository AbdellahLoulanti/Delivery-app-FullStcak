package com.abdos.amana_app.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationDTO {
    private Long id;
    private Long userId;
    private String message;
    private LocalDateTime dateEnvoi;
}