package com.service.findservice.controller;

import com.alibaba.fastjson.JSON;
import com.service.findservice.entity.Client;
import com.service.findservice.entity.Demand;
import com.service.findservice.entity.DemandInfo;
import com.service.findservice.server.ClientService;
import com.service.findservice.server.DemandService;
import com.service.findservice.server.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Demand")
public class DemandController {

    @Autowired
    private DemandService demandService;

    @Autowired
    private ServerService serverService;

    @Autowired
    private ClientService clientService;

    @ResponseBody
    @GetMapping(path = "/getDemand", produces = "application/json")
    public String getDemandByClientId(String client_id) {
        List<Demand> demands = demandService.findDemandByClientId(client_id);
        for (Demand demand : demands) {
            if (!demand.getServerId().equals("0")) {
                demand.setServerName(getServerInfo(demand.getServerId()));
            } else {
                demand.setServerName("待确定");
            }
            if (!demand.getMandatorId().equals("0")) {
                demand.setMandatorName(getServerInfo(demand.getMandatorId()));
            } else {
                demand.setMandatorName("");
            }
        }
        return JSON.toJSONString(new DemandInfo(getClientInfo(client_id), demands));
    }

    @ResponseBody
    @PostMapping(value = "/newDemand", produces = "application/json")
    public void newDemand() {

    }

    private Client getClientInfo(String clientId) {
        return clientService.findClientById(clientId);
    }

    private String getServerInfo(String serverId) {
        return serverService.findServerById(serverId).getServerName();
    }
}
