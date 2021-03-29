package com.service.findservice.entity;

import java.util.Date;

public class Server {
    private Integer id;

    private Integer serverId;

    private String seName;

    private String seGender;

    private String seTel;

    private Integer seRemainingPoints;

    private Integer seFrozenPoints;

    private String seProvince;

    private String seCity;

    private String seDistrict;

    private String seStreet;

    private String seCommunity;

    private String seHouseNum;

    private Integer seAdministratorId;

    private Date createTime;

    private Date updateTime;

    public Server(Integer id, Integer serverId, String seName, String seGender, String seTel, Integer seRemainingPoints, Integer seFrozenPoints, String seProvince, String seCity, String seDistrict, String seStreet, String seCommunity, String seHouseNum, Integer seAdministratorId, Date createTime, Date updateTime) {
        this.id = id;
        this.serverId = serverId;
        this.seName = seName;
        this.seGender = seGender;
        this.seTel = seTel;
        this.seRemainingPoints = seRemainingPoints;
        this.seFrozenPoints = seFrozenPoints;
        this.seProvince = seProvince;
        this.seCity = seCity;
        this.seDistrict = seDistrict;
        this.seStreet = seStreet;
        this.seCommunity = seCommunity;
        this.seHouseNum = seHouseNum;
        this.seAdministratorId = seAdministratorId;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Server() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getServerId() {
        return serverId;
    }

    public void setServerId(Integer serverId) {
        this.serverId = serverId;
    }

    public String getSeName() {
        return seName;
    }

    public void setSeName(String seName) {
        this.seName = seName == null ? null : seName.trim();
    }

    public String getSeGender() {
        return seGender;
    }

    public void setSeGender(String seGender) {
        this.seGender = seGender == null ? null : seGender.trim();
    }

    public String getSeTel() {
        return seTel;
    }

    public void setSeTel(String seTel) {
        this.seTel = seTel == null ? null : seTel.trim();
    }

    public Integer getSeRemainingPoints() {
        return seRemainingPoints;
    }

    public void setSeRemainingPoints(Integer seRemainingPoints) {
        this.seRemainingPoints = seRemainingPoints;
    }

    public Integer getSeFrozenPoints() {
        return seFrozenPoints;
    }

    public void setSeFrozenPoints(Integer seFrozenPoints) {
        this.seFrozenPoints = seFrozenPoints;
    }

    public String getSeProvince() {
        return seProvince;
    }

    public void setSeProvince(String seProvince) {
        this.seProvince = seProvince == null ? null : seProvince.trim();
    }

    public String getSeCity() {
        return seCity;
    }

    public void setSeCity(String seCity) {
        this.seCity = seCity == null ? null : seCity.trim();
    }

    public String getSeDistrict() {
        return seDistrict;
    }

    public void setSeDistrict(String seDistrict) {
        this.seDistrict = seDistrict == null ? null : seDistrict.trim();
    }

    public String getSeStreet() {
        return seStreet;
    }

    public void setSeStreet(String seStreet) {
        this.seStreet = seStreet == null ? null : seStreet.trim();
    }

    public String getSeCommunity() {
        return seCommunity;
    }

    public void setSeCommunity(String seCommunity) {
        this.seCommunity = seCommunity == null ? null : seCommunity.trim();
    }

    public String getSeHouseNum() {
        return seHouseNum;
    }

    public void setSeHouseNum(String seHouseNum) {
        this.seHouseNum = seHouseNum == null ? null : seHouseNum.trim();
    }

    public Integer getSeAdministratorId() {
        return seAdministratorId;
    }

    public void setSeAdministratorId(Integer seAdministratorId) {
        this.seAdministratorId = seAdministratorId;
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