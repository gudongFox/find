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

    public List<Order> selectOrderBySId(String server_id){
        return orderMapper.selectOrderBySId(server_id);
    }

    public List<Order> selectOrderByCId(String client_id){
        return orderMapper.selectOrderByCId(client_id);
    }

    public int selectFin(int order_id){
        return orderMapper.selectFin(order_id);
    }

    public int insert(Order record){
        return orderMapper.insert(record);
    }
}
