import MenuDao from "../daos/MenuDao";
import Page from "../lib/Page";
import ServiceError from "../lib/ServiceError";
import Menu from "../models/Menu";
import DishDao from "../daos/DishDao";

export default class MenuService {
  constructor() {
    this.menuDao = new MenuDao();
    this.dishDao = new DishDao();
  }
  /** 获取菜单列表 */
  async getMenus(query) {
    const list = await this.menuDao.getMenus(query);
    const page = new Page({
      current: query.current,
      pageSize: query.pageSize
    });
    const total = await this.menuDao.getMenuTotal(query);
    page.setTotal(total);
    return {
      list: list.map(item => new Menu(item)),
      page
    };
  }
  /** 获取菜单列表 不分页 */
  async getMenuAll(query) {
    const list = await this.menuDao.getMenuAll(query);
    return list.map(item => new Menu(item));
  }
  /** 获取菜单 */
  async getMenu(id) {
    const menu = await this.menuDao.getMenu(id);
    if (!menu) {
      throw new ServiceError("该菜单不存在");
    }
    const dishs = await this.menuDao.getMenuDishDetail(id);
    menu.dishs = dishs;
    return new Menu(menu);
  }
  /** 新增菜单 */
  async addMenu(menuModel) {
    if (menuModel.name.length > 20) {
      throw new ServiceError("菜单名称长度不能大于20");
    }
    const menu = await this.menuDao.getMenuByName(menuModel.name);
    if (menu) {
      throw new ServiceError("菜单名称已存在");
    }
    const dishs = await this.dishDao.getDishByIds(menuModel.dishs);
    if (dishs.length !== menuModel.dishs.length) {
      throw new ServiceError("菜品不存在");
    }
    const result = await this.menuDao.insterMenu(menuModel);
    return result;
  }
  /** 修改菜单 */
  async updateMenu(menuModel) {
    const menu = await this.menuDao.getMenu(menuModel.id);
    if (!menu) {
      throw new ServiceError("该菜单不存在");
    }
    if (menuModel.name.length > 20) {
      throw new ServiceError("菜单名称长度不能大于20");
    }
    const menu1 = await this.menuDao.getMenuByNameAndId(menuModel.name, menuModel.id);
    if (menu1) {
      throw new ServiceError("菜单名称已存在");
    }
    let dishs = await this.dishDao.getDishByIds(menuModel.dishs);
    dishs = dishs.filter(item => item.status = 1);
    if (dishs.length === 0) {
      throw new ServiceError("所选菜品都为已禁用或已删除");
    }
    menuModel.dishs = dishs.map(item => item.id);
    const result = await this.menuDao.updateMenu(menuModel);
    return result;
  }
  /** 删除菜单 */
  async deleteMenu(id) {
    const menu = await this.menuDao.getMenu(id);
    if (!menu) {
      throw new ServiceError("该菜单不存在");
    }
    const result = await this.menuDao.deleteMenu(id);
    return result;
  }
  /** 获取菜单菜品 */
  async getMenuDishs(id) {
    return await this.menuDao.getMenuDishDetail(id);
  }
  /** 修改菜单状态*/
  async updateMenuStatus(id, status) {
    return await this.menuDao.updateMenuStatus(id, status);
  }
}