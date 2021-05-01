package com.service.findservice.entity;

public class OderServer {
    private Integer orderServerId;

    private Integer orderId;

    private String serverId;

    private Byte isFinish;

    public OderServer(Integer orderServerId, Integer orderId, String serverId, Byte isFinish) {
        this.orderServerId = orderServerId;
        this.orderId = orderId;
        this.serverId = serverId;
        this.isFinish = isFinish;
    }

    public OderServer() {
        super();
    }

    public Integer getOrderServerId() {
        return orderServerId;
    }

    public void setOrderServerId(Integer orderServerId) {
        this.orderServerId = orderServerId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
    }

    public Byte getIsFinish() {
        return isFinish;
    }

    public void setIsFinish(Byte isFinish) {
        this.isFinish = isFinish;
    }
}