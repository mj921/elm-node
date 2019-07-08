import Order from "../models/Order";
import config from "../config";

export default {
  getOrders: {
    query: {
      phone: [String, "联系电话", false, ""],
      username: [String, "联系人姓名", false, ""],
      status: [Number, "类型状态", false, Order.STATUS.ALL],
      type: [Number, "订单类型", false, Order.TYPE.ALL],
      startDate: [String, "开始日期", false, ""],
      endDate: [String, "结束日期", false, ""],
      current: [Number, "当前页", false, config.page.current],
      pageSize: [Number, "每页条数", false, config.page.pageSize]
    }
  },
  addOrder: {
    body: {
      address: [String, "订单地址", true],
      phone: [String, "联系电话", true],
      username: [String, "联系人姓名", true],
      date: [String, "订单日期", true],
      type: [Number, "订单类型", true],
      dishs: [Array, "订单菜品列表", true],
      tableNumber: [Number, "订单桌数", true]
    }
  },
  updateOrder: {
    body: {
      id: [Number, "订单id", true],
      address: [String, "订单地址", true],
      phone: [String, "联系电话", true],
      username: [String, "联系人姓名", true],
      date: [String, "订单日期", true],
      type: [Number, "订单类型", true],
      dishs: [Array, "订单菜品列表", true],
      tableNumber: [Number, "订单桌数", true]
    }
  },
  getOrderDishs: {
    params: {
      id: [Number, "订单id", true]
    }
  },
  getOrder: {
    params: {
      id: [Number, "订单id", true]
    }
  },
  deleteOrder: {
    params: {
      id: [Number, "订单id", true]
    }
  },
  updateOrderStatus: {
    body: {
      id: [Number, "订单id", true],
      status: [Number, "订单状态", true]
    }
  }
};