package com.cham.backend.controller;

import com.cham.backend.dto.AuthResponse;
import com.cham.backend.entity.User;
import com.cham.backend.service.UserService;
import com.cham.backend.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import security.JwtTokenProvider;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword())
        );

        // if authentication is successful, set the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // get the authenticated user
        String currentUsername = authentication.getName();
        Optional<User> user = userService.findByUsername(currentUsername);

        if (user.isPresent()) {
            // create a response with the token and role
            String role = user.get().getRole();
            String token = JwtTokenProvider.generateToken(currentUsername, role);

            return ResponseEntity.ok(new AuthResponse(token, role));
        }

        return ResponseEntity.badRequest().build();
    }
}
