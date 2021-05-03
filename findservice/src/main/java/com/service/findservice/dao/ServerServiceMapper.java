package com.service.findservice.dao;

import com.service.findservice.entity.ServerService;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ServerServiceMapper {
    int deleteByPrimaryKey(Integer serverServiceId);

    int insert(ServerService record);

    int insertSelective(ServerService record);

    ServerService selectByPrimaryKey(Integer serverServiceId);

    int updateByPrimaryKeySelective(ServerService record);

    int updateByPrimaryKey(ServerService record);

    ServerService selectServiceBySId(String server_id);
}