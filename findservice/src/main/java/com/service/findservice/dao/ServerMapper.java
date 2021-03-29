package com.service.findservice.dao;

import com.service.findservice.entity.Server;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ServerMapper {

    Server selectServerById(int server_id);

    int deleteByPrimaryKey(Integer id);

    int insert(Server record);

    int insertSelective(Server record);

    Server selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Server record);

    int updateByPrimaryKey(Server record);
}