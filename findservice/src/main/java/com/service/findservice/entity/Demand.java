package com.service.findservice.entity;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

public class Demand {

    private Integer demandId;


    private String clientId;


    private String serviceProject;


    private String mandatorId;


    private String mandatorName;


    private String serverId;


    private String serverName;

    private Date startTime;

    private Date endTime;

    private Short times;

    private Short intervalDays;

    private String demandComment;

    public Demand(Integer demandId, String clientId, String serviceProject, String mandatorId, String serverId, Date startTime, Date endTime, Short times, Short intervalDays, String demandComment) {
        this.demandId = demandId;
        this.clientId = clientId;
        this.serviceProject = serviceProject;
        this.mandatorId = mandatorId;
        this.serverId = serverId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.times = times;
        this.intervalDays = intervalDays;
        this.demandComment = demandComment;
    }

    public Demand() {
        super();
    }

    public Integer getDemandId() {
        return demandId;
    }

    public void setDemandId(Integer demandId) {
        this.demandId = demandId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getServiceProject() {
        return serviceProject;
    }

    public void setServiceProject(String serviceProject) {
        this.serviceProject = serviceProject == null ? null : serviceProject.trim();
    }

    public String getMandatorId() {
        return mandatorId;
    }

    public void setMandatorId(String mandatorId) {
        this.mandatorId = mandatorId == null ? null : mandatorId.trim();
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
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

    public String getDemandComment() {
        return demandComment;
    }

    public void setDemandComment(String demandComment) {
        this.demandComment = demandComment == null ? null : demandComment.trim();
    }

    public String getMandatorName() {
        return mandatorName;
    }

    public void setMandatorName(String mandatorName) {
        this.mandatorName = mandatorName;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }
}