import BaseDao from "./BaseDao";
import MenuSql from "../daoSqls/MenuSql";
import Menu from "../models/Menu";

export default class MenuDao extends BaseDao {
  /** 获取菜单列表 */
  async getMenus(query) {
    return await this.execSql(MenuSql.getMenus, ["%" + query.name + "%", query.status, query.status === Menu.STATUS.ALL, (query.current - 1) * query.pageSize, query.current * query.pageSize]);
  }
  /** 获取菜单总数 */
  async getMenuTotal(query) {
    const result = await this.execSql(MenuSql.getMenuTotal, ["%" + query.name + "%", query.status, query.status === Menu.STATUS.ALL]);
    return result[0].total;
  }
  /** 获取菜单列表 不分页 */
  async getMenuAll(query) {
    return await this.execSql(MenuSql.getMenuAll, [query.status, query.status === Menu.STATUS.ALL]);
  }
  /** 新增菜单 */
  async insterMenu(menu) {
    let queue = [{
      sql: MenuSql.insertMenu,
      options: [menu.name],
      callback: result => {
        menu.dishs.forEach((item, i) => {
          queue[i + 1].options[0] = result.insertId;
        });
      }
    }];
    menu.dishs.forEach(item => {
      queue.push({
        sql: MenuSql.insertMenuDish,
        options: [0, item]
      });
    });
    return await this.execSqlTransaction(queue);
  }
  /** 根据名称获取菜单 */
  async getMenuByName(name) {
    const result = await this.execSql(MenuSql.getMenuByName, [name]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id获取菜单 */
  async getMenu(id) {
    const result = await this.execSql(MenuSql.getMenu, [id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id删除菜单 */
  async deleteMenu(id) {
    let queue = [{
      sql: MenuSql.deleteMenu,
      options: [id]
    }, {
      sql: MenuSql.deleteMenuDishs,
      options: [id]
    }];
    return await this.execSqlTransaction(queue);
  }
  /** 更新菜单 */
  async updateMenu(menu) {
    let queue = [{
      sql: MenuSql.updateMenu,
      options: [menu.name, menu.id]
    }, {
      sql: MenuSql.deleteMenuDishs,
      options: [menu.id]
    }];
    menu.dishs.forEach(item => {
      queue.push({
        sql: MenuSql.insertMenuDish,
        options: [menu.id, item]
      });
    });
    return await this.execSqlTransaction(queue);
  }
  /** 根据名称id获取菜单 */
  async getMenuByNameAndId(name, id) {
    const result = await this.execSql(MenuSql.getMenuByNameAndId, [name, id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id获取菜单菜品*/
  async getMenuDishs(id) {
    return await this.execSql(MenuSql.getMenuDishs, [id]);
  }
  /** 根据id获取菜单菜品详情*/
  async getMenuDishDetail(id) {
    return await this.execSql(MenuSql.getMenuDishDetail, [id]);
  }
  /** 修改菜单状态*/
  async updateMenuStatus(id, status) {
    const result = await this.execSql(MenuSql.updateMenuStatus, [status, id]);
    return result.affectedRows === 1;
  }
}