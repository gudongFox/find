package com.service.findservice.entity;

public class ServerPartner {
    private Integer serverPartnerId;

    private String serverId;

    private String partnerId;

    private String serverComment;

    public ServerPartner(Integer serverPartnerId, String serverId, String partnerId, String serverComment) {
        this.serverPartnerId = serverPartnerId;
        this.serverId = serverId;
        this.partnerId = partnerId;
        this.serverComment = serverComment;
    }

    public ServerPartner() {
        super();
    }

    public Integer getServerPartnerId() {
        return serverPartnerId;
    }

    public void setServerPartnerId(Integer serverPartnerId) {
        this.serverPartnerId = serverPartnerId;
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
    }

    public String getPartnerId() {
        return partnerId;
    }

    public void setPartnerId(String partnerId) {
        this.partnerId = partnerId == null ? null : partnerId.trim();
    }

    public String getServerComment() {
        return serverComment;
    }

    public void setServerComment(String serverComment) {
        this.serverComment = serverComment == null ? null : serverComment.trim();
    }
}