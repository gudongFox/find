package com.service.findservice.controller;

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

import java.util.ArrayList;
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

    /**
     * 通过client id得到需求
     *
     * @param clientId client id
     * @param demandId demand id，如果clientId和demandId都不为null，则直接返回该demandId的demand信息
     * @return List<Demand>
     */
    @GetMapping(path = "/detail")
    public ResultBody getDemandsByClientId(@RequestParam(name = "clientId") String clientId,
                                           @RequestParam(name = "demandId", required = false) Integer demandId) {
        if (null == clientId) {
            return new ResultBody(ResultCode.FAIL);
        }
        List<Demand> demands = new ArrayList<>();
        if (null == demandId) {
            demands = demandService.selectDemandsByClientId(clientId);
            if (null == demands) {
                return new ResultBody(ResultCode.FAIL);
            }
            for (Demand demand : demands) {
                if (null != demand.getServerId() && !demand.getServerId().equals("0")) {
                    demand.setServerName(getServerInfo(demand.getServerId()));
                }
                if (null != demand.getMandatorId() && !demand.getMandatorId().equals("0")) {
                    demand.setMandatorName(getServerInfo(demand.getMandatorId()));
                }
            }
        } else {
            Demand demand = demandService.selectDemandByDemandId(demandId);
            if (null == demand) {
                return new ResultBody(ResultCode.FAIL);
            }
            if (null != demand.getServerId() && !demand.getServerId().equals("0")) {
                demand.setServerName(getServerInfo(demand.getServerId()));
            }
            if (null != demand.getMandatorId() && !demand.getMandatorId().equals("0")) {
                demand.setMandatorName(getServerInfo(demand.getMandatorId()));
            }
            demands.add(demand);
        }
        return new ResultBody(ResultCode.SUCCESS, new DemandInfo(getClientInfo(clientId), demands));

    }

    /**
     * 创建新的订单
     *
     * @param demand demand id 必须为 null，其他字段可选
     * @return 200->success 400->fail
     */
    @PostMapping(path = "/detail")
    public ResultBody createDemand(@RequestBody Demand demand) {
        if (null == demand) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = demandService.insertDemand(demand);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }

    /**
     * 更新订单
     *
     * @param demand 更新现有的需求，demand id 不能为null
     * @return 200->success 400->fail
     */
    @PatchMapping(path = "/detail")
    public ResultBody updateDemand(@RequestBody Demand demand) {
        if (null == demand || null == demand.getDemandId()) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = demandService.updateDemand(demand);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }

    private Client getClientInfo(String clientId) {
        return clientService.selectClientById(clientId);
    }

    private String getServerInfo(String serverId) {
        return serverService.findServerById(serverId).getServerName();
    }
}
