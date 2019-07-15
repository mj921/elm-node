import BaseDao from "./BaseDao";
import DishSql from "../daoSqls/DishSql";
import Dish from "../models/Dish";

export default class DishDao extends BaseDao {
  /** 获取菜品列表 */
  async getDishs(query) {
    return await this.execSql(DishSql.getDishs, [query.merchantId, query.merchantId, "%" + query.name + "%", query.status, query.status === Dish.STATUS.ALL, (query.current - 1) * query.pageSize, query.current * query.pageSize]);
  }
  /** 获取菜品列表 不分页 */
  async getDishAll(query) {
    return await this.execSql(DishSql.getDishAll, [query.merchantId, query.merchantId, "%" + query.name + "%", query.status, query.status === Dish.STATUS.ALL]);
  }
  /** 获取菜品总数 */
  async getDishTotal(query) {
    const result = await this.execSql(DishSql.getDishTotal, [query.merchantId, "%" + query.name + "%", query.status, query.status === Dish.STATUS.ALL]);
    return result[0].total;
  }
  /** 新增菜品 */
  async insterDish(dish) {
    const result = await this.execSql(DishSql.insertDish, [dish.merchantId, dish.name, dish.price, dish.img, dish.type, dish.introduce]);
    return result && result.affectedRows === 1;
  }
  /** 根据名称获取菜品 */
  async getDishByName(name) {
    const result = await this.execSql(DishSql.getDishByName, [name]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id获取菜品 */
  async getDish(id) {
    const result = await this.execSql(DishSql.getDish, [id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id删除菜品 */
  async deleteDish(id) {
    let queue = [{
      sql: DishSql.deleteDish,
      options: [id]
    }, {
      sql: DishSql.deleteDishMaterials,
      options: [id]
    }];
    return await this.execSqlTransaction(queue);
  }
  /** 更新菜品 */
  async updateDish(dish) {
    const result = await this.execSql(DishSql.updateDish, [dish.merchantId, dish.name, dish.price, dish.img, dish.type, dish.introduce, dish.id]);
    return result && result.affectedRows === 1;
  }
  /** 根据名称id获取菜品 */
  async getDishByNameAndId(name, id) {
    const result = await this.execSql(DishSql.getDishByNameAndId, [name, id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 修改菜品状态*/
  async updateDishStatus(id, status) {
    const result = await this.execSql(DishSql.updateDishStatus, [status, id]);
    return result.affectedRows === 1;
  }
  /** 根据id列表获取菜品列表*/
  async getDishByIds(ids) {
    return await this.execSql(DishSql.getDishByIds, [ids]);
  }
  /** 获取商户所有菜品类别 */
  async getDishTypesByMerchant(merchantId) {
    const result = await this.execSql(DishSql.getDishTypesByMerchant, [merchantId]);
    return result && result.map(item => item.type) || [];
  }
}