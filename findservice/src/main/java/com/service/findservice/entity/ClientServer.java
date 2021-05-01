package com.service.findservice.entity;

public class ClientServer {
    private Integer clientServerId;

    private String clientId;

    private String serverId;

    private String clientComment;

    private String serverComment;

    public ClientServer(Integer clientServerId, String clientId, String serverId, String clientComment, String serverComment) {
        this.clientServerId = clientServerId;
        this.clientId = clientId;
        this.serverId = serverId;
        this.clientComment = clientComment;
        this.serverComment = serverComment;
    }

    public ClientServer() {
        super();
    }

    public Integer getClientServerId() {
        return clientServerId;
    }

    public void setClientServerId(Integer clientServerId) {
        this.clientServerId = clientServerId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId == null ? null : serverId.trim();
    }

    public String getClientComment() {
        return clientComment;
    }

    public void setClientComment(String clientComment) {
        this.clientComment = clientComment == null ? null : clientComment.trim();
    }

    public String getServerComment() {
        return serverComment;
    }

    public void setServerComment(String serverComment) {
        this.serverComment = serverComment == null ? null : serverComment.trim();
    }
}