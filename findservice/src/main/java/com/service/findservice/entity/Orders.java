package com.service.findservice.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.service.findservice.entity.Client;
import com.service.findservice.entity.Order;

import java.util.List;

public class Orders {
    private Client clientInfo;

    private List<Order> executingOrders;

    private List<Boolean> monthlyOrders;

    private List<Order> dailyOrders;

    public Orders(Client clientInfo, List<Order> executingOrders, List<Boolean> monthlyOrders, List<Order> dailyOrders) {
        this.clientInfo = clientInfo;
        this.executingOrders = executingOrders;
        this.monthlyOrders = monthlyOrders;
        this.dailyOrders = dailyOrders;
    }

    public Orders(){
        super();
    }

    public Client getClientInfo() {
        return clientInfo;
    }

    public void setClientInfo(Client clientInfo) {
        this.clientInfo = clientInfo;
    }

    public List<Order> getExecutingOrders() {
        return executingOrders;
    }

    public void setExecutingOrders(List<Order> executingOrders) {
        this.executingOrders = executingOrders;
    }

    public List<Boolean> getMonthlyOrders() {
        return monthlyOrders;
    }

    public void setMonthlyOrders(List<Boolean> monthlyOrders) {
        this.monthlyOrders = monthlyOrders;
    }

    public List<Order> getDailyOrders() {
        return dailyOrders;
    }

    public void setDailyOrders(List<Order> dailyOrders) {
        this.dailyOrders = dailyOrders;
    }
}
