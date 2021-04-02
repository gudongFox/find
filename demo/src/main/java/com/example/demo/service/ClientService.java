package com.example.demo.service;

import com.example.demo.dao.ClientMapper;
import com.example.demo.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientMapper clientMapper;

    public Client findClientByCId(int client_id){ return clientMapper.selectClientByCId(client_id); };

}
