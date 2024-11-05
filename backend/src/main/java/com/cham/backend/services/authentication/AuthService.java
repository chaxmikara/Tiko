package com.cham.backend.services.authentication;

import com.cham.backend.dto.SignupRequestDTO;
import com.cham.backend.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    boolean presentByEmail(String email);
    UserDto signupClient(SignupRequestDTO signupRequestDTO);
}

