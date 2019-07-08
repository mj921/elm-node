import BaseDao from "./BaseDao";
import DishSql from "../daoSqls/DishSql";
import Dish from "../models/Dish";

export default class DishDao extends BaseDao {
  /** 获取菜品列表 */
  async getDishs(query) {
    return await this.execSql(DishSql.getDishs, ["%" + query.name + "%", query.status, query.status === Dish.STATUS.ALL, (query.current - 1) * query.pageSize, query.current * query.pageSize]);
  }
  /** 获取菜品列表 不分页 */
  async getDishAll(query) {
    return await this.execSql(DishSql.getDishAll, ["%" + query.name + "%", query.status, query.status === Dish.STATUS.ALL]);
  }
  /** 获取菜品总数 */
  async getDishTotal(query) {
    const result = await this.execSql(DishSql.getDishTotal, ["%" + query.name + "%", query.status, query.status === Dish.STATUS.ALL]);
    return result[0].total;
  }
  /** 新增菜品 */
  async insterDish(dish) {
    let queue = [{
      sql: DishSql.insertDish,
      options: [dish.name, dish.price, dish.img],
      callback: result => {
        dish.materials.forEach((item, i) => {
          queue[i + 1].options[0] = result.insertId;
        });
      }
    }];
    dish.materials.forEach(item => {
      queue.push({
        sql: DishSql.insertDishMaterial,
        options: [0, item]
      });
    });
    return await this.execSqlTransaction(queue);
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
    let queue = [{
      sql: DishSql.updateDish,
      options: [dish.name, dish.price, dish.img, dish.id]
    }, {
      sql: DishSql.deleteDishMaterials,
      options: [dish.id]
    }];
    dish.materials.forEach(item => {
      queue.push({
        sql: DishSql.insertDishMaterial,
        options: [dish.id, item]
      });
    });
    return await this.execSqlTransaction(queue);
  }
  /** 根据名称id获取菜品 */
  async getDishByNameAndId(name, id) {
    const result = await this.execSql(DishSql.getDishByNameAndId, [name, id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id获取菜品素材*/
  async getDishMaterials(id) {
    return await this.execSql(DishSql.getDishMaterials, [id]);
  }
  /** 根据id获取菜品素材详情*/
  async getDishMaterialDetail(id) {
    return await this.execSql(DishSql.getDishMaterialDetail, [id]);
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
}