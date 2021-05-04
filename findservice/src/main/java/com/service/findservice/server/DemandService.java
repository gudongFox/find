package com.service.findservice.server;

import com.service.findservice.dao.DemandMapper;
import com.service.findservice.entity.Demand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DemandService {

    @Autowired
    private DemandMapper demandMapper;

    public List<Demand> selectDemandByServerId(String serverId) {
        return demandMapper.selectDemandByServerId(serverId);
    }

    public Demand selectDemandByDemandId(int demandId) {
        return demandMapper.selectByPrimaryKey(demandId);
    }

    public int deleteByDemandId(Integer demandId) {
        return demandMapper.deleteByPrimaryKey(demandId);
    }

    public List<Demand> selectDemandsByClientId(String clientId) {
        return demandMapper.selectDemandsByClientId(clientId);
    }

    public int insertDemand(Demand demand) {
        return demandMapper.insertSelective(demand);
    }

    public int updateDemand(Demand demand) {
        return demandMapper.updateByPrimaryKeySelective(demand);
    }
}
