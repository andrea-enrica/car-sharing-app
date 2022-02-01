package com.siemens.carsharing.service;

import com.siemens.carsharing.model.User;
import com.siemens.carsharing.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
class DefaultUserServiceTest {

    @Mock
    private UserRepository userRepository;

    UserService userService;

    @BeforeEach
    void initUseCase() {
        userService = new DefaultUserService(userRepository);
    }

    @Test
    void saveUser() {
        User user = new User("User","Test","userTest@gmail.com","parola","userTest");

        when(userRepository.save(user)).thenReturn(user);

        User savedUser = userRepository.save(user);
        assertThat(savedUser.getUsername()).isEqualTo("userTest");
    }

    @Test
    void getUserById() {
        User user = new User("User","Test","userTest@gmail.com","parola","userTest");

        when(userRepository.getById(1L)).thenReturn(user);

        User fetchedUser  = userRepository.getById(1L);
        assertThat(fetchedUser.getEmail()).isEqualTo("userTest@gmail.com");
    }
}
