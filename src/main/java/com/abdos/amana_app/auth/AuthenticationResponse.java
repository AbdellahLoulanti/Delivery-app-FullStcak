package com.abdos.amana_app.auth;

import com.abdos.amana_app.model.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
    private String email;  // Add this line for user email
    private Role role;   // Add this line for user role
}
