package com.service.findservice.server;

import com.service.findservice.dao.OrderServerMapper;
import com.service.findservice.entity.OrderServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServerService {
    @Autowired
    private OrderServerMapper orderServerMapper;

    public OrderServer findOrderServersByOrderId(Integer orderId) {
        return orderServerMapper.selectByOrderId(orderId);
    }
}
