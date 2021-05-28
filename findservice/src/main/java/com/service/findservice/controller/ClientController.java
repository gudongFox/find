package com.service.findservice.controller;

import com.service.findservice.entity.Client;
import com.service.findservice.entity.ClientInfo;
import com.service.findservice.result.ResultBody;
import com.service.findservice.result.ResultCode;
import com.service.findservice.server.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    /**
     * 获取客户信息
     *
     * @param clientId client_id
     * @return client information
     */
    @GetMapping(path = "/info")
    public ResultBody getClientInfo(@RequestParam(name = "clientId") String clientId) {
        Client client = clientService.selectClientById(clientId);
        return null == client ? new ResultBody(ResultCode.FAIL) : new ResultBody(ResultCode.SUCCESS, new ClientInfo(client));
    }

    /**
     * 更新客户信息
     *
     * @param client information
     * @return success->200, fail->400
     */
    @PutMapping(path = "/info")
    public ResultBody updateClientInfo(@RequestBody Client client) {
        if (null == client || null == client.getClientId()) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = clientService.updateClientInfo(client);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }

    /**
     * 新建客户信息
     *
     * @param client information
     * @return
     */
    @PostMapping(path = "/info")
    public ResultBody createClientInfo(@RequestBody Client client) {
        if (null == client || null == client.getClientId()) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = clientService.createClientInfo(client);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }
}
