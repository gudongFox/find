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

    public List<Demand> selectDemandBySID(String server_id){
       return demandMapper.selectDemandBySID(server_id);
    }

    public Demand selectDemandByDId(int demand_id){
        return demandMapper.selectByPrimaryKey(demand_id);
    }

    public int deleteByPrimaryKey(Integer demandId){
        return demandMapper.deleteByPrimaryKey(demandId);
    }

    public List<Demand> findDemandByClientId(String client_id){
        return demandMapper.selectDemandsByClientId(client_id);
    }
}
