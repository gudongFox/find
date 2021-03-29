package com.service.findservice.dao;

import com.service.findservice.entity.Client;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClientMapper {

    Client selectClientByCId(int client_id);

    int deleteByPrimaryKey(Integer id);

    int insert(Client record);

    int insertSelective(Client record);

    Client selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Client record);

    int updateByPrimaryKey(Client record);
}