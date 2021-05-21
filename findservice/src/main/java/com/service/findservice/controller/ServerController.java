package com.service.findservice.controller;

import com.google.zxing.WriterException;
import com.service.findservice.entity.*;
import com.service.findservice.result.ResultBody;
import com.service.findservice.result.ResultCode;
import com.service.findservice.server.ClientService;
import com.service.findservice.server.DemandService;
import com.service.findservice.server.OrderService;
import com.service.findservice.server.ServerServiceService;
import com.service.findservice.util.QrCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/server")
public class ServerController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private DemandService demandService;

    @Autowired
    private ServerServiceService serverServiceService;

    @Autowired
    private com.service.findservice.server.ServerService serverService;

    //一周的订单
    @RequestMapping(value = "/getOrderWeek/{server_id}")
    public List getOrderWeek(@PathVariable String server_id) {
        List<Order> orderList = orderService.selectWeekOrderByDate(server_id, new Date());
        return serverService.getOrderInfo(orderList);
    }

    /**
     * 得到某个月的订单
     *
     * @param server_id
     * @param year_month 格式yyyy-mm
     * @return orderList
     */
    @RequestMapping(value = "/getOrderMonth/{server_id}/{year_month}")
    public List getOrderMonth(@PathVariable String server_id, @PathVariable String year_month) {
        List<Order> orderList = orderService.selectMonthlyOrdersByServerId(server_id, year_month);
        return serverService.getOrderInfo(orderList);
    }

    //所有订单
    @RequestMapping(value = "/getAllOrder/{server_id}")
    public List getAllOrder(@PathVariable String server_id) {
        List<Order> orderList = orderService.selectOrderBySId(server_id);
        return serverService.getOrderInfo(orderList);
    }

    //今日订单
    @RequestMapping(value = "/getOrderToday/{server_id}")
    public List<Order> getOrderToday(@PathVariable String server_id) {
        List<Order> orderList = orderService.selectOrderByDate(server_id, new Date());
        return serverService.getOrderInfo(orderList);
    }

    /**
     * 根据日期查询订单
     *
     * @param server_id
     * @param date 格式yyyy-mm-dd
     * @return orderList
     * @throws ParseException
     */
    @RequestMapping(value = "/getOrderByDate/{server_id}/{date}")
    public List<Order> getOrderByDate(@PathVariable String server_id, @PathVariable String date) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<Order> orderList = orderService.selectOrderByDate(server_id, simpleDateFormat.parse(date));
        return serverService.getOrderInfo(orderList);
    }

    /**
     * 查询用户作为委托人的未结算信息
     *
     * @param mandator_id
     * @return 委托人的伙伴信息
     */
    @RequestMapping(value = "/getUnFinOrderInfo/{mandator_id}")
    public List getUnFinOrderInfo(@PathVariable String mandator_id) {
        List<Map<String, Object>> infoList = new ArrayList<>();
        List<String> serverList = orderService.selectUnFinOrderByMId(mandator_id);
        if (serverList != null) {
            for (String server_id : serverList) {
                Map<String, Object> info = new HashMap<>();
                //伙伴信息
                Server server = serverService.findServerById(server_id);
                info.put("server", server);
                //委托数
                info.put("manOrderNum", serverService.selectManOrderNum(server.getServerId()));
                //接单数
                info.put("orderNum", serverService.selectOrderNum(server.getServerId()));
                //未结算数量
                info.put("UnFinOrderNum", serverService.selectUnFinOrderNum(server.getServerId()));
                infoList.add(info);
            }
        }
        return infoList;
    }

    /**
     * 查询某一服务师未结算订单详情
     *
     * @param server_id
     * @return order_detail
     */

    @RequestMapping(value = "/getUnFinOrder/{server_id}")
    public List<Order> getUnFinOrder(@PathVariable String server_id) {
        return orderService.selectUnFinOrderBySId(server_id);
    }

    /**
     *直接客户名单
     *
     * @param server_id
     * @return 直接客户的信息
     */
    @RequestMapping(value = "/getClient/{server_id}")
    public List getClient(@PathVariable String server_id) {
        List<Map<String, Object>> infoList = new ArrayList<>();
        List<Client> clientList = clientService.selectCByServerId(server_id);
        if (clientList != null) {
            for (Client client : clientList) {
                Map<String, Object> info = new HashMap<>();
                //客户信息
                info.put("clientInfo", client);
                //最多的服务项目
                info.put("mostProject", clientService.selectMostProj(client.getClientId()));
                //服务数量
                info.put("orderNum", clientService.selectOrderNum(client.getClientId()));
                //委托数
                info.put("ManOrderNum", clientService.selectManOrderNum(client.getClientId()));
                infoList.add(info);
            }
        }
        return infoList;
    }

    //

    /**
     *获取客户新需求
     *
     * @param server_id
     * @return 客户信息+需求信息
     */
    @RequestMapping(value = "/getDemand/{server_id}")
    public List getDemand(@PathVariable String server_id) {
        List<Map<String, Object>> infoList = new ArrayList<>();
        List<Demand> demandList = demandService.selectDemandByServerId(server_id);
        if (demandList != null) {
            for (Demand demand : demandList) {
                Map<String, Object> info = new HashMap<>();
                //用户信息
                info.put("client", clientService.selectClientById(demand.getClientId()));
                //
                info.put("demand", demand);
                infoList.add(info);
            }
        }
        return infoList;
    }

    /**
     * 结算订单
     *
     * @param server_id
     * @param order_id
     * @return 1 -> 成功 0 -> 失败
     */
    @RequestMapping(value = "/finishOrder/{server_id}/{order_id}")
    public int finishOrder(@PathVariable String server_id, @PathVariable int order_id) {
        return orderService.updateFinish(server_id, order_id);
    }

    /**
     * 中止订单
     *
     * @param order_id
     * @return
     */
    @RequestMapping(value = "/endOrder/{order_id}")
    public int endOrder(@PathVariable int order_id) {
        return orderService.deleteOrderServer(order_id);
    }

    /**
     *
     * 更具客户名获取订单
     * @param server_id
     * @param client_name
     * @return orderList
     */
    @RequestMapping(value = "/getOrderByCName/{server_id}/{client_name}")
    public List<Order> getOrderByCName(@PathVariable String server_id, @PathVariable String client_name) {
        List<Client> clients = clientService.selectByClientName(client_name);
        List<Order> orders = new LinkedList<>();
        for (int i = 0; i < clients.size(); i++) {
            orders.addAll(orderService.selectOrderByCId(clients.get(i).getClientId()));
        }
        return orders;
    }

    /**
     * 获取伙伴名单
     *
     * @param server_id
     * @return
     */
    @RequestMapping(value = "/getPartner/{server_id}")
    public List<Server> getPartner(@PathVariable String server_id) {
        return serverServiceService.selectPartnerBySId(server_id);
    }

    /**
     * 设置截单时间
     *
     * @param server_id
     * @param work_day
     * @param work_hour
     * @return 1 -> 成功 0 -> 失败
     */
