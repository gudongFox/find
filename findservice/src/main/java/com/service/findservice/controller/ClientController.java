package com.service.findservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.service.findservice.entity.Client;
import com.service.findservice.server.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @ResponseBody
    @RequestMapping(path = "/getClient/{client_id}")
    public Client getClientById(@PathVariable  int client_id){
        return   clientService.findClientByCId(client_id);
    }

}
