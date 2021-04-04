package com.service.findservice.server;

import com.service.findservice.dao.OrderMapper;
import com.service.findservice.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public Order findOrderByOId(int order_id){ return orderMapper.selectByOId(order_id); }

    public List<Order> findOrderBySid(int server_id){ return orderMapper.selectBySId(server_id); }

}