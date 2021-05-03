package com.service.findservice.entity;

import java.util.List;

public class ServerInfo {
    private Server serverInfo;

    private List<List<Boolean>> weeklyWorkTime;

    public ServerInfo(Server serverInfo, List<List<Boolean>> weeklyWorkTime) {
        this.serverInfo = serverInfo;
        this.weeklyWorkTime = weeklyWorkTime;
    }

    public ServerInfo(){
        super();
    }

    public Server getServerInfo() {
        return serverInfo;
    }

    public void setServerInfo(Server serverInfo) {
        this.serverInfo = serverInfo;
    }

    public List<List<Boolean>> getWeeklyWorkTime() {
        return weeklyWorkTime;
    }

    public void setWeeklyWorkTime(List<List<Boolean>> weeklyWorkTime) {
        this.weeklyWorkTime = weeklyWorkTime;
    }
}
