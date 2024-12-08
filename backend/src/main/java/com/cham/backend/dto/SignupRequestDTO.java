package com.cham.backend.dto;

import com.cham.backend.enums.UserRole;
import lombok.Data;

@Data

public class SignupRequestDTO {

    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastName;

    private String phone;


}
