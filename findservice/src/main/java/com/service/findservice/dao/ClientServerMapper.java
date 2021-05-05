package com.service.findservice.dao;

import com.service.findservice.entity.ClientServer;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ClientServerMapper {

    int deleteByPrimaryKey(Integer clientServerId);

    int insert(ClientServer record);

    int insertSelective(ClientServer record);

    ClientServer selectByPrimaryKey(Integer clientServerId);

    int updateByPrimaryKeySelective(ClientServer record);

    int updateByPrimaryKey(ClientServer record);

    List<ClientServer> selectClientServersByClientId(String clientId);

    int updateByClientIdAndServerIdSelective(ClientServer record);

    int deleteByClientIdAndServerId(ClientServer clientServer);


}