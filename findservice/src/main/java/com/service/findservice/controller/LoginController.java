package com.service.findservice.controller;

import com.service.findservice.entity.Server;
import com.service.findservice.server.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/login")
public class LoginController {


    @Autowired
    LoginService loginService;

    @RequestMapping("/save")
    public Server save(String id, String name) {
        Server s = loginService.save(id, name);
        return s;
    }

    @RequestMapping("/login")
    public String getUserInfo(String code) throws IOException {
        String userInfo = loginService.getUserInfo(code);
        return userInfo;
    }
}