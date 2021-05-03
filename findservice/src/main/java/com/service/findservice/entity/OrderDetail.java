package com.service.findservice.entity;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

public class OrderDetail extends Order {
    private String serverId;

    private String serverName;

    private String mandatorName;

    private Boolean isFinished;

    public OrderDetail(Integer orderId, Date orderTime, String clientId, String mandatorId, String serviceProject, Date startTime, Date endTime, Float price, Short times, Short intervalDays, String orderComment, Integer isSubstitue, String serverId, String serverName, String mandatorName, Boolean isFinished) {
        super(orderId, orderTime, clientId, mandatorId, serviceProject, startTime, endTime, price, times, intervalDays, orderComment, isSubstitue);
        this.serverId = serverId;
        this.serverName = serverName;
        this.mandatorName = mandatorName;
        this.isFinished = isFinished;
    }

    public OrderDetail(String serverId, String serverName, String mandatorName, Boolean isFinished) {
        this.serverId = serverId;
        this.serverName = serverName;
        this.mandatorName = mandatorName;
        this.isFinished = isFinished;
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getMandatorName() {
        return mandatorName;
    }

    public void setMandatorName(String mandatorName) {
        this.mandatorName = mandatorName;
    }

    public Boolean getFinished() {
        return isFinished;
    }

    public void setFinished(Boolean finished) {
        isFinished = finished;
    }
}
