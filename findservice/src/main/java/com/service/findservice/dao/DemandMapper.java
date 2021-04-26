package com.service.findservice.dao;

import com.service.findservice.entity.Demand;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DemandMapper {
    int deleteByPrimaryKey(Integer demandId);

    int insert(Demand record);

    int insertSelective(Demand record);

    Demand selectByPrimaryKey(Integer demandId);

    int updateByPrimaryKeySelective(Demand record);

    int updateByPrimaryKey(Demand record);

    List<Demand> selectDemandBySID(String server_id);
}