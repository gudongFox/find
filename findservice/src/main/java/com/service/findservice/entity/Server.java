package com.service.findservice.entity;

public class Server {
    private String serverId;

    private String serverSessionKey;

    private String serverName;

    private Integer serverGender;

    private Integer serverAge;

    private String serverTel;

    private String serverLocation;

    private String serverProfile;

    public Server(String serverId, String serverSessionKey, String serverName, Integer serverGender, Integer serverAge, String serverTel, String serverLocation, String serverProfile) {
        this.serverId = serverId;
        this.serverSessionKey = serverSessionKey;
        this.serverName = serverName;
        this.serverGender = serverGender;
        this.serverAge = serverAge;
        this.serverTel = serverTel;
        this.serverLocation = serverLocation;
        this.serverProfile = serverProfile;
    }

    public Server(String serverId, String serverSessionKey, String serverName, Integer serverGender, Integer serverAge, String serverTel, String serverLocation) {
        this.serverId = serverId;
        this.serverSessionKey = serverSessionKey;
        this.serverName = serverName;
        this.serverGender = serverGender;
        this.serverAge = serverAge;
        this.serverTel = serverTel;
        this.serverLocation = serverLocation;
    }

    public Server() {
        super();
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
    }

    public String getServerSessionKey() {
        return serverSessionKey;
    }

    public void setServerSessionKey(String serverSessionKey) {
        this.serverSessionKey = serverSessionKey == null ? null : serverSessionKey.trim();
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName == null ? null : serverName.trim();
    }

    public Integer getServerGender() {
        return serverGender;
    }

    public void setServerGender(Integer serverGender) {
        this.serverGender = serverGender;
    }

    public Integer getServerAge() {
        return serverAge;
    }

    public void setServerAge(Integer serverAge) {
        this.serverAge = serverAge;
    }

    public String getServerTel() {
        return serverTel;
    }

    public void setServerTel(String serverTel) {
        this.serverTel = serverTel == null ? null : serverTel.trim();
    }

    public String getServerLocation() {
        return serverLocation;
    }

    public void setServerLocation(String serverLocation) {
        this.serverLocation = serverLocation == null ? null : serverLocation.trim();
    }

    public String getServerProfile() {
        return serverProfile;
    }

    public void setServerProfile(String serverProfile) {
        this.serverProfile = serverProfile;
    }
}