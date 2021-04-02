package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;
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
    @RequestMapping(path = "/getOrder", produces = "application/json")
    public String getOrderByOId(){
        JSONObject json = new JSONObject();
        Order order = orderService.findOrderByOId(1);
        json.put("order_id", 1);
        json.put("ord_time", order.getOrdTime());
        json.put("service_project", order.getServiceProject());
        json.put("client_id", order.getClientId());
        json.put("service_start_time", order.getServiceStartTime());
        json.put("service_end_time", order.getServiceEndTime());
        json.put("frequency", order.getFrequency());
        json.put("payment_method", order.getPaymentMethod());
        json.put("management_fee", order.getManagementFee());
        json.put("service_fee", order.getServiceFee());
        json.put("ord_province", order.getOrdProvince());
        json.put("ord_city", order.getOrdCity());
        json.put("ord_district", order.getOrdDistrict());
        json.put("ord_street", order.getOrdStreet());
        json.put("ord_community", order.getOrdCommunity());
        json.put("ord_house_num", order.getOrdHouseNum());
        json.put("create_time", order.getCreateTime());
        json.put("update_time", order.getUpdateTime());

        return json.toJSONString();
    }

    @ResponseBody
    @RequestMapping("/getOrder/{order_id}")
    public Order getOrderById(@PathVariable int order_id){
        Order order = orderService.findOrderById(order_id);
        return order;
    }

}
