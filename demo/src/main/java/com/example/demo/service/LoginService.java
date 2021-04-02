package com.example.demo.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.ServerMapper;
import com.example.demo.entity.Server;
import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * @author liudong
 * @create 2021-$44-29-15:44
 */

@Service
public class LoginService {

    @Autowired
    ServerMapper serverMapper;
    public String login(){
        return "登陆成功";
    }

    public Server save(int id,String name){
        //如果数据库已存在用户信息，则不保存
        if (serverMapper.selectByPrimaryKey(id) != null){
            return serverMapper.selectByPrimaryKey(id);
        }
        Server server = new Server();
        server.setServerId(1);
        server.setSeGender(String.valueOf(id));
        server.setSeName(name);
        //数据库的保存
        System.out.println("保存数据");
        serverMapper.insert(server);
        return server;
    }

    //获取openid等
    public String getUserInfo(String code) throws IOException {
        System.out.println("code:" + code);
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        url += "?appid=wx3d2c71c080e41cf9";//自己的appid
        url += "&secret=1ed37421758b2a94c83c30e52f3d8e5d";//自己的appSecret
        url += "&js_code=" + code;
        url += "&grant_type=authorization_code";
        url += "&connect_redirect=1";
        String res = null;

        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        // DefaultHttpClient();
        HttpGet httpget = new HttpGet(url);    //GET方式
        CloseableHttpResponse response = null;
        // 配置信息
        RequestConfig requestConfig = RequestConfig.custom()          // 设置连接超时时间(单位毫秒)
                .setConnectTimeout(5000)                    // 设置请求超时时间(单位毫秒)
                .setConnectionRequestTimeout(5000)             // socket读写超时时间(单位毫秒)
                .setSocketTimeout(5000)                    // 设置是否允许重定向(默认为true)
                .setRedirectsEnabled(false).build();           // 将上面的配置信息 运用到这个Get请求里
        httpget.setConfig(requestConfig);                         // 由客户端执行(发送)Get请求
        response = httpClient.execute(httpget);                   // 从响应模型中获取响应实体
        HttpEntity responseEntity = response.getEntity();
        System.out.println("响应状态为:" + response.getStatusLine());
        if (responseEntity != null) {
            res = EntityUtils.toString(responseEntity);
            System.out.println("响应内容长度为:" + responseEntity.getContentLength());
            System.out.println("响应内容为:" + res);
        }
        // 释放资源
        if (httpClient != null) {
            httpClient.close();
        }
        if (response != null) {
            response.close();
        }
        JSONObject jo = JSON.parseObject(res);
        String openid = jo.getString("openid");
        System.out.println("openid:" + openid);
        return openid;
    }
}
