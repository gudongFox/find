package com.service.findservice.entity;


import com.service.findservice.server.ClientService;
import com.service.findservice.server.OrderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class ServerService {


    private Integer serverServiceId;

    private String serverId;

    private String serviceProject;

    private Float price;

    public ServerService(Integer serverServiceId, String serverId, String serviceProject, Float price) {
        this.serverServiceId = serverServiceId;
        this.serverId = serverId;
        this.serviceProject = serviceProject;
        this.price = price;
    }

    public ServerService() {
        super();
    }

    public Integer getServerServiceId() {
        return serverServiceId;
    }

    public void setServerServiceId(Integer serverServiceId) {
        this.serverServiceId = serverServiceId;
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
    }

    public String getServiceProject() {
        return serviceProject;
    }

    public void setServiceProject(String serviceProject) {
        this.serviceProject = serviceProject == null ? null : serviceProject.trim();
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }



}