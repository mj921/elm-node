import OrderService from "../services/OrderService";
import BaseController from "./BaseController";

export default class OrderController extends BaseController {
  constructor() {
    super();
    this.orderService = new OrderService();
  }
  /** 获取订单列表 */
  getOrders(req, res, next) {
    this.orderService.getOrders(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取订单 */
  getOrder(req, res, next) {
    this.orderService.getOrder(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 新增订单 */
  addOrder(req, res, next) {
    this.orderService.addOrder(req.body)
    .then(result => {
      res.json(this.successJson(result, "新增订单成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改订单 */
  updateOrder(req, res, next) {
    this.orderService.updateOrder(req.body)
    .then(result => {
      res.json(this.successJson(result, "修改订单成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 删除订单 */
  deleteOrder(req, res, next) {
    this.orderService.deleteOrder(req.params.id)
    .then(result => {
      res.json(this.successJson(result, "删除订单成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取订单菜品 */
  getOrderDishs(req, res, next) {
    this.orderService.getOrderDishs(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改订单状态 */
  updateOrderStatus(req, res, next) {
    this.orderService.updateOrderStatus(req.body.id, req.body.status)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
}