package com.cham.backend.services.authentication;

import com.cham.backend.dto.SignupRequestDTO;
import com.cham.backend.dto.UserDto;

public interface AuthService {
    UserDto signupClient(SignupRequestDTO signupRequestDTO);
    UserDto signupCompany(SignupRequestDTO signupRequestDTO);
    Boolean presentByEmail(String email);
}