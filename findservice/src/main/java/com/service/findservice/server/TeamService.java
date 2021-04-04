package com.service.findservice.server;

import com.service.findservice.dao.TeamMapper;
import com.service.findservice.entity.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService {

    @Autowired
    private TeamMapper teamMapper;

    public Team findTeamById(int team_id){
        return teamMapper.selectByPrimaryKey(team_id);
    }

}
