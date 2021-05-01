package com.service.findservice.dao;

import com.service.findservice.entity.OderServer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OderServerMapper {
    int deleteByPrimaryKey(Integer orderServerId);

    int insert(OderServer record);

    int insertSelective(OderServer record);

    OderServer selectByPrimaryKey(Integer orderServerId);

    int updateByPrimaryKeySelective(OderServer record);

    int updateByPrimaryKey(OderServer record);
}