package com.agromind.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email bo'sh bo'lishi mumkin emas")
    @Email(message = "Noto'g'ri email kiritildi")
    private String email;

    @NotBlank(message = "Parol bo'sh bo'lishi mumkin emas")
    private String password;
}
