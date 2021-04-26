package com.service.findservice.dao;

import com.service.findservice.entity.Server;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ServerMapper {
    int deleteByPrimaryKey(String serverId);

    int insert(Server record);

    int insertSelective(Server record);

    Server selectByPrimaryKey(String serverId);

    int updateByPrimaryKeySelective(Server record);

    int updateByPrimaryKey(Server record);

    int updateSeverWorkTime(String server_id, int work_day, int work_hour);

    int updateServerParameter(String server_id, float max_distance, float max_interval_distance
            , float min_service_time, float min_interval_time);

    List<Server> selectPartnerBySId(String server_id);

    int addPartner(String server_id, String partner_id);

    List<String> selectCIdBySid(String server_id);

    int insertOrderServers(int order_id, String server_id, int is_finish);
}