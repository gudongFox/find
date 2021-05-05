package com.service.findservice.entity;

public class Client {
    private String clientId;

    private String clientSessionKey;

    private String clientName;

    private Integer clientGender;

    private Integer clientAge;

    private String clientTel;

    private String clientLocation;

    private String clientProfile;

    public Client(String clientId, String clientSessionKey, String clientName, Integer clientGender, Integer clientAge, String clientTel, String clientLocation, String clientProfile) {
        this.clientId = clientId;
        this.clientSessionKey = clientSessionKey;
        this.clientName = clientName;
        this.clientGender = clientGender;
        this.clientAge = clientAge;
        this.clientTel = clientTel;
        this.clientLocation = clientLocation;
        this.clientProfile = clientProfile;
    }

    public Client(String clientId, String clientSessionKey, String clientName, Integer clientGender, Integer clientAge, String clientTel, String clientLocation) {
        this.clientId = clientId;
        this.clientSessionKey = clientSessionKey;
        this.clientName = clientName;
        this.clientGender = clientGender;
        this.clientAge = clientAge;
        this.clientTel = clientTel;
        this.clientLocation = clientLocation;
    }

    public Client() {
        super();
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getClientSessionKey() {
        return clientSessionKey;
    }

    public void setClientSessionKey(String clientSessionKey) {
        this.clientSessionKey = clientSessionKey == null ? null : clientSessionKey.trim();
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName == null ? null : clientName.trim();
    }

    public Integer getClientGender() {
        return clientGender;
    }

    public void setClientGender(Integer clientGender) {
        this.clientGender = clientGender;
    }

    public Integer getClientAge() {
        return clientAge;
    }

    public void setClientAge(Integer clientAge) {
        this.clientAge = clientAge;
    }

    public String getClientTel() {
        return clientTel;
    }

    public void setClientTel(String clientTel) {
        this.clientTel = clientTel == null ? null : clientTel.trim();
    }

    public String getClientLocation() {
        return clientLocation;
    }

    public void setClientLocation(String clientLocation) {
        this.clientLocation = clientLocation == null ? null : clientLocation.trim();
    }

    public String getClientProfile() {
        return clientProfile;
    }

    public void setClientProfile(String clientProfile) {
        this.clientProfile = clientProfile;
    }
}