package com.service.findservice.server;

import com.service.findservice.dao.ClientMapper;
import com.service.findservice.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientMapper clientMapper;

    public Client findClientByCId(int client_id){ return clientMapper.selectClientByCId(client_id); };

}