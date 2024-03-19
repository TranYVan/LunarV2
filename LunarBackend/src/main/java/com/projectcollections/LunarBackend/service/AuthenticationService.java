package com.projectcollections.LunarBackend.service;

import com.projectcollections.LunarBackend.controller.auth.AuthenticationRequest;
import com.projectcollections.LunarBackend.controller.auth.AuthenticationResponse;
import com.projectcollections.LunarBackend.controller.auth.RegisterRequest;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
