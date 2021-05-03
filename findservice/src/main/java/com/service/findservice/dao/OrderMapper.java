package com.service.findservice.dao;

import com.service.findservice.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface OrderMapper {
    int deleteByPrimaryKey(Integer orderId);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderId);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    List<Order> selectOrderBySId(String server_id);

    List<Order> selectOrderByDate(@Param("server_id") String server_id,@Param("date") Date date);

    List<Order> selectWeekOrderByDate(@Param("server_id") String server_id,@Param("date") Date date);

    List<Order> selectMonOrderBySId(@Param("server_id") String server_id,@Param("date") String date);

    List<Order> selectOrderByCId(String client_id);

    int selectFin(int order_id);

    int updateFinish(String server_id, int order_id);

    int deleteOrderServer(int order_id);

    List<Order> selectOrdersByClientAndMandatorId(String clientId, String mandatorId);

    List<Order> selectOrdersByClientAndServerId(String clientId, String serverId);

    List<Order> selectOrdersByClientIdAndDate(String clientId, String date);

    List<Order> selectOrdersByServerIdAndDate(String serverId, String date);

    List<Order> selectExecutingOrders(String clientId, String time);

    Integer selectOrdersCountByDate(String clientId, String date);
}