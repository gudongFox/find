package com.example.demo.entity;

import java.util.Date;

public class Order {
    private Integer id;

    private Integer orderId;

    private Date ordTime;

    private String serviceProject;

    private Integer clientId;

    private Date serviceStartTime;

    private Date serviceEndTime;

    private Float price;

    private Byte frequency;

    private Boolean paymentMethod;

    private Float managementFee;

    private Float serviceFee;

    private String ordProvince;

    private String ordCity;

    private String ordDistrict;

    private String ordStreet;

    private String ordCommunity;

    private String ordHouseNum;

    private Date createTime;

    private Date updateTime;

    public Order(Integer id, Integer orderId, Date ordTime, String serviceProject, Integer clientId, Date serviceStartTime, Date serviceEndTime, Float price, Byte frequency, Boolean paymentMethod, Float managementFee, Float serviceFee, String ordProvince, String ordCity, String ordDistrict, String ordStreet, String ordCommunity, String ordHouseNum, Date createTime, Date updateTime) {
        this.id = id;
        this.orderId = orderId;
        this.ordTime = ordTime;
        this.serviceProject = serviceProject;
        this.clientId = clientId;
        this.serviceStartTime = serviceStartTime;
        this.serviceEndTime = serviceEndTime;
        this.price = price;
        this.frequency = frequency;
        this.paymentMethod = paymentMethod;
        this.managementFee = managementFee;
        this.serviceFee = serviceFee;
        this.ordProvince = ordProvince;
        this.ordCity = ordCity;
        this.ordDistrict = ordDistrict;
        this.ordStreet = ordStreet;
        this.ordCommunity = ordCommunity;
        this.ordHouseNum = ordHouseNum;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Order() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Date getOrdTime() {
        return ordTime;
    }

    public void setOrdTime(Date ordTime) {
        this.ordTime = ordTime;
    }

    public String getServiceProject() {
        return serviceProject;
    }

    public void setServiceProject(String serviceProject) {
        this.serviceProject = serviceProject == null ? null : serviceProject.trim();
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Date getServiceStartTime() {
        return serviceStartTime;
    }

    public void setServiceStartTime(Date serviceStartTime) {
        this.serviceStartTime = serviceStartTime;
    }

    public Date getServiceEndTime() {
        return serviceEndTime;
    }

    public void setServiceEndTime(Date serviceEndTime) {
        this.serviceEndTime = serviceEndTime;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Byte getFrequency() {
        return frequency;
    }

    public void setFrequency(Byte frequency) {
        this.frequency = frequency;
    }

    public Boolean getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(Boolean paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Float getManagementFee() {
        return managementFee;
    }

    public void setManagementFee(Float managementFee) {
        this.managementFee = managementFee;
    }

    public Float getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(Float serviceFee) {
        this.serviceFee = serviceFee;
    }

    public String getOrdProvince() {
        return ordProvince;
    }

    public void setOrdProvince(String ordProvince) {
        this.ordProvince = ordProvince == null ? null : ordProvince.trim();
    }

    public String getOrdCity() {
        return ordCity;
    }

    public void setOrdCity(String ordCity) {
        this.ordCity = ordCity == null ? null : ordCity.trim();
    }

    public String getOrdDistrict() {
        return ordDistrict;
    }

    public void setOrdDistrict(String ordDistrict) {
        this.ordDistrict = ordDistrict == null ? null : ordDistrict.trim();
    }

    public String getOrdStreet() {
        return ordStreet;
    }

    public void setOrdStreet(String ordStreet) {
        this.ordStreet = ordStreet == null ? null : ordStreet.trim();
    }

    public String getOrdCommunity() {
        return ordCommunity;
    }

    public void setOrdCommunity(String ordCommunity) {
        this.ordCommunity = ordCommunity == null ? null : ordCommunity.trim();
    }

    public String getOrdHouseNum() {
        return ordHouseNum;
    }

    public void setOrdHouseNum(String ordHouseNum) {
        this.ordHouseNum = ordHouseNum == null ? null : ordHouseNum.trim();
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