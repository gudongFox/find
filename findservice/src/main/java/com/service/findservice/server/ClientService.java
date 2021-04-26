package com.service.findservice.server;

import com.service.findservice.dao.ClientMapper;
import com.service.findservice.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientMapper clientMapper;

    public List<Client> selectByClientName(String client_name){
        return clientMapper.selectByClientName(client_name);
    }

}
