package com.agromind.auth.dto;

import com.agromind.auth.entity.AuthProvider;
import com.agromind.auth.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID id;
    private String username;
    private String email;
    private String phoneNumber;
    private Role role;
    private AuthProvider authProvider;
    private LocalDateTime createdAt;
    private String pictureUrl;
}
