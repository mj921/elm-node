import DishDao from "../daos/DishDao";
import Page from "../lib/Page";
import ServiceError from "../lib/ServiceError";
import Dish from "../models/Dish";

export default class DishService {
  constructor() {
    this.dishDao = new DishDao();
  }
  /** 获取菜品列表 */
  async getDishs(query) {
    const list = await this.dishDao.getDishs(query);
    const page = new Page({
      current: query.current,
      pageSize: query.pageSize
    });
    const total = await this.dishDao.getDishTotal(query);
    page.setTotal(total);
    return {
      list: list.map(item => new Dish(item)),
      page
    };
  }
  /** 获取菜品列表 不分页 */
  async getDishAll(query) {
    return await this.dishDao.getDishAll(query);
  }
  /** 获取菜品 */
  async getDish(id) {
    const dish = await this.dishDao.getDish(id);
    if (!dish) {
      throw new ServiceError("该菜品不存在");
    }
    return new Dish(dish);
  }
  /** 新增菜品 */
  async addDish(dishModel) {
    if (dishModel.name.length > 20) {
      throw new ServiceError("菜品名称长度不能大于20");
    }
    const dish = await this.dishDao.getDishByName(dishModel.name);
    if (dish) {
      throw new ServiceError("菜品名称已存在");
    }
    if (dishModel.introduce.length > 150) {
      throw new ServiceError("菜品描述长度不能大于150");
    }
    const result = await this.dishDao.insterDish(dishModel);
    return result;
  }
  /** 修改菜品 */
  async updateDish(dishModel) {
    const dish = await this.dishDao.getDish(dishModel.id);
    if (!dish) {
      throw new ServiceError("该菜品不存在");
    }
    if (dishModel.name.length > 20) {
      throw new ServiceError("菜品名称长度不能大于20");
    }
    const dish1 = await this.dishDao.getDishByNameAndId(dishModel.name, dishModel.id);
    if (dish1) {
      throw new ServiceError("菜品名称已存在");
    }
    if (dish.introduce.length > 150) {
      throw new ServiceError("菜品描述长度不能大于150");
    }
    const result = await this.dishDao.updateDish(dishModel);
    return result;
  }
  /** 删除菜品 */
  async deleteDish(id) {
    const dish = await this.dishDao.getDish(id);
    if (!dish) {
      throw new ServiceError("该菜品不存在");
    }
    const result = await this.dishDao.deleteDish(id);
    return result;
  }
  /** 修改菜品状态*/
  async updateDishStatus(id, status) {
    return await this.dishDao.updateDishStatus(id, status);
  }
}