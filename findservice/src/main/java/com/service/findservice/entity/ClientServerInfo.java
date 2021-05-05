package com.service.findservice.entity;


public class ClientServerInfo {
    private Server serverInfo;

    private ClientServer clientServer;

    private Integer directServeTimes;

    private Integer mandatorServeTimes;

    public ClientServerInfo(Server serverInfo, ClientServer clientServer, Integer directServeTimes, Integer mandatorServeTimes) {
        this.serverInfo = serverInfo;
        this.clientServer = clientServer;
        this.directServeTimes = directServeTimes;
        this.mandatorServeTimes = mandatorServeTimes;
    }

    public ClientServerInfo() {
        super();
    }

    public Server getServerInfo() {
        return serverInfo;
    }

    public void setServerInfo(Server serverInfo) {
        this.serverInfo = serverInfo;
    }

    public ClientServer getClientServer() {
        return clientServer;
    }

    public void setClientServer(ClientServer clientServer) {
        this.clientServer = clientServer;
    }

    public Integer getDirectServeTimes() {
        return directServeTimes;
    }

    public void setDirectServeTimes(Integer directServeTimes) {
        this.directServeTimes = directServeTimes;
    }

    public Integer getMandatorServeTimes() {
        return mandatorServeTimes;
    }

    public void setMandatorServeTimes(Integer mandatorServeTimes) {
        this.mandatorServeTimes = mandatorServeTimes;
    }
}

