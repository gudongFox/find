package com.service.findservice.controller;

import com.service.findservice.entity.*;
import com.service.findservice.server.ClientService;
import com.service.findservice.server.DemandService;
import com.service.findservice.server.OrderService;
import com.service.findservice.server.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/Server")
public class ServerController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private DemandService demandService;

    @Autowired
    private ServerService serverService;

    @RequestMapping(value = "/getOrderWeek/{server_id}", method = RequestMethod.POST )
    public List<Order> getOrderWeek(@PathVariable String server_id){
        return orderService.selectWeekOrderByDate(server_id, new Date());
//        Date date = new Date();
//        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
//        String str = df.format(date);
//        int now_time = Integer.parseInt(str.substring(0,8));
//
//        List<Order> orders = orderService.selectOrderBySId(server_id);
//        if(orders != null){
//            for(int i = orders.size() - 1; i >= 0 ; i--){
//                int start_time = Integer.parseInt(orders.get(i).getStartTime().substring(0,8));
//                if(start_time < now_time || start_time > now_time + 6){
//                    orders.remove(orders.get(i));
//                }
//            }
////            for(Order order : orders){
////                int start_time = Integer.parseInt(order.getStartTime().substring(0,8));
////                if(start_time < now_time || start_time > now_time + 6){
////                    orders.remove(order);
////                }
////            }
//        }
    }

    //得到某个月的订单
    @RequestMapping(value = "/getOrderMonth/{server_id}/{year_month}", method = RequestMethod.POST )
    public List<Order> getOrderMonth(@PathVariable String server_id, @PathVariable String year_month) throws ParseException {
        return orderService.selectMonOrderBySId(server_id,  year_month);
//        Date date = new Date();
//        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
//        String str = df.format(date);
//        int now_time = Integer.parseInt(str.substring(0,8));
//
//        List<Order> orders = orderService.selectOrderBySId(server_id);
//        if(orders != null){
//            for(int i = orders.size() - 1; i >= 0 ; i--){
//                int start_time = Integer.parseInt(orders.get(i).getStartTime().substring(0,8));
//                if(start_time < now_time || start_time > now_time + 6){
//                    orders.remove(orders.get(i));
//                }
//            }
////            for(Order order : orders){
////                int start_time = Integer.parseInt(order.getStartTime().substring(0,8));
////                if(start_time < now_time || start_time > now_time + 6){
////                    orders.remove(order);
////                }
////            }
//        }
    }

    @RequestMapping(value = "/getAllOrder/{server_id}", method = RequestMethod.POST )
    public List<Order> getAllOrder(@PathVariable String server_id){
        return orderService.selectOrderBySId(server_id);
    }

    @RequestMapping(value = "/getOrderToday/{server_id}", method = RequestMethod.POST )
    public List<Order> getOrderToday(@PathVariable String server_id) {
        return orderService.selectOrderByDate(server_id, new Date());
//        String str = df.format(date);
//        int now_time = Integer.parseInt(str.substring(0,8));
//
//        List<Order> orders = orderService.selectOrderBySId(server_id);
//        if(orders != null){
//            for(int i = orders.size() - 1; i >= 0 ; i--){
//                int start_time = Integer.parseInt(orders.get(i).getStartTime().substring(0,8));
//                if(start_time != now_time ){
//                    orders.remove(orders.get(i));
//                }
//            }
//        }
//        return orders;
    }

    @RequestMapping(value = "/getOrderByDate/{server_id}/{date}", method = RequestMethod.POST )
    public List<Order> getOrderByDate(@PathVariable String server_id ,@PathVariable String date) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return orderService.selectOrderByDate(server_id,  simpleDateFormat.parse(date));
