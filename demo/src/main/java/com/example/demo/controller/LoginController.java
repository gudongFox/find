package com.example.demo.controller;

import com.example.demo.entity.Server;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * @author liudong
 * @create 2021-$46-29-15:46
 */
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    LoginService loginService;

    @RequestMapping("/save")
    public Server save(int id, String name){
        Server s = loginService.save(id, name);
        return s;
    }

    @RequestMapping("/login")
    public String getUserInfo(String code) throws IOException {
        String userInfo = loginService.getUserInfo(code);
        return userInfo;
    }
}
