package com.agromind.auth.service;

import com.agromind.auth.dto.*;
import com.agromind.auth.entity.AuthProvider;
import com.agromind.auth.entity.Role;
import com.agromind.auth.entity.User;
import com.agromind.auth.repository.UserRepository;
import com.agromind.auth.security.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${app.google.client-id}")
    private String googleClientId;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Ushbu email allaqachon ro'yxatdan o'tgan");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Ushbu foydalanuvchi nomi allaqachon band");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.FARMER)
                .authProvider(AuthProvider.LOCAL)
                .build();

        User savedUser = userRepository.save(user);
        String jwtToken = generateTokenWithClaims(savedUser);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(mapToDto(savedUser))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // Authenticate using the configured authentication manager
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Noto'g'ri login yoki parol"));

        String jwtToken = generateTokenWithClaims(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(mapToDto(user))
                .build();
    }

    public AuthResponse loginWithGoogle(GoogleLoginRequest request) {
        GoogleIdToken.Payload payload;
        try {
            payload = verifyGoogleToken(request.getIdToken());
        } catch (Exception e) {
            log.error("Google ID Token verification failed: {}", e.getMessage());
            throw new IllegalArgumentException("Google ID Token tekshirishda xatolik yuz berdi: " + e.getMessage());
        }

        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        
        Optional<User> existingUserOpt = userRepository.findByEmail(email);
        User user;

        if (existingUserOpt.isPresent()) {
            user = existingUserOpt.get();
            // In case user registered locally first, we link them or let them log in
            if (user.getAuthProvider() != AuthProvider.GOOGLE) {
                user.setAuthProvider(AuthProvider.GOOGLE);
            }
            // Always update the picture from Google
            if (pictureUrl != null) {
                user.setPictureUrl(pictureUrl);
            }
            user = userRepository.save(user);
        } else {
            // Generate a random username or base it on name
            String baseUsername = name != null ? name.toLowerCase().replaceAll("\\s+", "") : email.split("@")[0];
            String username = baseUsername;
            int count = 1;
            while (userRepository.existsByUsername(username)) {
                username = baseUsername + count++;
            }

            user = User.builder()
                    .username(username)
                    .email(email)
                    .role(Role.FARMER)
                    .authProvider(AuthProvider.GOOGLE)
                    .pictureUrl(pictureUrl)
                    .build();

            user = userRepository.save(user);
        }

        String jwtToken = generateTokenWithClaims(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(mapToDto(user))
                .build();
    }

    private GoogleIdToken.Payload verifyGoogleToken(String idTokenString) throws Exception {
        // Build verifier
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken != null) {
            return idToken.getPayload();
        } else {
            throw new IllegalArgumentException("Google ID token tekshirishda xatolik yuz berdi (token xato, muddati o'tgan yoki soxta)");
        }
    }

    private String generateTokenWithClaims(User user) {
        java.util.Map<String, Object> extraClaims = new java.util.HashMap<>();
        extraClaims.put("userId", user.getId().toString());
        extraClaims.put("role", user.getRole().name());
        extraClaims.put("email", user.getEmail());
        return jwtService.generateToken(extraClaims, user);
    }

    public UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .authProvider(user.getAuthProvider())
                .createdAt(user.getCreatedAt())
                .pictureUrl(user.getPictureUrl())
                .build();
    }
}
