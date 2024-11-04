package com.abdos.amana_app.auth;

import com.abdos.amana_app.email.EmailService;
import com.abdos.amana_app.email.EmailTemplateName;
import com.abdos.amana_app.model.*;
import com.abdos.amana_app.repository.RegionRepository;
import com.abdos.amana_app.repository.TokenRepository;
import com.abdos.amana_app.repository.UserRepository;
import com.abdos.amana_app.repository.ProvincePostalCodeRepository;
import com.abdos.amana_app.security.JwtService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    @Autowired
    private ProvincePostalCodeRepository provincePostalCodeRepository;
    @Autowired
    private RegionRepository regionRepository;

    @Value("${spring.application.security.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(RegistrationRequest request) throws MessagingException {
        Role userRole;
        try {
            userRole = Role.valueOf(request.getRole().toString());  // Correct usage of enum
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("Invalid role: " + request.getRole());
        }

        // Creating User directly if Lombok's @Builder isn't used
        var user = new User();
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAccountLocked(false);
        user.setEnabled(false);
        user.setRole(userRole);  // Assuming there's a single role field
        user.setCreatedDate(LocalDateTime.now());

        // Create and associate Client or Livreur
        if (userRole == Role.CLIENT) {
            var client = new Client();
            client.setUser(user); // Associate with User
            client.setAdresse(request.getAdresse());
            client.setTelephone(request.getTelephone());
            client.setCodePostal(request.getCodePostal());
            ProvincePostalCode province = provincePostalCodeRepository.findByPostalCodeRange(Integer.parseInt(request.getCodePostal()))
                    .orElseThrow(() -> new IllegalArgumentException("Province not found for POSTAL CODE : " + request.getProvinceId()));
            client.setProvincePostalCode(province);
            user.setClient(client); // Set Client in User
        } else if (userRole == Role.LIVREUR) {
            var livreur = new Livreur();
            livreur.setUser(user); // Associate with User
            livreur.setTelephone(request.getTelephone());
            // Find the ProvincePostalCode entity by ID and associate it with the livreur
            ProvincePostalCode province = provincePostalCodeRepository.findById(request.getProvinceId())
                    .orElseThrow(() -> new IllegalArgumentException("Province not found for ID: " + request.getProvinceId()));
            livreur.setProvincePostalCode(province);
            user.setLivreur(livreur); // Set Livreur in User
        }else if (userRole == Role.GESTIONNAIRE) {
            var gestionnaire = new Gestionnaire();
            gestionnaire.setUser(user); // Associate with User
            gestionnaire.setTelephone(request.getTelephone());

            // Find the Region entity by ID and associate it with the Gestionnaire
            Region region = regionRepository.findById(request.getRegionId())
                    .orElseThrow(() -> new IllegalArgumentException("Region not found for ID: " + request.getRegionId()));
            gestionnaire.setRegion(region); // Set Region for Gestionnaire
            user.setGestionnaire(gestionnaire); // Set Gestionnaire in User
        }

        userRepository.save(user);
        sendValidationEmail(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Authenticate the user
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Get the authenticated principal as UserDetails
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String email = userDetails.getUsername();

        // Load your custom User entity based on email
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Add any custom claims
        var claims = new HashMap<String, Object>();
        claims.put("fullName", user.getNom());

        // Generate the JWT token
        var jwtToken = jwtService.generateToken(claims, userDetails);  // Ensure generateToken accepts UserDetails

        // Return the response including user data
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail()) // Set the user email
                .role(user.getRole()) // Set the user role
                .build();
    }

    //@Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been sent to the same email address.");
        }

        var user = userRepository.findById(savedToken.getUser().getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        var token = new Token();
        token.setToken(generatedToken);
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiresAt(LocalDateTime.now().plusMinutes(15));
        token.setUser(user);
        tokenRepository.save(token);
        return generatedToken;
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getNom(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }
}
