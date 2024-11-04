package com.cham.backend.dto;

import com.cham.backend.enums.UserRole;
import lombok.Data;

@Data

public class UserDto {
    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastName;

    private String phone;

    private UserRole role;

    public UserDto getDto() {
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setName(name);
        userDto.setEmail(email);
        userDto.setRole(role);

        return userDto;
    }
}
