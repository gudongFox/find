package com.service.findservice.controller;

import com.service.findservice.entity.Orders;
import com.service.findservice.entity.Client;
import com.service.findservice.entity.Order;
import com.service.findservice.entity.OrderDetail;
import com.service.findservice.entity.Server;
import com.service.findservice.result.ResultBody;
import com.service.findservice.result.ResultCode;
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
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ServerService serverService;

    @Autowired
    private OrderServerService orderServersService;

    /**
     * 通过客户获得订单信息
     * @param clientId 客户的id
     * @param day 指定某一天的订单，优先级高于isExecuting；不要求一定传值；
     * @param isExecuting true 表示正在执行的订单；不要求一定传值；
     * @param month 传值为某个月，格式为yyyy-MM；不要求一定传值；返回的内容为List<Boolean>, true表示该天有订单
     * @return Orders
     */
    @GetMapping(path = "/detail")
    public ResultBody getOrders(@RequestParam(name = "clientId") String clientId,
                            @RequestParam(name = "day", required = false) String day,
                            @RequestParam(name = "isExecuting", required = false) Boolean isExecuting,
                            @RequestParam(name = "month", required = false) String month) {
        Orders orders = new Orders();
        if (null != clientId) {
            orders.setClientInfo(clientService.selectClientById(clientId));
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
        return new ResultBody(ResultCode.SUCCESS, orders);
    }

    private List<Boolean> getMonthlyOrders(String clientId, String month) {
        return orderService.selectMonthlyOrders(clientId, month);
    }

    private List<Order> getExecutingOrders(String clientId) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = format.format(new Date(System.currentTimeMillis()));
        List<Order> orders = orderService.selectExecutingOrders(clientId, time);
        List<Order> executingOrders = new ArrayList<>();
        for (Order order : orders) {
            String mandatorName = null;
            Server server = serverService.findServerById(orderServersService.findOrderServersByOrderId(order.getOrderId()).getServerId());
            if (!order.getMandatorId().equals("0")) {
                mandatorName = serverService.findServerById(order.getMandatorId()).getServerName();
            }
            executingOrders.add(getOrderDetail(order, server, mandatorName, false));
        }
        return executingOrders;
    }

    private List<Order> getSingleDayOrders(String clientId, String date) {
        List<Order> orders = orderService.selectOrdersByClientIdAndDate(clientId, date);
        List<Order> ordersDetail = new ArrayList<>();
        for (Order order : orders) {
            String mandatorName = null;
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
