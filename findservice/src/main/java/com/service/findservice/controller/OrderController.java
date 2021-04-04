package com.service.findservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.service.findservice.entity.Order;
import com.service.findservice.server.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @ResponseBody
    @RequestMapping(path = "/getOrder/{order_id}")
    public Order getOrderByOId(@PathVariable int order_id){
        JSONObject json = new JSONObject();
        return orderService.findOrderByOId(order_id);
    }

}