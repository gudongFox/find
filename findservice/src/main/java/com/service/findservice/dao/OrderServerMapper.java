package com.service.findservice.dao;

import com.service.findservice.entity.OrderServer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderServerMapper {
    int deleteByPrimaryKey(Integer orderServerId);

    int insert(OrderServer record);

    int insertSelective(OrderServer record);

    OrderServer selectByPrimaryKey(Integer orderServerId);

    int updateByPrimaryKeySelective(OrderServer record);

    int updateByPrimaryKey(OrderServer record);

    OrderServer selectByOrderId(Integer orderId);

}