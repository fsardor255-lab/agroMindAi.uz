package com.agromind.auth.config;

import com.agromind.auth.entity.AuthProvider;
import com.agromind.auth.entity.Role;
import com.agromind.auth.entity.User;
import com.agromind.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class AdminSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Creates a default admin user on application startup if it does not already exist.
     * Username: asroradmin
     * Email: asroradmin@gmail.com
     * Password: ilhomhamdamarguba (stored as BCrypt hash)
     * Role: ADMIN
     * AuthProvider: LOCAL
     */
    @Bean
    public CommandLineRunner seedAdminUser() {
        return args -> {
            String adminUsername = "asroradmin";
            String adminEmail = "asroradmin@gmail.com";
            String rawPassword = "ilhomhamdamarguba";

            // If the user with old email 'asroradmin' exists, update it to 'asroradmin@gmail.com' for compatibility
            userRepository.findByEmail("asroradmin").ifPresent(existingAdmin -> {
                existingAdmin.setEmail(adminEmail);
                userRepository.save(existingAdmin);
                log.info("✅ Existing admin user email updated from 'asroradmin' to '{}'", adminEmail);
            });

            boolean exists = userRepository.findByEmail(adminEmail).isPresent();
            if (!exists) {
                String encodedPassword = passwordEncoder.encode(rawPassword);
                User admin = User.builder()
                        .username(adminUsername)
                        .email(adminEmail)
                        .password(encodedPassword)
                        .role(Role.ADMIN)
                        .authProvider(AuthProvider.LOCAL)
                        .build();
                userRepository.save(admin);
                log.info("✅ Default admin user created: email='{}'", adminEmail);
            } else {
                log.info("🛈 Admin user already exists with email '{}'; seeding skipped.", adminEmail);
            }
        };
    }
}
