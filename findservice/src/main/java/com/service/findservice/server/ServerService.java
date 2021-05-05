package com.service.findservice.server;

import com.service.findservice.dao.ServerMapper;
import com.service.findservice.entity.Order;
import com.service.findservice.entity.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerService {

    @Autowired
    private ServerMapper serverMapper;

    public Server findServerById(String serverId){
        return serverMapper.selectByServerId(serverId);
    }

    public List<Server> findServersByClientId(String clientId){
        return serverMapper.selectServersByClientId(clientId);
    }

    public int addServer(Server server){
        return serverMapper.insert(server);
    }

    public int selectManOrderNum(String server_id){
        return serverMapper.selectManOrderNum(server_id);
    }

    public int selectOrderNum(String server_id){
        return serverMapper.selectOrderNum(server_id);
    }

    public int selectUnFinOrderNum(String server_id){
        return serverMapper.selectUnFinOrderNum(server_id);
    }

    public Server selectServerByOId(int order_id){
        return serverMapper.selectServerByOId(order_id);
    }
}
