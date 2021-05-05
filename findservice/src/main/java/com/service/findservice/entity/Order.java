package com.service.findservice.entity;

import java.util.Date;

public class Order {
    private Integer orderId;

    private Date orderTime;

    private String clientId;

    private String mandatorId;

    private String serviceProject;

    private Date startTime;

    private Date endTime;

    private Float price;

    private Short times;

    private Short intervalDays;

    private String orderComment;

    private Integer isSubstitue;

    private Short numTimes;

    public Order(Integer orderId, Date orderTime, String clientId, String mandatorId, String serviceProject, Date startTime, Date endTime, Float price, Short times, Short intervalDays, String orderComment, Integer isSubstitue, Short numTimes) {
        this.orderId = orderId;
        this.orderTime = orderTime;
        this.clientId = clientId;
        this.mandatorId = mandatorId;
        this.serviceProject = serviceProject;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.times = times;
        this.intervalDays = intervalDays;
        this.orderComment = orderComment;
        this.isSubstitue = isSubstitue;
        this.numTimes = numTimes;
    }

    public Order(Integer orderId, Date orderTime, String clientId, String mandatorId, String serviceProject, Date startTime, Date endTime, Float price, Short times, Short intervalDays, String orderComment, Integer isSubstitue) {
        this.orderId = orderId;
        this.orderTime = orderTime;
        this.clientId = clientId;
        this.mandatorId = mandatorId;
        this.serviceProject = serviceProject;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.times = times;
        this.intervalDays = intervalDays;
        this.orderComment = orderComment;
        this.isSubstitue = isSubstitue;
    }

    public Order() {
        super();
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getMandatorId() {
        return mandatorId;
    }

    public void setMandatorId(String mandatorId) {
        this.mandatorId = mandatorId == null ? null : mandatorId.trim();
    }

    public String getServiceProject() {
        return serviceProject;
    }

    public void setServiceProject(String serviceProject) {
        this.serviceProject = serviceProject == null ? null : serviceProject.trim();
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Short getTimes() {
        return times;
    }

    public void setTimes(Short times) {
        this.times = times;
    }

    public Short getIntervalDays() {
        return intervalDays;
    }

    public void setIntervalDays(Short intervalDays) {
        this.intervalDays = intervalDays;
    }

    public String getOrderComment() {
        return orderComment;
    }

    public void setOrderComment(String orderComment) {
        this.orderComment = orderComment == null ? null : orderComment.trim();
    }

    public Integer getIsSubstitue() {
        return isSubstitue;
    }

    public void setIsSubstitue(Integer isSubstitue) {
        this.isSubstitue = isSubstitue;
    }

    public Short getNumTimes() {
        return numTimes;
    }

    public void setNumTimes(Short numTimes) {
        this.numTimes = numTimes;
    }
}