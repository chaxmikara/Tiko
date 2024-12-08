package com.cham.backend.entity;


import com.cham.backend.dto.UserDto;
import com.cham.backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;



@Entity
@Table(name = "users")
@Data

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //this means id automatically generate value when create a new one
    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastName;

    private String phone;

    private UserRole role;

    public UserDto getDto(){
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setName(name);
        userDto.setLastName(lastName);
        userDto.setEmail(email);
        userDto.setRole(role);

        return userDto;
    }


}
