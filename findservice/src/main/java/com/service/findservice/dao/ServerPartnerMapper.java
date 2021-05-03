package com.service.findservice.dao;

import com.service.findservice.entity.ServerPartner;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ServerPartnerMapper {
    int deleteByPrimaryKey(Integer serverPartnerId);

    int insert(ServerPartner record);

    int insertSelective(ServerPartner record);

    ServerPartner selectByPrimaryKey(Integer serverPartnerId);

    int updateByPrimaryKeySelective(ServerPartner record);

    int updateByPrimaryKey(ServerPartner record);
}