package com.service.findservice.controller;

import com.alibaba.fastjson.JSON;
import com.service.findservice.entity.Client;
import com.service.findservice.entity.Demand;
import com.service.findservice.entity.DemandInfo;
import com.service.findservice.result.ResultBody;
import com.service.findservice.result.ResultCode;
import com.service.findservice.server.ClientService;
import com.service.findservice.server.DemandService;
import com.service.findservice.server.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/demand")
public class DemandController {

    @Autowired
    private DemandService demandService;

    @Autowired
    private ServerService serverService;

    @Autowired
    private ClientService clientService;

    @ResponseBody
    @GetMapping(path = "/detail", produces = "application/json")
    public String getDemandsByClientId(@RequestParam(name = "clientId") String clientId) {
        List<Demand> demands = demandService.selectDemandsByClientId(clientId);
        for (Demand demand : demands) {
            if (!demand.getServerId().equals("0")) {
                demand.setServerName(getServerInfo(demand.getServerId()));
            }
            if (!demand.getMandatorId().equals("0")) {
                demand.setMandatorName(getServerInfo(demand.getMandatorId()));
            }
        }
        return JSON.toJSONString(new ResultBody(ResultCode.SUCCESS, new DemandInfo(getClientInfo(clientId), demands)));
    }

    @ResponseBody
    @PostMapping(value = "/detail", produces = "application/json")
    public String createDemand(@RequestBody Demand demand) {
        if (null == demand.getDemandId()) {
            return JSON.toJSONString(new ResultBody(ResultCode.FAIL));
        }
        int res = demandService.insertDemand(demand);
        return res > 0 ? JSON.toJSONString(new ResultBody(ResultCode.SUCCESS)) : JSON.toJSONString(new ResultBody(ResultCode.FAIL));
    }

    private Client getClientInfo(String clientId) {
        return clientService.selectClientById(clientId);
    }

    private String getServerInfo(String serverId) {
        return serverService.findServerById(serverId).getServerName();
    }
}
