package com.service.findservice.entity;

public class ServerParameter {
    private String serverId;

    private Float maxDistance;

    private Float maxIntervalDistance;

    private Float minServiceTime;

    private Float minIntervalTime;

    public ServerParameter(String serverId, Float maxDistance, Float maxIntervalDistance, Float minServiceTime, Float minIntervalTime) {
        this.serverId = serverId;
        this.maxDistance = maxDistance;
        this.maxIntervalDistance = maxIntervalDistance;
        this.minServiceTime = minServiceTime;
        this.minIntervalTime = minIntervalTime;
    }

    public ServerParameter() {
        super();
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
    }

    public Float getMaxDistance() {
        return maxDistance;
    }

    public void setMaxDistance(Float maxDistance) {
        this.maxDistance = maxDistance;
    }

    public Float getMaxIntervalDistance() {
        return maxIntervalDistance;
    }

    public void setMaxIntervalDistance(Float maxIntervalDistance) {
        this.maxIntervalDistance = maxIntervalDistance;
    }

    public Float getMinServiceTime() {
        return minServiceTime;
    }

    public void setMinServiceTime(Float minServiceTime) {
        this.minServiceTime = minServiceTime;
    }

    public Float getMinIntervalTime() {
        return minIntervalTime;
    }

    public void setMinIntervalTime(Float minIntervalTime) {
        this.minIntervalTime = minIntervalTime;
    }
}