package com.service.findservice.dao;

import com.service.findservice.entity.Client;
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

    List<Client> selectByClientName(String clientName);

    List<Client> selectClientByServerId(String serverId);

    Client selectByClientId(String clientId);

    String selectMostProj(String client_id);

    int selectOrderNum(String client_id);

    int selectManOrderNum(String client_id);
}