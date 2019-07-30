export default {
  /** 新增订单 */
  insertOrder: "insert into e_order(merchant_id, user_id, address_id, phone, username, price, address, remark, addtime, modifytime) values(?, ?, ?, ?, ?, ?, ?, ?, now(), now())",
  /** 新增订单菜品 */
  insertOrderDish: "insert into e_order_dish(order_id, dish_id, merchant_id, num, price, addtime, modifytime) values(?, ?, ?, ?, ?, now(), now())",
  /** 获取订单列表 */
  getOrders: `select
                e_order.id id,
                e_order.merchant_id merchantId,
                e_merchant.logo merchantLogo,
                e_merchant.name merchantName,
                e_order.user_id userId,
                e_order.address_id addressId,
                e_order.phone phone,
                e_order.username username,
                e_order.price price,
                e_order.address address,
                e_order.status status,
                e_order.addtime addtime,
                e_order.modifytime modifytime,
                e_order.finishtime finishtime,
                order_dishs.dishNames dishNames 
              from
                e_order
                left join (
                  select
                  GROUP_CONCAT(e_dish.name SEPARATOR ',') dishNames,
                  e_order_dish.order_id order_id
                  from
                    e_order_dish
                    left join e_dish on e_order_dish.dish_id = e_dish.id 
                  where
                    e_dish.deleted = 0 
                    and e_order_dish.deleted = 0 
                    and e_dish.status = 1
                    group by e_order_dish.order_id
                    ) order_dishs
                on e_order.id = order_dishs.order_id
                left join e_merchant on e_order.merchant_id = e_merchant.id
              where
                e_order.deleted = 0 
                and (true = ? or e_order.user_id = ?)
                and e_order.phone like ? 
                and e_order.username like ? 
                and ( true = ? or e_order.status = ? ) 
                order by e_order.addtime desc
                limit ?, ?`,
  /** 获取订单总数 */
  getOrderTotal: "select count(*) total from e_order where deleted = 0 and (true = ? or user_id = ?) and phone like ? and username like ? and ( true = ? or status = ? )",
  /** 获取订单 */
  getOrder: "select id, merchant_id merchantId, user_id userId, address_id addressId, phone, username, price, remark, finishtime, status, address, addtime, modifytime from e_order where deleted = 0  and id = ?",
  /** 获取订单菜品详情 */
  getOrderDishDetail: `select
                    e_dish.id id,
                    e_order_dish.order_id orderId,
                    e_dish.name name,
                    e_dish.price price,
                    e_dish.img img,
                    e_order_dish.num num
                  case
                    when e_dish.deleted = 1 then
                    0 else e_dish.status 
                  end status 
                  from
                    e_order_dish
                    left join e_dish on e_order_dish.dish_id = e_dish.id 
                  where
                    e_order_dish.deleted = 0 
                  and e_order_dish.order_id = ?`,
  /** 删除订单菜品 */
  deleteOrderDishs: "update e_order_dish set deleted = 1 where order_id = ?",
  /** 修改订单 */
  updateOrder: "update e_order set phone = ?, username = ?, table_number = ?, address = ?, date = ?, type = ? where id = ?",
  /** 修改订单状态 */
  updateOrderStatus: "update e_order set status = ? where id = ?",
  /** 删除订单 */
  deleteOrder: "update e_order set deleted = 1 where id = ?"
};