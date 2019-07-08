export default {
  /** 新增订单 */
  insertOrder: "insert into r_order(phone, username, table_number, address, date, type, addtime, modifytime) values(?, ?, ?, ?, ?, ?, now(), now())",
  /** 新增订单菜品 */
  insertOrderDish: "insert into order_dish(order_id, dish_id, addtime, modifytime) values(?, ?, now(), now())",
  /** 获取订单列表 */
  getOrders: `select
                r_order.id id,
                r_order.phone phone,
                r_order.username username,
                r_order.table_number tableNumber,
                r_order.date date,
                r_order.status status,
                r_order.type type,
                r_order.address address,
                r_order.addtime addtime,
                r_order.modifytime modifytime,
                order_count.count dishNum 
              from
                r_order
                left join (
              select
                order_dish.order_id order_id,
                count( * ) count 
              from
                order_dish
                left join dish on order_dish.dish_id = dish.id 
              where
                dish.deleted = 0 
                and order_dish.deleted = 0 
                and dish.status = 1 
              group by
                order_dish.order_id 
                ) order_count on r_order.id = order_count.order_id 
              where
                r_order.deleted = 0 
                and r_order.phone like ? 
                and r_order.username like ? 
                and ( true = ? or r_order.status = ? ) 
                and ( true = ? or r_order.type = ? ) 
                and (true = ? or r_order.date >= ?) 
                and (true = ? or r_order.date <= ?)
                limit ?, ?`,
  /** 获取订单总数 */
  getOrderTotal: "select count(*) total from r_order where deleted = 0 and phone like ? and username like ? and ( true = ? or status = ? ) and ( true = ? or type = ? ) and (true = ? or date >= ?) and (true = ? or date <= ?)",
  /** 获取订单 */
  getOrder: "select id, phone, username, table_number tableNumber, date, status, type, address, addtime, modifytime from r_order where deleted = 0  and id = ?",
  /** 获取订单菜品详情 */
  getOrderDishDetail: `select
                    order_dish.id id,
                    dish.id dishId,
                    order_dish.order_id orderId,
                    dish.name dishName,
                  case
                    when dish.deleted = 1 then
                    0 else dish.status 
                  end status 
                  from
                    order_dish
                    left join dish on order_dish.dish_id = dish.id 
                  where
                    order_dish.deleted = 0 
                  and order_dish.order_id = ?`,
  /** 删除订单菜品 */
  deleteOrderDishs: "update order_dish set deleted = 1 where order_id = ?",
  /** 修改订单 */
  updateOrder: "update r_order set phone = ?, username = ?, table_number = ?, address = ?, date = ?, type = ? where id = ?",
  /** 修改订单状态 */
  updateOrderStatus: "update r_order set status = ? where id = ?",
  /** 删除订单 */
  deleteOrder: "update r_order set deleted = 1 where id = ?"
};