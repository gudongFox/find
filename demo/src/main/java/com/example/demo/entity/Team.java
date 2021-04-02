package com.example.demo.entity;

import java.util.Date;

public class Team {
    private Integer id;

    private Integer agencyId;

    private Date registeredDate;

    private String teamLogo;

    private String teamAbstract;

    private Float ratioManagementFee;

    private Date createTime;

    private Date updateTime;

    public Team(Integer id, Integer agencyId, Date registeredDate, String teamLogo, String teamAbstract, Float ratioManagementFee, Date createTime, Date updateTime) {
        this.id = id;
        this.agencyId = agencyId;
        this.registeredDate = registeredDate;
        this.teamLogo = teamLogo;
        this.teamAbstract = teamAbstract;
        this.ratioManagementFee = ratioManagementFee;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Team() {
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

    public Date getRegisteredDate() {
        return registeredDate;
    }

    public void setRegisteredDate(Date registeredDate) {
        this.registeredDate = registeredDate;
    }

    public String getTeamLogo() {
        return teamLogo;
    }

    public void setTeamLogo(String teamLogo) {
        this.teamLogo = teamLogo == null ? null : teamLogo.trim();
    }

    public String getTeamAbstract() {
        return teamAbstract;
    }

    public void setTeamAbstract(String teamAbstract) {
        this.teamAbstract = teamAbstract == null ? null : teamAbstract.trim();
    }

    public Float getRatioManagementFee() {
        return ratioManagementFee;
    }

    public void setRatioManagementFee(Float ratioManagementFee) {
        this.ratioManagementFee = ratioManagementFee;
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