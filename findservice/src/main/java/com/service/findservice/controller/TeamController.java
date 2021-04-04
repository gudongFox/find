package com.service.findservice.controller;

import com.service.findservice.entity.Team;
import com.service.findservice.server.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @ResponseBody
    @RequestMapping("/getTeam/{team_id}")
    public Team getTeam(@PathVariable  int team_id){
        return teamService.findTeamById(team_id);
    }


}
