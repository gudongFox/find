package com.service.findservice.entity;

import java.util.List;

public class ServerWorkTime {
    private Integer timeId;

    private String serverId;

    private Integer workDay;

    private Integer workHour;

    public ServerWorkTime(Integer timeId, String serverId, Integer workDay, Integer workHour) {
        this.timeId = timeId;
        this.serverId = serverId;
        this.workDay = workDay;
        this.workHour = workHour;
    }

    public ServerWorkTime() {
        super();
    }

    public Integer getTimeId() {
        return timeId;
    }

    public void setTimeId(Integer timeId) {
        this.timeId = timeId;
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
    }

    public Integer getWorkDay() {
        return workDay;
    }

    public void setWorkDay(Integer workDay) {
        this.workDay = workDay;
    }

    public Integer getWorkHour() {
        return workHour;
    }

    public void setWorkHour(Integer workHour) {
        this.workHour = workHour;
    }


}