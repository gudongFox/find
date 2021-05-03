package com.service.findservice.dao;

import com.service.findservice.entity.ServerWorkTime;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ServerWorkTimeMapper {
    int deleteByPrimaryKey(Integer timeId);

    int insert(ServerWorkTime record);

    int insertSelective(ServerWorkTime record);

    ServerWorkTime selectByPrimaryKey(Integer timeId);

    int updateByPrimaryKeySelective(ServerWorkTime record);

    int updateByPrimaryKey(ServerWorkTime record);
}