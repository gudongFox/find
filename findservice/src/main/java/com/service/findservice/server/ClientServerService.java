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

    public List<ClientServer> findServerByClientId(String clientId) {
        return clientServerMapper.selectServersByClientId(clientId);
    }

    public int updateByClientAndServerSelective(String clientId, String serverId, String clientComment, String serverComment) {
        ClientServer clientServer = new ClientServer();
        clientServer.setClientId(clientId);
        clientServer.setServerId(serverId);
        clientServer.setClientComment(clientComment);
        clientServer.setServerComment(serverComment);
        return clientServerMapper.updateByClientAndServerSelective(clientServer);
    }

    public int deleteByClientAndServer(String clientId, String serverId) {
        ClientServer clientServer = new ClientServer();
        clientServer.setClientId(clientId);
        clientServer.setServerId(serverId);
        return clientServerMapper.deleteByClientAndServer(clientServer);
    }
}
