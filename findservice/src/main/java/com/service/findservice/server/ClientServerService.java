package com.service.findservice.server;

import com.service.findservice.dao.ClientServerMapper;
import com.service.findservice.entity.ClientServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServerService {
    @Autowired
    private ClientServerMapper clientServerMapper;

    public List<ClientServer> selectClientServerInfoByClientId(String clientId) {
        return clientServerMapper.selectClientServersByClientId(clientId);
    }

    public int updateByClientIdAndServerIdSelective(ClientServer record) {
        return clientServerMapper.updateByClientIdAndServerIdSelective(record);
    }

    public int deleteByClientIdAndServerId(ClientServer record) {
        return clientServerMapper.deleteByClientIdAndServerId(record);
    }

    public int insertByClientIdAndServerId(ClientServer record) {
        return clientServerMapper.insertSelective(record);
    }
}
