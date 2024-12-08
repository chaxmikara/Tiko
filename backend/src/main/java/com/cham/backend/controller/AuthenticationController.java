package com.cham.backend.controller;

import com.cham.backend.dto.AuthenticationRequest;
import com.cham.backend.dto.SignupRequestDTO;
import com.cham.backend.dto.UserDto;
import com.cham.backend.entity.User;
import com.cham.backend.repository.UserRepository;
import com.cham.backend.services.authentication.AuthService;
import com.cham.backend.services.jwt.UserDetailsServiceImpl;
import com.cham.backend.utill.JwtUtil;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController //api for the project
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    @Autowired
    private AuthService authService;


    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signupClient(@RequestBody SignupRequestDTO signupRequestDTO) {

        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Email already exists please enter another one!", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createUser =authService.signupClient(signupRequestDTO);
        return new ResponseEntity<>(createUser, HttpStatus.OK);
    }

    @PostMapping("/company/sign-up")
    public ResponseEntity<?> signupCompany(@RequestBody SignupRequestDTO signupRequestDTO) {

        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createUser =authService.signupCompany(signupRequestDTO);
        return new ResponseEntity<>(createUser, HttpStatus.OK);
    }

    @PostMapping({"/authenticate"})
//    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
//                                          HttpServletResponse response) throws IOException, JSONException {
//        try{
//            //it try to authenticate the user
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
//            );
//        }catch (BadCredentialsException e){
//            throw new BadCredentialsException("Wrong Input! Double check e-mail and password", e);
//        }
//
//        final UserDetails userDetails =userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
//
//        //JWT Token generation
//        final String jwt=jwtUtil.generateToken(userDetails.getUsername());
//        User user =userRepository.findFirstByEmail(authenticationRequest.getUsername());
//
//        response.getWriter().write(new JSONObject()
//                .put("userId",user.getId())
//                .put("role",user.getRole())
//                .toString()
//        );
//
//        // Add headers for JWT and CORS
//        response.addHeader("Access-Control-Expose-Headers", "Authorization");
//        response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
//        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
//    }
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,HttpServletResponse response) throws IOException, JSONException{
        System.out.println("Test");
    }
}
