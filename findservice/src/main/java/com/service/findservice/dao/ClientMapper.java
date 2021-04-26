package com.service.findservice.dao;

import com.service.findservice.entity.Client;
import com.service.findservice.entity.Order;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface ClientMapper {
    int deleteByPrimaryKey(String clientId);

    int insert(Client record);

    int insertSelective(Client record);

    Client selectByPrimaryKey(String clientId);

    int updateByPrimaryKeySelective(Client record);

    int updateByPrimaryKey(Client record);

    List<Client> selectByClientName(String client_name);
}