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
    @GetMapping(path = "/info", produces = "application/json")
    public ResultBody getClientInfo(@RequestParam(name = "clientId") String clientId) {
        return new ResultBody(ResultCode.SUCCESS, new ClientInfo(clientService.selectClientById(clientId)));
    }

    /**
     * 更新客户信息
     *
     * @param client information
     * @return success->200, fail->400
     */
    @ResponseBody
    @PatchMapping(path = "info", produces = "application/json")
    public ResultBody updateClientInfo(@RequestBody Client client) {
        if (null == client.getClientId()) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = clientService.updateClientInfo(client);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }
}
