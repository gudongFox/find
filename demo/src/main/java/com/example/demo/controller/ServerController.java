package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Server;
import com.example.demo.service.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/server")
public class ServerController {

    @Autowired
    private ServerService serverService;


    @RequestMapping(path = "/getServer", produces = "application/json")
    @ResponseBody
    public String findServerBySId(){
        JSONObject json = new JSONObject();
        Server server = serverService.findServerBySId(1);
        json.put("server_id",1);
        json.put("se_name", server.getSeName());
        json.put("se_gender", server.getSeGender());
        json.put("se_tel", server.getSeTel());
        json.put("se_remaining_points", server.getSeRemainingPoints());
        json.put("se_frozen_points", server.getSeRemainingPoints());
        json.put("se_province", server.getSeProvince());
        json.put("se_city", server.getSeCity());
        json.put("se_district", server.getSeDistrict());
        json.put("se_street", server.getSeStreet());
        json.put("se_community", server.getSeCommunity());
        json.put("se_house_num", server.getSeHouseNum());
        json.put("se_administrator_id", server.getSeAdministratorId());
        json.put("create_time", server.getCreateTime());
        json.put("update_time", server.getUpdateTime());

        return json.toJSONString();


        //return serverService.test1(1);
        //return serverService.findServerById(1);
    }




}
