package com.agromind.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Foydalanuvchi nomi bo'sh bo'lishi mumkin emas")
    @Size(min = 3, max = 50, message = "Foydalanuvchi nomi 3 dan 50 tagacha belgidan iborat bo'lishi kerak")
    private String username;

    @NotBlank(message = "Email bo'sh bo'lishi mumkin emas")
    @Email(message = "Noto'g'ri email formati kiritildi")
    private String email;

    @NotBlank(message = "Parol bo'sh bo'lishi mumkin emas")
    @Size(min = 6, max = 100, message = "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
    private String password;

    private String phoneNumber;
}