//    @RequestMapping(value = "/updateWorkTime/{server_id}/{work_day}/{work_hour}")
//    public int updateWorkTime(@PathVariable String server_id, @RequestBody List<ServerWorkTime> serverWorkTimeList) {
//        for(ServerWorkTime serverWorkTime : serverWorkTimeList){
//
//        }
//    }

    /**
     * 设置接单参数
     *
     * @param server_id
     * @param serverParameter
     * @return  -> 成功 0 -> 失败
     */
    @RequestMapping(value = "/updateServerParameter/{server_id}")
    public int updateServerParameter(@PathVariable String server_id, @RequestBody ServerParameter serverParameter) {
        if(serverService.getServerParameter(server_id) == null){
            return serverService.insertPara(serverParameter);
        }
        return serverService.updatePara(serverParameter);
    }

    /**
     * 获取服务师信息
     * @param server_id
     * @return 服务师信息+接单时间
     */
    @RequestMapping(value = "/getWorkTime/{server_id}")
    public Map getWorkTime(@PathVariable String server_id){
        //服务师信息
        Map<String, Object> info = new HashMap<>();
        info.put("serverInfo", serverService.findServerById(server_id));
        //接单时间
        List<ServerWorkTime> timeList = serverService.getWorkTime(server_id);
        Map<Integer, Integer> workTime = new HashMap<>();
        if(timeList != null){
            for(ServerWorkTime serverWorkTime : timeList){
                workTime.put(serverWorkTime.getWorkDay(),serverWorkTime.getWorkHour());
            }
        }
        info.put("workDay:workHour", workTime);
        return info;
    }

    /**
     * 得到接单参数
     *
     * @param server_id
     * @return 接单参数
     */
    @RequestMapping(value = "/getServerParameter/{server_id}")
    public ServerParameter getServerParameter(@PathVariable String server_id){
        return serverService.getServerParameter(server_id);
    }

    /**
     * 添加伙伴
     *
     * @param server_id
     * @param partner_id
     * @return 1 -> 成功 0 -> 失败
     */
    @RequestMapping(value = "/addPartner/{server_id}/{partner_id}")
    public int addPartner(@PathVariable String server_id, @PathVariable String partner_id) {
        List<String> s_cl = serverServiceService.selectCIdBySid(server_id);
        List<String> p_cl = serverServiceService.selectCIdBySid(partner_id);
        s_cl.retainAll(p_cl);
        if (s_cl.size() != 0) {
            return 0;
        } else {
            return serverServiceService.addPartner(server_id, partner_id);
        }
    }

    /**
     * 接单
     *
     * @param server_id
     * @param demand_id
     * @param order
     * @return
     */
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    @PostMapping("/receiveOrder/{server_id}/{demand_id}")
    public int receiveOrder(@PathVariable String server_id, @PathVariable int demand_id, @RequestBody Order order) {
        Demand demand = demandService.selectDemandByDemandId(demand_id);
        Date date = new Date();
        order.setOrderTime(date);
        order.setClientId(demand.getClientId());
        order.setMandatorId("0");
        order.setIsSubstitue(0);
        //如果新订单插入成功 将信息插入order_servers并删除对应需求；失败则直接返回0
        if (orderService.insert(order) != 0) {
            if (serverServiceService.insertOrderServers(order.getOrderId(), server_id, 0) != 0) {
                return demandService.deleteByDemandId(demand_id);
            }
        }
        return 0;
    }

    /**
     * 委托
     *
     * @param mandator_id
     * @param server_id
     * @param demand_id
     * @param order
     * @return 1 -> 成功 0 -> 失败
     */
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    @PostMapping("/giveOrder/{mandator_id}/{server_id}/{demand_id}")
    public int giveOrder(@PathVariable String mandator_id, @PathVariable String server_id, @PathVariable int demand_id, @RequestBody Order order) {
        Demand demand = demandService.selectDemandByDemandId(demand_id);
        order.setOrderTime(new Date());
        order.setClientId(demand.getClientId());
        order.setMandatorId(mandator_id);
        order.setServiceProject(demand.getServiceProject());
        order.setStartTime(demand.getStartTime());
        order.setEndTime(demand.getEndTime());
        order.setIsSubstitue(0);
        //如果新订单插入成功 将信息插入order_servers并删除对应需求；失败则直接返回0
        if (orderService.insert(order) != 0) {
            if (serverServiceService.insertOrderServers(order.getOrderId(), server_id, 2) != 0) {
                return demandService.deleteByDemandId(demand_id);
            }
        }
        return 0;
    }


    /**
     * 替客户下单,并自己接单
     *
     * @param server_id
     * @param client_id
     * @param order
     * @return 1 -> 成功 0 -> 失败
     */
    @PostMapping(value = "/makeOrderByS/{server_id}/{client_id}")
    public int makeOrderByS(@PathVariable String server_id, @PathVariable String client_id, @RequestBody Order order) {
        order.setOrderTime(new Date());
        order.setClientId(client_id);
        order.setMandatorId("0");
        order.setIsSubstitue(1);
        if (orderService.insert(order) != 0) {
            return serverServiceService.insertOrderServers(order.getOrderId(), server_id, 2);
        }
        return 0;
    }

    /**
     * 替客户下单,委托伙伴
     *
     * @param mandator_id
     * @param server_id
     * @param client_id
     * @param order
     * @return 1 -> 成功 0 -> 失败
     */
    @PostMapping(value = "/makeOrderByM/{mandator_id}/{server_id}/{client_id}")
    public int makeOrderByS(@PathVariable String mandator_id, @PathVariable String server_id, @PathVariable String client_id, @RequestBody Order order) {
        order.setOrderTime(new Date());
        order.setClientId(client_id);
        order.setMandatorId(mandator_id);
        order.setIsSubstitue(1);
        //如果新订单插入成功 将信息插入order_servers；失败则直接返回0
        if (orderService.insert(order) != 0) {
            return serverServiceService.insertOrderServers(order.getOrderId(), server_id, 2);
        }
        return 0;
    }


    /**
     * 得到基本信息
     *
     * @param server_id
     * @return 1 -> 成功 0 -> 失败
     */
    @RequestMapping(value = "/getServerInfo/{server_id}")
    public Server getServerInfo(@PathVariable String server_id) {
        return serverServiceService.selectServerBySId(server_id);
    }

    /**
     * 修改基本信息
     *
     * @param server_id
     * @param server
     * @return 1 -> 成功 0 -> 失败
     */
    @RequestMapping(value = "/updateServerInfo/{server_id}")
    public int updateServerInfo(@PathVariable String server_id, Server server) {
        serverServiceService.selectServerBySId(server_id).setServerName(server.getServerName());
        serverServiceService.selectServerBySId(server_id).setServerGender(server.getServerGender());
        serverServiceService.selectServerBySId(server_id).setServerTel(server.getServerTel());
        serverServiceService.selectServerBySId(server_id).setServerLocation(server.getServerLocation());
        return serverServiceService.updateServerInfo(serverServiceService.selectServerBySId(server_id));
    }


    /**
     * 设置项目和价格
     *
     * @param server_id
     * @param service
     * @return 1 -> 成功 0 -> 失败
     */
    @RequestMapping(value = "/updateService/{server_id}")
    public int updateService(@PathVariable String server_id, ServerService service) {
        serverServiceService.selectServiceBySId(server_id).setServiceProject(service.getServiceProject());
        serverServiceService.selectServiceBySId(server_id).setPrice(service.getPrice());
        return serverServiceService.updateServerService(serverServiceService.selectServiceBySId(server_id));
    }


    /**
     * 通过server id得到server的信息
     *
     * @param serverId server id
     * @param week     某周的起始日期，格式为yyyy-MM-dd，不要求一定传值
     * @return
     */
    @GetMapping(path = "/info")
    public ResultBody getServerInfoByServerId(@RequestParam(name = "serverId") String serverId,
                                              @RequestParam(name = "week", required = false) String week) {
        if (null == serverId) {
            return new ResultBody(ResultCode.FAIL);
        }
        ServerInfo serverInfo = new ServerInfo();
        serverInfo.setServerInfo(serverService.findServerById(serverId));
        if (null != week) {
            serverInfo.setWeeklyWorkTime(getWeeklyOrders(serverId, week));
        }
        return new ResultBody(ResultCode.SUCCESS, serverInfo);
    }

    /**
     * 返回服务人员的二维码信息
     * @param serverId server id
     * @param width 二维码的宽
     * @param height 二维码的高
     * @return base64 url
     * @throws IOException 输出流
     * @throws WriterException 写入qrcode
     */
    @GetMapping(path = "/qrcode")
    public ResultBody getServerQrCode(@RequestParam(name = "serverId") String serverId,
                                      @RequestParam(name = "width", required = false) Integer width,
                                      @RequestParam(name = "height", required = false) Integer height) throws IOException, WriterException {
        if (null == serverId) {
            return new ResultBody(ResultCode.FAIL);
        }
        if (null == width || null == height) {
            width = 500;
            height = 500;
        }
        return new ResultBody(ResultCode.SUCCESS, QrCode.getQrCodeBase64(serverId, width, height));
    }

    /**
     * 新建server信息
     *
     * @param server Server对象
     * @return 200->success 400->fail
     */
    @PostMapping(path = "/info")
    public ResultBody createServer(@RequestBody Server server) {
        if (null == server || (null == server.getServerId() || null != serverService.findServerById(server.getServerId()))) {
            return new ResultBody(ResultCode.FAIL);
        }
        int res = serverService.addServer(server);
        return res > 0 ? new ResultBody(ResultCode.SUCCESS) : new ResultBody(ResultCode.FAIL);
    }

    private List<List<Boolean>> getWeeklyOrders(String serverId, String week) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        List<List<Boolean>> weeklyOrders = new ArrayList<>();
        Date beginDate = null;
        try {
            beginDate = format.parse(week);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (null != beginDate) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(beginDate);
            for (int i = 0; i < 7; i++) {
                String day = format.format(calendar.getTime());
                weeklyOrders.add(getDailyWorkTime(serverId, day));
                calendar.add(Calendar.DATE, 1);
            }
        }
        return weeklyOrders;
    }

    private List<Boolean> getDailyWorkTime(String serverId, String date) {
        List<Order> orders = orderService.selectOrdersByClientIdAndDate(serverId, date);
        List<Boolean> dailyWorkTime = new ArrayList<>(10);
        if (orders == null) {
            return dailyWorkTime;
        }
        for (Order order : orders) {
            int begin = order.getStartTime().getHours() - 8;
            int end = order.getEndTime().getHours() - 8;
            while (begin < end) {
                dailyWorkTime.set(begin, true);
                begin++;
            }
        }
        return dailyWorkTime;
    }
}
