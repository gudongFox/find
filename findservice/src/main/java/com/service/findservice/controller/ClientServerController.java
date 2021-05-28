package com.service.findservice.controller;

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

    /**
     * 通过client id得到信赖的服务人员信息
     *
     * @param clientId client id
     * @return List<ClientServer>
     */
    @GetMapping(path = "/info")
    public ResultBody getTrustServerByClientId(@RequestParam(name = "clientId") String clientId) {
        List<ClientServer> clientServers = clientServerService.selectClientServerInfoByClientId(clientId);
        if (null == clientServers) {
            return new ResultBody(ResultCode.FAIL);
        }
        List<ClientServerInfo> clientServerInfos = new ArrayList<>();
        for (ClientServer clientServer : clientServers) {
            Server server = serverService.findServerById(clientServer.getServerId());
            Integer directServeTimes = orderService.findDirectCountById(clientId, server.getServerId()).size();
            Integer mandatorServeTimes = orderService.findMandatorCountById(clientId, server.getServerId()).size();
            clientServerInfos.add(new ClientServerInfo(server, clientServer, directServeTimes, mandatorServeTimes));
        }
        return new ResultBody(ResultCode.SUCCESS, clientServerInfos);
    }

    /**
     * 更新ClientServer的部分信息
     *
     * @param record ClientServer information
     * @return 200->success 400->fail
     */
    @PutMapping(path = "/info")
    public ResultBody updateClientServerInfo(@RequestBody ClientServer record) {
        if (null == record || (null == record.getClientId() || null == record.getServerId())) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = clientServerService.updateByClientIdAndServerIdSelective(record);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }

    /**
     * 删除ClientServer的信息
     *
     * @param clientId client id
     * @param serverId server id
     * @return 200->success 400->fail
     */
    @DeleteMapping(path = "/info")
    public ResultBody deleteClientServerInfo(@RequestParam(name = "clientId") String clientId,
                                             @RequestParam(name = "serverId") String serverId) {
        if (null == clientId || null == serverId) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = clientServerService.deleteByClientIdAndServerId(new ClientServer(clientId, serverId));
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }

    /**
     * 新建ClientServer信息
     *
     * @param record ClientServer
     * @return 200->success 400->fail
     */
    @PostMapping(path = "/info")
    public ResultBody createClientServerInfo(@RequestBody ClientServer record) {
        if (null == record || (null == record.getClientId() || null == record.getServerId())) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = clientServerService.insertByClientIdAndServerId(record);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }
}
