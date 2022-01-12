package com.siemens.carsharing.service;

import com.siemens.carsharing.dto.UserData;
import com.siemens.carsharing.model.User;
import com.siemens.carsharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class DefaultUserService implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserData saveUser(UserData user) {
        User userModel = populateUserEntity(user);
        return populateUserData(userRepository.save(userModel));
    }

    @Override
    public boolean deleteUser(Long userId) {
        return false;
    }

    @Override
    public List<UserData> getAllUsers() {
        return null;
    }

    @Override
    public UserData getUserById(Long userId) {
        User user = userRepository.getById(userId);
        return populateUserData(user);
    }

    private UserData populateUserData(User userEntityToObject) {
        UserData userData = new UserData();
        userData.setId(userEntityToObject.getIdUser());
        userData.setFirstName(userEntityToObject.getFirstName());
        userData.setLastName(userEntityToObject.getLastName());
        userData.setEmail(userEntityToObject.getEmail());
        return userData;
    }

    private User populateUserEntity(UserData userData) {
        User user = new User();
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setUsername(userData.getUsername());
        user.setEmail(userData.getEmail());
        user.setPassword(userData.getPassword());
        return user;
    }
}
