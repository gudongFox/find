package com.service.findservice.controller;

import com.service.findservice.entity.Client;
import com.service.findservice.entity.Demand;
import com.service.findservice.entity.Order;
import com.service.findservice.entity.Server;
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

    @RequestMapping("/getOrderWeek/{server_id}")
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

    @RequestMapping("/getAllOrder/{server_id}")
    public List<Order> getAllOrder(@PathVariable String server_id){
        return orderService.selectOrderBySId(server_id);
    }

    @RequestMapping("/getOrderToday/{server_id}")
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

    @RequestMapping("/getOrderByDate/{server_id}/{date}")
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
    @RequestMapping("/getUnFinOrder/{server_id}")
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
    @RequestMapping("/finishOrder/{server_id}/{order_id}")
    public int finishOrder(@PathVariable String server_id, @PathVariable int order_id){
        return orderService.updateFinish(server_id, order_id);
    }

    //中止订单
    @RequestMapping("/endOrder/{order_id}")
    public int endOrder( @PathVariable int order_id){
        return orderService.deleteOrderServer(order_id);
    }

    @RequestMapping("/getOrderByCName/{server_id}/{client_name}")
    public List<Order> getOrderByCName(@PathVariable String server_id ,@PathVariable String client_name) {
        List<Client> clients = clientService.selectByClientName(client_name);
        List<Order> orders = new LinkedList<>();
        for(int i = 0; i < clients.size(); i++) {
             orders.addAll(orderService.selectOrderByCId(clients.get(i).getClientId()));
        }
        return orders;
    }

    //获取伙伴名单
    @RequestMapping("/getPartner/{server_id}")
    public List<Server> getPartner(@PathVariable String server_id){
        return serverService.selectPartnerBySId(server_id);
    }

    @RequestMapping("/getDemand/{server_id}")
    public List<Demand> getDemand(@PathVariable String server_id) {
        return demandService.selectDemandBySID(server_id);
    }

    @RequestMapping("/updateWorkTime/{server_id}/{work_day}/{work_hour}")
    public int updateWorkTime(@PathVariable String server_id, @PathVariable int work_day, @PathVariable int work_hour) {
        return serverService.updateSeverWorkTime(server_id, work_day, work_hour);
    }

    @RequestMapping("/updateServerParameter/{server_id}/{max_distance}/{max_interval_distance}/{min_service_time}/{min_interval_time}")
    public int updateServerParameter(@PathVariable String server_id, @PathVariable float max_distance, @PathVariable float max_interval_distance
            , @PathVariable float min_service_time, @PathVariable float min_interval_time) {
        return serverService.updateServerParameter(server_id, max_distance, max_interval_distance, min_service_time, min_interval_time);
    }

    //添加伙伴
    @RequestMapping("/addPartner/{server_id}/{partner_id}")
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
    @RequestMapping("/getClient/{server_id}")
    public List<Client> getClient(@PathVariable String server_id){
        return clientService.selectCBySId(server_id);
    }

    //替客户下单,并自己接单
    @RequestMapping("/makeOrderByS/{server_id}/{client_id}")
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
    @RequestMapping("/makeOrderByM/{mandator_id}/{server_id}/{client_id}")
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

    @RequestMapping("/test")
    public int test(){
        return 0;
    }
}
