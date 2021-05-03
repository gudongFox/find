package com.service.findservice.server;

import com.service.findservice.dao.OrderMapper;
import com.service.findservice.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public List<Order> selectOrderBySId(String server_id) {
        return orderMapper.selectOrderBySId(server_id);
    }

    public List<Order> selectOrderByCId(String client_id) {
        return orderMapper.selectOrderByCId(client_id);
    }

    public int selectFin(int order_id) {
        return orderMapper.selectFin(order_id);
    }

    public int insert(Order record) {
        return orderMapper.insert(record);
    }

    public int updateFinish(String server_id, int order_id) {
        return orderMapper.updateFinish(server_id, order_id);
    }

    public int deleteOrderServer(int order_id) {
        return orderMapper.deleteOrderServer(order_id);
    }

    public List<Order> selectOrderByDate(String server_id, Date date) {
        return orderMapper.selectOrderByDate(server_id, date);
    }

    public List<Order> selectWeekOrderByDate(String server_id, Date date) {
        return orderMapper.selectWeekOrderByDate(server_id, date);
    }

    public List<Order> selectMonthlyOrdersByServerId(String server_id, String date) {
        return orderMapper.selectMonOrderBySId(server_id, date);
    }

    public List<Order> findOrdersByClientId(String clientId) {
        return orderMapper.selectOrdersByClientId(clientId);
    }

    public List<Order> findMandatorCountById(String clientId, String mandatorId) {
        return orderMapper.selectOrdersByClientAndMandatorId(clientId, mandatorId);
    }

    public List<Order> findDirectCountById(String clientId, String serverId) {
        return orderMapper.selectOrdersByClientAndServerId(clientId, serverId);
    }

    public List<Order> findOrdersByClientId(String clientId, Integer month) {
        return orderMapper.selectOrdersByClientId(clientId, month);
    }

    public List<Order> selectOrdersByClientIdAndDate(String clientId, String date) {
        return orderMapper.selectOrdersByClientIdAndDate(clientId, date);
    }

    public List<Order> selectExecutingOrders(String clientId, String time) {
        return orderMapper.selectExecutingOrders(clientId, time);
    }

    public List<Boolean> selectMonthlyOrders(String clientId, String month) {
        List<Boolean> monthlyOrders = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        int daysOfMonth = 0;
        try {
            calendar.setTime(format.parse(month));
            daysOfMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        for (int i = 0; i < daysOfMonth; i++) {
            String date = format.format(calendar.getTime());
            if (orderMapper.selectOrdersCountByDate(clientId, date) > 0) {
                monthlyOrders.add(Boolean.TRUE);
            } else {
                monthlyOrders.add(Boolean.FALSE);
            }
            calendar.add(Calendar.DATE, 1);
        }
        return monthlyOrders;
    }
}
