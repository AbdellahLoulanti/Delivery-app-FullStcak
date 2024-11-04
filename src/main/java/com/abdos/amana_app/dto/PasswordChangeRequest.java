package com.abdos.amana_app.dto;// PasswordChangeRequest.java
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeRequest {
    private String oldPassword;
    private String newPassword;
}



