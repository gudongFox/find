package com.service.findservice.entity;

import java.util.List;

public class DemandInfo {
    private Client clientInfo;

    private List<Demand> demandsInfo;

    public DemandInfo() {
        super();
    }

    public DemandInfo(Client clientInfo, List<Demand> demandsInfo) {
        this.clientInfo = clientInfo;
        this.demandsInfo = demandsInfo;
    }

    public Client getClientInfo() {
        return clientInfo;
    }

    public void setClientInfo(Client clientInfo) {
        this.clientInfo = clientInfo;
    }

    public List<Demand> getDemandsInfo() {
        return demandsInfo;
    }

    public void setDemandsInfo(List<Demand> demandsInfo) {
        this.demandsInfo = demandsInfo;
    }
}