//        List<Order> orders = orderService.selectOrderBySId(server_id);
//        if(orders != null){
//            for(int i = orders.size() - 1; i >= 0 ; i--){
//                int start_time = Integer.parseInt(orders.get(i).getStartTime().substring(0,8));
//                if(start_time != date ){
//                    orders.remove(orders.get(i));
//                }
//            }
//        }
    }

    //查询未完成订单
    @RequestMapping(value = "/getUnFinOrder/{server_id}", method = RequestMethod.POST )
    public List<Order> getUnFinOrder(@PathVariable String server_id){
        List<Order> orders = orderService.selectOrderBySId(server_id);
        if(orders != null){
            for(int i = orders.size() - 1; i >= 0 ; i--){
                int order_id = orders.get(i).getOrderId();
                int is_finish = orderService.selectFin(order_id);
                if(is_finish != 2 ){
                    orders.remove(orders.get(i));
                }
            }
        }
        return orders;
    }

    //结算订单
    @RequestMapping(value = "/finishOrder/{server_id}/{order_id}", method = RequestMethod.GET )
    public int finishOrder(@PathVariable String server_id, @PathVariable int order_id){
        return orderService.updateFinish(server_id, order_id);
    }

    //中止订单
    @RequestMapping(value = "/endOrder/{order_id}", method = RequestMethod.GET)
    public int endOrder( @PathVariable int order_id){
        return orderService.deleteOrderServer(order_id);
    }

    //更具客户名获取订单
    @RequestMapping(value = "/getOrderByCName/{server_id}/{client_name}", method = RequestMethod.POST)
    public List<Order> getOrderByCName(@PathVariable String server_id ,@PathVariable String client_name) {
        List<Client> clients = clientService.selectByClientName(client_name);
        List<Order> orders = new LinkedList<>();
        for(int i = 0; i < clients.size(); i++) {
             orders.addAll(orderService.selectOrderByCId(clients.get(i).getClientId()));
        }
        return orders;
    }

    //获取伙伴名单
    @RequestMapping(value = "/getPartner/{server_id}", method = RequestMethod.POST)
    public List<Server> getPartner(@PathVariable String server_id){
        return serverService.selectPartnerBySId(server_id);
    }

    @RequestMapping(value = "/getDemand/{server_id}", method = RequestMethod.POST)
    public List<Demand> getDemand(@PathVariable String server_id) {
        return demandService.selectDemandBySID(server_id);
    }

    @RequestMapping(value = "/updateWorkTime/{server_id}/{work_day}/{work_hour}", method = RequestMethod.GET)
    public int updateWorkTime(@PathVariable String server_id, @PathVariable int work_day, @PathVariable int work_hour) {
        return serverService.updateSeverWorkTime(server_id, work_day, work_hour);
    }

    @RequestMapping(value = "/updateServerParameter/{server_id}/{max_distance}/{max_interval_distance}/{min_service_time}/{min_interval_time}", method = RequestMethod.GET)
    public int updateServerParameter(@PathVariable String server_id, @PathVariable float max_distance, @PathVariable float max_interval_distance
            , @PathVariable float min_service_time, @PathVariable float min_interval_time) {
        return serverService.updateServerParameter(server_id, max_distance, max_interval_distance, min_service_time, min_interval_time);
    }

    //添加伙伴
    @RequestMapping(value = "/addPartner/{server_id}/{partner_id}", method = RequestMethod.GET)
    public int addPartner(@PathVariable String server_id, @PathVariable String partner_id){
        List<String> s_cl = serverService.selectCIdBySid(server_id);
        List<String> p_cl = serverService.selectCIdBySid(partner_id);
        s_cl.retainAll(p_cl);
        if(s_cl.size() != 0){
            return 0;
        }else {
            return serverService.addPartner(server_id, partner_id);
        }
    }

    //接单
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    @RequestMapping("/receiveOrder/{server_id}/{demand_id}")
    public int receiveOrder(@PathVariable String server_id, @PathVariable int demand_id, Order order){
        Demand demand = demandService.selectDemandByDId(demand_id);
        Date date = new Date();
        order.setOrderTime(date);
        order.setClientId(demand.getClientId());
        order.setMandatorId("0");
        order.setServiceProject(demand.getServiceProject());
        order.setStartTime(demand.getStartTime());
        order.setEndTime(demand.getEndTime());
        order.setIsSubstitue(0);
        if(orderService.insert(order) != 0 ){
            if(serverService.insertOrderServers(order.getOrderId(), server_id, 0) != 0){
                return demandService.deleteByPrimaryKey(demand_id);
            }
        }
        return 0;
    }

    //委托
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    @RequestMapping("/giveOrder/{mandator_id}/{server_id}/{demand_id}")
    public int giveOrder(@PathVariable String mandator_id,@PathVariable String server_id, @PathVariable int demand_id, Order order){
        Demand demand = demandService.selectDemandByDId(demand_id);
        order.setOrderTime(new Date());
        order.setClientId(demand.getClientId());
        order.setMandatorId(mandator_id);
        order.setServiceProject(demand.getServiceProject());
        order.setStartTime(demand.getStartTime());
        order.setEndTime(demand.getEndTime());
        order.setIsSubstitue(0);
        if(orderService.insert(order) != 0 ){
            if(serverService.insertOrderServers(order.getOrderId(), server_id, 2) != 0){
                return demandService.deleteByPrimaryKey(demand_id);
            }
        }
        return 0;
    }

    //直接客户名单
    @RequestMapping(value = "/getClient/{server_id}", method = RequestMethod.POST)
    public List<Client> getClient(@PathVariable String server_id){
        return clientService.selectCBySId(server_id);
    }

    //替客户下单,并自己接单
    @RequestMapping(value = "/makeOrderByS/{server_id}/{client_id}", method = RequestMethod.GET)
    public int makeOrderByS(@PathVariable String server_id, @PathVariable String client_id, Order order){
        order.setOrderTime(new Date());
        order.setClientId(client_id);
        order.setMandatorId("0");
        order.setIsSubstitue(1);
        if(orderService.insert(order) != 0 ){
            return serverService.insertOrderServers(order.getOrderId(), server_id, 2);
        }
        return 0;
    }

    //替客户下单,委托伙伴
    @RequestMapping(value = "/makeOrderByM/{mandator_id}/{server_id}/{client_id}", method = RequestMethod.GET)
    public int makeOrderByS(@PathVariable String mandator_id,@PathVariable String server_id, @PathVariable String client_id, Order order){
        order.setOrderTime(new Date());
        order.setClientId(client_id);
        order.setMandatorId(mandator_id);
        order.setIsSubstitue(1);
        if(orderService.insert(order) != 0 ){
            return serverService.insertOrderServers(order.getOrderId(), server_id, 2);
        }
        return 0;
    }

    //sss
    //得到基本信息
    @RequestMapping(value = "/getServerInfo/{server_id}", method = RequestMethod.POST)
    public Server getServerInfo(@PathVariable String server_id){
        return serverService.selectServerBySId(server_id);
    }

    //修改基本信息
    @RequestMapping(value = "/updateServerInfo/{server_id}", method = RequestMethod.GET)
    public int  updateServerInfo(@PathVariable String server_id, Server server){
        serverService.selectServerBySId(server_id).setServerName(server.getServerName());
        serverService.selectServerBySId(server_id).setServerGender(server.getServerGender());
        serverService.selectServerBySId(server_id).setServerTel(server.getServerTel());
        serverService.selectServerBySId(server_id).setServerLocation(server.getServerLocation());
        return serverService.updateServerInfo(serverService.selectServerBySId(server_id));
    }

    //设置项目和价格
    @RequestMapping(value = "/updateService/{server_id}", method = RequestMethod.GET)
    public int  updateService(@PathVariable String server_id, Server_service service){
        serverService.selectServiceBySId(server_id).setServiceProject(service.getServiceProject());
        serverService.selectServiceBySId(server_id).setPrice(service.getPrice());
        return serverService.updateServerService(serverService.selectServiceBySId(server_id));
    }

    @RequestMapping("/test")
    public String test() throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM");

       return simpleDateFormat.format( simpleDateFormat.parse("2020-04"));
    }
}
