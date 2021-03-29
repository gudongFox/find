package com.service.findservice.entity;

import java.util.Date;

public class Agency {
    private Integer id;

    private Integer agencyId;

    private String agName;

    private String agGender;

    private String agTel;

    private Integer agRemainingPoints;

    private Integer agFrozenPoints;

    private Integer agAdministratorId;

    private Date createTime;

    private Date updateTime;

    public Agency(Integer id, Integer agencyId, String agName, String agGender, String agTel, Integer agRemainingPoints, Integer agFrozenPoints, Integer agAdministratorId, Date createTime, Date updateTime) {
        this.id = id;
        this.agencyId = agencyId;
        this.agName = agName;
        this.agGender = agGender;
        this.agTel = agTel;
        this.agRemainingPoints = agRemainingPoints;
        this.agFrozenPoints = agFrozenPoints;
        this.agAdministratorId = agAdministratorId;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Agency() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAgencyId() {
        return agencyId;
    }

    public void setAgencyId(Integer agencyId) {
        this.agencyId = agencyId;
    }

    public String getAgName() {
        return agName;
    }

    public void setAgName(String agName) {
        this.agName = agName == null ? null : agName.trim();
    }

    public String getAgGender() {
        return agGender;
    }

    public void setAgGender(String agGender) {
        this.agGender = agGender == null ? null : agGender.trim();
    }

    public String getAgTel() {
        return agTel;
    }

    public void setAgTel(String agTel) {
        this.agTel = agTel == null ? null : agTel.trim();
    }

    public Integer getAgRemainingPoints() {
        return agRemainingPoints;
    }

    public void setAgRemainingPoints(Integer agRemainingPoints) {
        this.agRemainingPoints = agRemainingPoints;
    }

    public Integer getAgFrozenPoints() {
        return agFrozenPoints;
    }

    public void setAgFrozenPoints(Integer agFrozenPoints) {
        this.agFrozenPoints = agFrozenPoints;
    }

    public Integer getAgAdministratorId() {
        return agAdministratorId;
    }

    public void setAgAdministratorId(Integer agAdministratorId) {
        this.agAdministratorId = agAdministratorId;
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