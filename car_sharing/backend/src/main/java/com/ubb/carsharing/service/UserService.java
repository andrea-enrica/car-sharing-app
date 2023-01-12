package com.siemens.carsharing.service;

import com.siemens.carsharing.dto.UserData;

public interface UserService {
    UserData saveUser(UserData user);

    UserData getUserById(final Long userId);

}
