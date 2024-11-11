package com.cham.backend.repository;

import com.cham.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository


public interface UserRepository extends JpaRepository<User, Long> { //this is child class of the parent class.
                                                                    //JpaRepository is the parent class(This should be import)
                                                                    //<User is primary key , it's data type>
    User findFirstByEmail(String email);

}
