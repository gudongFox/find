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

    public List<Client> selectByClientName(String clientName){
        return clientMapper.selectByClientName(clientName);
    }

    public List<Client> selectCByServerId(String serverId){
        return clientMapper.selectClientByServerId(serverId);
    }

    public Client selectClientById(String clientId){
        return clientMapper.selectByClientId(clientId);
    }

    public int updateClientInfo(Client client){
        return clientMapper.updateByPrimaryKeySelective(client);
    }
}
