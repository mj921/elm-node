import OrderDao from "../daos/OrderDao";
import Page from "../lib/Page";
import ServiceError from "../lib/ServiceError";
import Order from "../models/Order";
import DishDao from "../daos/DishDao";
import MerchantDao from "../daos/MerchantDao";
import AddressDao from "../daos/AddressDao";
import BaseService from "./BaseService";

export default class OrderService extends BaseService {
  constructor() {
    super();
    this.orderDao = new OrderDao();
    this.dishDao = new DishDao();
    this.merchantDao = new MerchantDao();
    this.addressDao = new AddressDao();
  }
  /** 获取订单列表 */
  async getOrders(query) {
    const list = await this.orderDao.getOrders(query);
    const page = new Page({
      current: query.current,
      pageSize: query.pageSize
    });
    const total = await this.orderDao.getOrderTotal(query);
    page.setTotal(total);
    return {
      list: list.map(item => new Order(item)),
      page
    };
  }
  /** 获取订单 */
  async getOrder(id) {
    const order = await this.orderDao.getOrder(id);
    if (!order) {
      throw new ServiceError("该订单不存在");
    }
    const dishs = await this.orderDao.getOrderDishDetail(id);
    order.dishs = dishs;
    return new Order(order);
  }
  /** 新增订单 */
  async addOrder(orderModel) {
    if (orderModel.username.length > 20) {
      throw new ServiceError("联系人姓名长度不能大于20");
    }
    if (!this.validPhone(orderModel.phone)) {
      throw new ServiceError("联系电话格式不正确");
    }
    if (orderModel.address.length > 100) {
      throw new ServiceError("订单地址长度不能大于100");
    }
    if (orderModel.remark.length > 50) {
      throw new ServiceError("订单备注长度不能大于50");
    }
    const address = await this.addressDao.getAddress(orderModel.addressId);
    if (!address) {
      throw new ServiceError("地址不存在");
    }
    const merchant = await this.merchantDao.getMerchant(orderModel.merchantId);
    if (!merchant) {
      throw new ServiceError("商户不存在");
    }
    const dishs = await this.dishDao.getDishByIds(orderModel.merchantId, orderModel.dishs.map(item => item.id));
    if (dishs.length !== orderModel.dishs.length) {
      throw new ServiceError("该商户菜品不存在");
    }
    const result = await this.orderDao.insterOrder(orderModel);
    return result;
  }
  /** 修改订单 */
  async updateOrder(orderModel) {
    const order = await this.orderDao.getOrder(orderModel.id);
    if (!order) {
      throw new ServiceError("该订单不存在");
    }
    if (orderModel.username.length > 20) {
      throw new ServiceError("联系人姓名长度不能大于20");
    }
    if (!this.validPhone(orderModel.phone)) {
      throw new ServiceError("联系电话格式不正确");
    }
    if (orderModel.address.length > 100) {
      throw new ServiceError("订单地址长度不能大于100");
    }
    if (!this.validDate(orderModel.date, "YYYY-MM-DD")) {
      throw new ServiceError("日期格式不正确");
    }
    let dishs = await this.dishDao.getDishByIds(orderModel.dishs);
    dishs = dishs.filter(item => item.status = 1);
    if (dishs.length === 0) {
      throw new ServiceError("所选菜品都为已禁用或已删除");
    }
    orderModel.dishs = dishs.map(item => item.id);
    const result = await this.orderDao.updateOrder(orderModel);
    return result;
  }
  /** 删除订单 */
  async deleteOrder(id) {
    const order = await this.orderDao.getOrder(id);
    if (!order) {
      throw new ServiceError("该订单不存在");
    }
    const result = await this.orderDao.deleteOrder(id);
    return result;
  }
  /** 获取订单菜品 */
  async getOrderDishs(id) {
    return await this.orderDao.getOrderDishDetail(id);
  }
  /** 修改订单状态*/
  async updateOrderStatus(id, status) {
    return await this.orderDao.updateOrderStatus(id, status);
  }
}