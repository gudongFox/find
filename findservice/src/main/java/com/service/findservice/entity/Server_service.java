package com.service.findservice.entity;

public class Server_service {
    private Integer serverServiceId;

    private String serverId;

    private String serviceProject;

    private Float price;

    public Server_service(Integer serverServiceId, String serverId, String serviceProject, Float price) {
        this.serverServiceId = serverServiceId;
        this.serverId = serverId;
        this.serviceProject = serviceProject;
        this.price = price;
    }

    public Server_service() {
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