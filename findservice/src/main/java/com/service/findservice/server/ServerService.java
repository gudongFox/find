package com.service.findservice.server;


import com.service.findservice.dao.ServerMapper;

import com.service.findservice.entity.Server;
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
