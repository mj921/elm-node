import Dish from "../models/Dish";
import config from "../config";

export default {
  getDishs: {
    query: {
      merchantId: [Number, "商户id", true],
      name: [String, "菜品名称", false, ""],
      status: [Number, "菜品状态", false, Dish.STATUS.ALL],
      current: [Number, "当前页", false, config.page.current],
      pageSize: [Number, "每页条数", false, config.page.pageSize]
    }
  },
  getDishAll: {
    query: {
      merchantId: [Number, "商户id", true],
      name: [String, "菜品名称", false, ""],
      type: [String, "菜品类型", false, ""],
      status: [Number, "菜品状态", false, Dish.STATUS.ALL]
    }
  },
  getDish: {
    params: {
      id: [Number, "菜品id", true]
    }
  },
  addDish: {
    body: {
      merchantId: [Number, "商户id", true],
      name: [String, "菜品名称", true],
      price: [Number, "菜品价格", true],
      img: [String, "菜品图片", true],
      type: [String, "菜品类别", true],
      introduce: [String, "菜品描述", false, ""]
    }
  },
  updateDish: {
    body: {
      id: [Number, "菜品id", true],
      merchantId: [Number, "商户id", true],
      name: [String, "菜品名称", true],
      price: [Number, "菜品价格", true],
      img: [String, "菜品图片", true],
      type: [String, "菜品类别", true],
      introduce: [String, "菜品描述", false, ""]
    }
  },
  deleteDish: {
    params: {
      id: [Number, "菜品id", true]
    }
  },
  getDishMaterials: {
    params: {
      id: [Number, "菜品id", true]
    }
  },
  updateDishStatus: {
    body: {
      id: [Number, "菜品id", true],
      status: [Number, "菜品状态", true]
    }
  }
};