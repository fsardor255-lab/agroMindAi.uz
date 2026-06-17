package com.agromind.auth.controller;

import com.agromind.auth.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Tag(name = "User Operations", description = "Endpoints accessible by registered farmers and system owners for profile and dashboards")
public class UserController {

    @GetMapping("/dashboard")
    @Operation(summary = "Get farmer dashboard metrics", description = "Fetch crop health status, irrigation details, and AI recommendations for the farmer panel.")
    public ResponseEntity<?> getDashboardData() {
        // Mock dashboard statistics for Farmer panel
        return ResponseEntity.ok(Map.of(
            "healthStatus", "92% sog'lom",
            "waterStatus", "Optimallashtirilgan",
            "aiAdvice", "Ekin barglarida sarg'ayish yo'q. Bugun sug'orish tavsiya etilmaydi.",
            "nextAction", "2 kundan keyin namlik darajasini tekshiring"
        ));
    }

    @GetMapping("/profile")
    @Operation(summary = "Get farmer profile metadata", description = "Fetch profile metadata of the currently authenticated user session.")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Avtorizatsiyadan o'tilmagan"));
        }
        return ResponseEntity.ok(Map.of(
            "username", user.getUsername(),
            "email", user.getEmail(),
            "phoneNumber", user.getPhoneNumber() != null ? user.getPhoneNumber() : "",
            "role", user.getRole().name(),
            "authProvider", user.getAuthProvider().name(),
            "createdAt", user.getCreatedAt().toString()
        ));
    }
}

