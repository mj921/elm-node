import BaseDao from "./BaseDao";
import OrderSql from "../daoSqls/OrderSql";
import Order from "../models/Order";

export default class OrderDao extends BaseDao {
  /** 获取订单列表 */
  async getOrders(query) {
    return await this.execSql(
      OrderSql.getOrders,
      [
        "%" + query.phone + "%",
        "%" + query.username + "%",
        query.status === Order.STATUS.ALL,
        query.status,
        query.type === Order.TYPE.ALL,
        query.type,
        !query.startDate,
        query.startDate,
        !query.endDate,
        query.endDate,
        (query.current - 1) * query.pageSize,
        query.current * query.pageSize
      ]);
  }
  /** 获取订单总数 */
  async getOrderTotal(query) {
    const result = await this.execSql(
      OrderSql.getOrderTotal,
      [
        "%" + query.phone + "%",
        "%" + query.username + "%",
        query.status === Order.STATUS.ALL,
        query.status,
        query.type === Order.TYPE.ALL,
        query.type,
        !query.startDate,
        query.startDate,
        !query.endDate,
        query.endDate,
        (query.current - 1) * query.pageSize,
        query.current * query.pageSize
      ]);
    return result[0].total;
  }
  /** 新增订单 */
  async insterOrder(order) {
    let queue = [{
      sql: OrderSql.insertOrder,
      options: [order.phone, order.username, order.tableNumber, order.address, order.date, order.type],
      callback: result => {
        order.dishs.forEach((item, i) => {
          queue[i + 1].options[0] = result.insertId;
        });
      }
    }];
    order.dishs.forEach(item => {
      queue.push({
        sql: OrderSql.insertOrderDish,
        options: [0, item]
      });
    });
    return await this.execSqlTransaction(queue);
  }
  /** 根据名称获取订单 */
  async getOrderByName(name) {
    const result = await this.execSql(OrderSql.getOrderByName, [name]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id获取订单 */
  async getOrder(id) {
    const result = await this.execSql(OrderSql.getOrder, [id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id删除订单 */
  async deleteOrder(id) {
    let queue = [{
      sql: OrderSql.deleteOrder,
      options: [id]
    }, {
      sql: OrderSql.deleteOrderDishs,
      options: [id]
    }];
    return await this.execSqlTransaction(queue);
  }
  /** 更新订单 */
  async updateOrder(order) {
    let queue = [{
      sql: OrderSql.updateOrder,
      options: [order.phone, order.username, order.tableNumber, order.address, order.date, order.type, order.id]
    }, {
      sql: OrderSql.deleteOrderDishs,
      options: [order.id]
    }];
    order.dishs.forEach(item => {
      queue.push({
        sql: OrderSql.insertOrderDish,
        options: [order.id, item]
      });
    });
    return await this.execSqlTransaction(queue);
  }
  /** 根据名称id获取订单 */
  async getOrderByNameAndId(name, id) {
    const result = await this.execSql(OrderSql.getOrderByNameAndId, [name, id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id获取订单菜品*/
  async getOrderDishs(id) {
    return await this.execSql(OrderSql.getOrderDishs, [id]);
  }
  /** 根据id获取订单菜品详情*/
  async getOrderDishDetail(id) {
    return await this.execSql(OrderSql.getOrderDishDetail, [id]);
  }
  /** 修改订单状态*/
  async updateOrderStatus(id, status) {
    const result = await this.execSql(OrderSql.updateOrderStatus, [status, id]);
    return result.affectedRows === 1;
  }
}