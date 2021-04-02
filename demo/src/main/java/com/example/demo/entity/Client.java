package com.example.demo.entity;

import java.util.Date;

public class Client {
    private Integer id;

    private Integer clientId;

    private String clName;

    private String clGender;

    private String clTel;

    private Date createTime;

    private Date updateTime;

    public Client(Integer id, Integer clientId, String clName, String clGender, String clTel, Date createTime, Date updateTime) {
        this.id = id;
        this.clientId = clientId;
        this.clName = clName;
        this.clGender = clGender;
        this.clTel = clTel;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Client() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public String getClName() {
        return clName;
    }

    public void setClName(String clName) {
        this.clName = clName == null ? null : clName.trim();
    }

    public String getClGender() {
        return clGender;
    }

    public void setClGender(String clGender) {
        this.clGender = clGender == null ? null : clGender.trim();
    }

    public String getClTel() {
        return clTel;
    }

    public void setClTel(String clTel) {
        this.clTel = clTel == null ? null : clTel.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}