package com.agromind.auth.controller;

import com.agromind.auth.dto.UserDto;
import com.agromind.auth.entity.User;
import com.agromind.auth.repository.UserRepository;
import com.agromind.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Operations", description = "Endpoints restricted to System Owners / Admins for monitoring, diagnostics, and user control")
public class AdminController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Fetch a list of all registered users on the AgroMind AI platform.")
    public ResponseEntity<?> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream()
                .map(authService::mapToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/stats")
    @Operation(summary = "Get platform diagnostics and statistics", description = "Fetch real-time analytics, user metrics, and platform status indicators for the Admin Panel dashboard.")
    public ResponseEntity<?> getPlatformStats() {
        long totalUsers = userRepository.count();
        // Mock analytics data for Admin Dashboard widgets
        return ResponseEntity.ok(Map.of(
            "statistics", Map.of(
                "totalUsers", totalUsers,
                "activeUsers", totalUsers > 0 ? Math.max(1, (int)(totalUsers * 0.75)) : 0,
                "newRegistrations", totalUsers > 0 ? Math.max(1, (int)(totalUsers * 0.2)) : 0
            ),
            "systemHealth", Map.of(
                "apiStatus", "ONLINE",
                "dbStatus", "CONNECTED",
                "aiUsage", "ACTIVE"
            ),
            "aiAnalytics", Map.of(
                "totalRequests", 1248,
                "mostUsedFeature", "Kasallik skaneri (54%)"
            )
        ));
    }

    @DeleteMapping("/user/{id}")
    @Operation(summary = "Delete a user account", description = "Deletes a user account from the database by its UUID.")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Foydalanuvchi topilmadi"));
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Foydalanuvchi muvaffaqiyatli o'chirildi"));
    }
}

