package com.service.findservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.service.findservice.entity.Client;
import com.service.findservice.server.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @ResponseBody
    @RequestMapping(path = "/getClient", produces = "application/json")
    public String getClientById(/*int client_id*/){
        JSONObject json = new JSONObject();
        Client client = clientService.findClientByCId(1);

        json.put("client_id",1);
        json.put("cl_name", client.getClName());
        json.put("cl_gender", client.getClGender());
        json.put("cl_tel", client.getClTel());
        json.put("create_time", client.getCreateTime());
        json.put("update_time", client.getUpdateTime());

        return json.toJSONString();
    }

}
