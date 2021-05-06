package com.service.findservice.server;

import com.service.findservice.dao.ServerMapper;
import com.service.findservice.dao.ServerParameterMapper;
import com.service.findservice.dao.ServerWorkTimeMapper;
import com.service.findservice.entity.Order;
import com.service.findservice.entity.Server;
import com.service.findservice.entity.ServerParameter;
import com.service.findservice.entity.ServerWorkTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ServerService {

    @Autowired
    private ServerMapper serverMapper;

    @Autowired
    private ServerWorkTimeMapper serverWorkTimeMapper;

    @Autowired
    private ServerParameterMapper serverParameterMapper;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ClientService clientService;

    public Server findServerById(String serverId) {
        return serverMapper.selectByServerId(serverId);
    }

    public List<Server> findServersByClientId(String clientId) {
        return serverMapper.selectServersByClientId(clientId);
    }

    public int addServer(Server server) {
        return serverMapper.insert(server);
    }

    public int selectManOrderNum(String server_id) {
        return serverMapper.selectManOrderNum(server_id);
    }

    public int selectOrderNum(String server_id) {
        return serverMapper.selectOrderNum(server_id);
    }

    public int selectUnFinOrderNum(String server_id) {
        return serverMapper.selectUnFinOrderNum(server_id);
    }

    public Server selectServerByOId(int order_id) {
        return serverMapper.selectServerByOId(order_id);
    }

    public List getOrderInfo(List<Order> orderList){
        List<Map<String, Object>> infoList = new ArrayList<>();
        if (orderList != null) {
            for (Order order : orderList) {
                Map<String, Object> info = new HashMap<>();
                //用户信息
                info.put("ClientInfo", clientService.selectClientById(order.getClientId()));
                //订单详情
                info.put("orderInfo", order);
                //是否多次
                if(order.getTimes() > 1){
                    info.put("is_Multiple", 1);
                } else {
                    info.put("is_Multiple", 0);
                }
                //是否委托订单
                if(order.getMandatorId().equals("0")){
                    info.put("is_Mandator", 0);
                } else {
                    info.put("is_Mandator", 1);
                    info.put("MandatorInfo", findServerById(order.getMandatorId()));
                }
                infoList.add(info);
            }
        }
        return infoList;
    }

    public List<ServerWorkTime> getWorkTime(String server_id){
        return serverWorkTimeMapper.getWorkTime(server_id);
    }

    public ServerParameter getServerParameter(String server_id){
        return serverParameterMapper.selectByPrimaryKey(server_id);
    }
}
