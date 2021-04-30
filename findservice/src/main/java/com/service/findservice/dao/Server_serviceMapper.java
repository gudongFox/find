package com.service.findservice.dao;

import com.service.findservice.entity.Server_service;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Server_serviceMapper {
    int deleteByPrimaryKey(Integer serverServiceId);

    int insert(Server_service record);

    int insertSelective(Server_service record);

    Server_service selectByPrimaryKey(Integer serverServiceId);

    int updateByPrimaryKeySelective(Server_service record);

    int updateByPrimaryKey(Server_service record);

    Server_service selectServiceBySId(String server_id);
}