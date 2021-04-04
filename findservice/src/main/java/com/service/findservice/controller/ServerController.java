package com.service.findservice.controller;


import com.alibaba.fastjson.JSONObject;
import com.service.findservice.entity.Order;
import com.service.findservice.entity.Server;
import com.service.findservice.server.OrderService;
import com.service.findservice.server.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/server")
public class ServerController {

    @Autowired
    private ServerService serverService;

    @Autowired
    private OrderService orderService;

    @RequestMapping(path = "/getServer/{server_id}")
    @ResponseBody
    public Server findServerBySId(@PathVariable int server_id){
        return serverService.findServerBySId(server_id);
    }

    @RequestMapping(path = "/selectOrder/{server_id}")
    @ResponseBody
    public List<Order> getOrderBySId(@PathVariable int server_id){
        return orderService.findOrderBySid(server_id);
    }



}
