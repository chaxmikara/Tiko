package com.cham.backend.controller;


import com.cham.backend.dto.SignupRequestDTO;
import com.cham.backend.dto.UserDto;
import com.cham.backend.services.authentication.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController //api for the project
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signupClient(@RequestBody SignupRequestDTO signupRequestDTO) {

        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createUser =authService.signupClient(signupRequestDTO);
        return new ResponseEntity<>(createUser, HttpStatus.OK);
    }

    @PostMapping("/company/sign-up")
    public ResponseEntity<?> signupCompany(@RequestBody SignupRequestDTO signupRequestDTO) {

        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createUser =authService.signupClient(signupRequestDTO);
        return new ResponseEntity<>(createUser, HttpStatus.OK);
    }
}
