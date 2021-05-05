package com.service.findservice.server;

import com.service.findservice.dao.ServerMapper;
import com.service.findservice.dao.ServerServiceMapper;
import com.service.findservice.entity.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerServiceService {

    @Autowired
    private ServerMapper serverMapper;

    @Autowired
    private ServerServiceMapper serviceMapper;

    public int updateSeverWorkTime(String server_id, int work_day, int work_hour) {
        return serverMapper.updateSeverWorkTime(server_id, work_day, work_hour);
    }

    public int updateServerParameter(String server_id, float max_distance, float max_interval_distance
            , float min_service_time, float min_interval_time) {
        return serverMapper.updateServerParameter(server_id, max_distance, max_interval_distance, min_service_time, min_interval_time);
    }

    public List<Server> selectPartnerBySId(String server_id) {
        return serverMapper.selectPartnerBySId(server_id);
    }

    public int addPartner(String server_id, String partner_id) {
        return serverMapper.addPartner(server_id, partner_id);
    }

    public List<String> selectCIdBySid(String server_id) {
        return serverMapper.selectCIdBySid(server_id);
    }

    public int insertOrderServers(int order_id, String server_id, int is_finish) {
        return serverMapper.insertOrderServers(order_id, server_id, is_finish);
    }

    public Server selectServerBySId(String server_id) {
        return serverMapper.selectByPrimaryKey(server_id);
    }

    public int updateServerInfo(Server server) {
        return serverMapper.updateByPrimaryKeySelective(server);
    }

    public com.service.findservice.entity.ServerService selectServiceBySId(String server_id) {
        return serviceMapper.selectServiceBySId(server_id);
    }

    public int updateServerService(com.service.findservice.entity.ServerService service) {
        return serviceMapper.updateByPrimaryKey(service);
    }

}
