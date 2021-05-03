package com.service.findservice.result;

import com.alibaba.fastjson.JSON;

public class ResultBody {

    private String code;

    private String message;

    private Object data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public ResultBody() {
        super();
    }

    public ResultBody(String code, String message, Object data) {
        super();
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 成功或者失败,无数据
     * @param resultCode 状态码
     */
    public ResultBody(ResultCode resultCode) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
    }

    /**
     * 枚举结果以及获取数据
     * @param resultCode 状态码
     * @param message 信息
     */
    public ResultBody(ResultCode resultCode, String message) {
        this.code = resultCode.getCode();
        this.message = message;
    }

    /**
     * 枚举结果以及获取数据
     * @param resultCode 状态码
     * @param data 数据
     */
    public ResultBody(ResultCode resultCode, Object data) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.data = data;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}
