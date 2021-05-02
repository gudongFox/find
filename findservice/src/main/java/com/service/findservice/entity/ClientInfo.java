package com.service.findservice.entity;

import com.alibaba.fastjson.annotation.JSONField;

public class ClientInfo {
    @JSONField(name = "client")
    Client client;

    public ClientInfo(Client client) {
        this.client = client;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
