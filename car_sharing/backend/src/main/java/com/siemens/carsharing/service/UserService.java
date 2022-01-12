package com.siemens.carsharing.service;

import com.siemens.carsharing.dto.UserData;
import com.siemens.carsharing.model.User;

import java.util.List;

public interface UserService {
    UserData saveUser(UserData user);

    boolean deleteUser(final Long userId);

    List<UserData> getAllUsers();

    UserData getUserById(final Long userId);

}
