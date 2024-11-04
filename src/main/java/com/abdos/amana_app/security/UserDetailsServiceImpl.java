package com.abdos.amana_app.security;

import com.abdos.amana_app.model.User;  // Assurez-vous que votre modèle Utilisateur est importé
import com.abdos.amana_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository repository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Utilisation de Optional pour gérer le cas où l'utilisateur n'existe pas
        User user = repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        // Retourner un objet UserDetails avec les informations de l'utilisateur
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
        Collections.singleton(new SimpleGrantedAuthority(user.getRole().name())) // Map le rôle de l'utilisateur

        );

    }
}
