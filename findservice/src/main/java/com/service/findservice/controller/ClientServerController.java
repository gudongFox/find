package com.service.findservice.controller;

import com.alibaba.fastjson.JSON;
import com.service.findservice.entity.ClientServer;
import com.service.findservice.entity.ClientServerInfo;
import com.service.findservice.entity.Server;
import com.service.findservice.result.ResultBody;
import com.service.findservice.result.ResultCode;
import com.service.findservice.server.ClientServerService;
import com.service.findservice.server.OrderService;
import com.service.findservice.server.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/client_server")
public class ClientServerController {
    @Autowired
    private ClientServerService clientServerService;

    @Autowired
    private ServerService serverService;

    @Autowired
    private OrderService orderService;

    @ResponseBody
    @GetMapping(path = "/info", produces = "application/json")
    public String getTrustServerByClientId(@RequestParam(name = "client_id") String clientId) {
        List<ClientServer> clientServers = clientServerService.selectClientServerInfoByClientId(clientId);
        List<ClientServerInfo> clientServerInfos = new ArrayList<>();
        for (ClientServer clientServer : clientServers) {
            Server server = serverService.findServerById(clientServer.getServerId());
            Integer directServeTimes = orderService.findDirectCountById(clientId, server.getServerId()).size();
            Integer mandatorServeTimes = orderService.findMandatorCountById(clientId, server.getServerId()).size();
            clientServerInfos.add(new ClientServerInfo(server, clientServer, directServeTimes, mandatorServeTimes));
        }
        return JSON.toJSONString(new ResultBody(ResultCode.SUCCESS, clientServerInfos));
    }

    @ResponseBody
    @PatchMapping(path = "/info", produces = "application/json")
    public String updateClientServerInfo(@RequestBody ClientServer record) {
        if (null == record.getClientId() || null == record.getServerId()) {
            return JSON.toJSONString(new ResultBody(ResultCode.FAIL));
        }
        int res = clientServerService.updateByClientIdAndServerIdSelective(record);
        return res > 0 ? JSON.toJSONString(new ResultBody(ResultCode.SUCCESS)) : JSON.toJSONString(new ResultBody(ResultCode.FAIL));
    }

    @ResponseBody
    @DeleteMapping(path = "/info", produces = "application/json")
    public String deleteClientServerInfo(@RequestParam(name = "clientId") String clientId,
                                         @RequestParam(name = "serverId") String serverId) {
        if (null == clientId || null == serverId) {
            return JSON.toJSONString(new ResultBody(ResultCode.FAIL));
        }
        int res = clientServerService.deleteByClientIdAndServerId(new ClientServer(clientId, serverId));
        return res > 0 ? JSON.toJSONString(new ResultBody(ResultCode.SUCCESS)) : JSON.toJSONString(new ResultBody(ResultCode.FAIL));
    }

    @ResponseBody
    @PostMapping(path = "/info", produces = "application/json")
    public String createClientServerInfo(@RequestBody ClientServer record){
        if (null == record.getClientId() || null == record.getServerId()) {
            return JSON.toJSONString(new ResultBody(ResultCode.FAIL));
        }
        int res = clientServerService.insertByClientIdAndServerId(record);
        return res > 0 ? JSON.toJSONString(new ResultBody(ResultCode.SUCCESS)) : JSON.toJSONString(new ResultBody(ResultCode.FAIL));
    }
}
