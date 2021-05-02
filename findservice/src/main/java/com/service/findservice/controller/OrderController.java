package com.service.findservice.controller;

import com.alibaba.fastjson.JSON;
import com.service.findservice.entity.Orders;
import com.service.findservice.entity.Client;
import com.service.findservice.entity.Order;
import com.service.findservice.entity.OrderDetail;
import com.service.findservice.entity.Server;
import com.service.findservice.server.ClientService;
import com.service.findservice.server.OrderServerService;
import com.service.findservice.server.OrderService;
import com.service.findservice.server.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ServerService serverService;

    @Autowired
    private OrderServerService orderServersService;

    @ResponseBody
    @GetMapping(path = "/getOrder", produces = "application/json")
    public String getOrders(@RequestParam(name = "client_id") String clientId,
                            @RequestParam(name = "day", required = false) String day,
                            @RequestParam(name = "is_executing", required = false) Boolean isExecuting,
                            @RequestParam(name = "month", required = false) String month) {
        Orders orders = new Orders();
        if (null != clientId) {
            orders.setClientInfo(clientService.findClientById(clientId));
        } else {
            orders.setClientInfo(new Client());
        }
        if (null != isExecuting && isExecuting) {
            orders.setExecutingOrders(getExecutingOrders(clientId));
        } else {
            orders.setExecutingOrders(new ArrayList<>());
        }
        if (null != day) {
            orders.setDailyOrders(getSingleDayOrders(clientId, day));
        } else {
            orders.setDailyOrders(new ArrayList<>());
        }
        if (null != month) {
            orders.setMonthlyOrders(getMonthlyOrders(clientId, month));
        } else {
            orders.setMonthlyOrders(new ArrayList<>());
        }
        return JSON.toJSONString(orders);
    }

    private List<Boolean> getMonthlyOrders(String clientId, String month) {
        return orderService.findMonthlyOrders(clientId, month);
    }

    private List<Order> getExecutingOrders(String clientId) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = format.format(new Date(System.currentTimeMillis()));
        List<Order> orders = orderService.findExecutingOrders(clientId, time);
        List<Order> executingOrders = new ArrayList<>();
        for (Order order : orders) {
            String mandatorName = "";
            Server server = serverService.findServerById(orderServersService.findOrderServersByOrderId(order.getOrderId()).getServerId());
            if (!order.getMandatorId().equals("0")) {
                mandatorName = serverService.findServerById(order.getMandatorId()).getServerName();
            }
            executingOrders.add(getOrderDetail(order, server, mandatorName, false));
        }
        return executingOrders;
    }

    private List<Order> getSingleDayOrders(String clientId, String date) {
        List<Order> orders = orderService.findOrdersByClientIdAndDate(clientId, date);
        List<Order> ordersDetail = new ArrayList<>();
        for (Order order : orders) {
            String mandatorName = "";
            Server server = serverService.findServerById(orderServersService.findOrderServersByOrderId(order.getOrderId()).getServerId());
            if (!order.getMandatorId().equals("0")) {
                mandatorName = serverService.findServerById(order.getMandatorId()).getServerName();
            }
            ordersDetail.add(getOrderDetail(order, server, mandatorName, null));
        }
        return ordersDetail;
    }

    private OrderDetail getOrderDetail(Order order, Server server, String mandatorName, Boolean isFinished) {
        return new OrderDetail(order.getOrderId(),
                order.getOrderTime(),
                order.getClientId(),
                order.getMandatorId(),
                order.getServiceProject(),
                order.getStartTime(),
                order.getEndTime(),
                order.getPrice(),
                order.getTimes(),
                order.getIntervalDays(),
                order.getOrderComment(),
                order.getIsSubstitue(),
                server.getServerId(),
                server.getServerName(),
                mandatorName,
                isFinished);
    }
}
