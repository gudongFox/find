package com.service.findservice.dao;

import com.service.findservice.entity.ServerParameter;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ServerParameterMapper {
    int deleteByPrimaryKey(String serverId);

    int insert(ServerParameter record);

    int insertSelective(ServerParameter record);

    ServerParameter selectByPrimaryKey(String serverId);

    int updateByPrimaryKeySelective(ServerParameter record);

    int updateByPrimaryKey(ServerParameter record);
}