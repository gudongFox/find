package com.example.demo.service;


import com.example.demo.dao.ServerMapper;
import com.example.demo.entity.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServerService {

    @Autowired
    private ServerMapper serverMapper;

    public Server findServerBySId(int server_id){
        return serverMapper.selectServerById(server_id);
    }


}
