package com.service.findservice.controller;

import com.alibaba.fastjson.JSON;
import com.service.findservice.entity.ClientServer;
import com.service.findservice.entity.ClientServerInfo;
import com.service.findservice.entity.Server;
import com.service.findservice.server.ClientServerService;
import com.service.findservice.server.OrderService;
import com.service.findservice.server.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ClientServer")
public class ClientServerController {
    @Autowired
    private ClientServerService clientServerService;

    @Autowired
    private ServerService serverService;

    @Autowired
    private OrderService orderService;

    @ResponseBody
    @GetMapping(path = "/servers", produces = "application/json")
    public String getTrustServerByClientId(@RequestParam(name = "clientId") String clientId) {
        List<ClientServer> clientServers = clientServerService.findServerByClientId(clientId);
        List<ClientServerInfo> clientServerInfos = new ArrayList<>();
        for (ClientServer clientServer : clientServers) {
            Server server = serverService.findServerById(clientServer.getServerId());
            Integer directServeTimes = orderService.findDirectCountById(clientId, server.getServerId()).size();
            Integer mandatorServeTimes = orderService.findMandatorCountById(clientId, server.getServerId()).size();
            clientServerInfos.add(new ClientServerInfo(server, clientServer, directServeTimes, mandatorServeTimes));
        }
        return JSON.toJSONString(clientServerInfos);
    }

    @ResponseBody
    @PostMapping(path = "/updateInfo", produces = "application/json")
    public String updateComment(@RequestParam(name = "client_id") String clientId,
                                @RequestParam(name = "server_id") String serverId,
                                @RequestParam(name = "client_comment", required = false) String clientComment,
                                @RequestParam(name = "server_comment", required = false) String serverComment) {
        return JSON.toJSONString(clientServerService.updateByClientAndServerSelective(clientId, serverId, clientComment, serverComment));
    }

    @ResponseBody
    @PostMapping(path = "/deleteInfo", produces = "application/json")
    public String deleteClientServer(@RequestParam(name = "client_id") String clientId,
                                     @RequestParam(name = "server_id") String serverId) {
        return JSON.toJSONString(clientServerService.deleteByClientAndServer(clientId, serverId));
    }
}
