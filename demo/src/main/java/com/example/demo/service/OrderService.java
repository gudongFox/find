package com.example.demo.service;

import com.example.demo.dao.OrderMapper;
import com.example.demo.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public Order findOrderByOId(int order_id){ return orderMapper.selectByOId(order_id); }

    public Order findOrderById(int order_id){
        return orderMapper.selectByOId(order_id);
    }

}
