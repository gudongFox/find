package com.service.findservice.result;

public enum ResultCode {

    /* 成功 */
    SUCCESS("200", "Success!"),
    /* 失败 */
    FAIL("400", "Failure!");

    private String code;
    private String message;

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

    ResultCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
