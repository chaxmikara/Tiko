package com.cham.backend.services.authentication;

import com.cham.backend.dto.SignupRequestDTO;
import com.cham.backend.dto.UserDto;
import com.cham.backend.entity.User;
import com.cham.backend.enums.UserRole;
import com.cham.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class AuthServiveImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    public UserDto signupClient(SignupRequestDTO signupRequestDTO){
        User user = new User();

        user.setName(signupRequestDTO.getName());
        user.setLastName(signupRequestDTO.getLastName());
        user.setEmail(signupRequestDTO.getEmail());
        user.setPhone(signupRequestDTO.getPhone());
        user.setPassword(signupRequestDTO.getPassword());

        user.setRole(UserRole.CLIENT);

        return userRepository.save(user).getDto();
    }

    public boolean presentByEmail(String email){
        return userRepository.findFirstByEmail(email) !=null;
    }
}
