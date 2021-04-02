package com.example.demo.dao;

import com.example.demo.entity.Agency;

public interface AgencyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Agency record);

    int insertSelective(Agency record);

    Agency selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Agency record);

    int updateByPrimaryKey(Agency record);
}