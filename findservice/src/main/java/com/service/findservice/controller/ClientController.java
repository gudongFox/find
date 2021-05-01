package com.service.findservice.controller;

import com.alibaba.fastjson.JSON;
import com.service.findservice.server.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @ResponseBody
    @GetMapping(path = "/clientInfo", produces = "application/json")
    public String getClientInfo(@RequestParam(name = "client_id") String clientId){
        return JSON.toJSONString(clientService.findClientById(clientId));
    }
}
