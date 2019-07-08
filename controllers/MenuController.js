import MenuService from "../services/MenuService";
import BaseController from "./BaseController";

export default class MenuController extends BaseController {
  constructor() {
    super();
    this.menuService = new MenuService();
  }
  /** 获取菜单列表 */
  getMenus(req, res, next) {
    this.menuService.getMenus(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取菜单列表 不分页 */
  getMenuAll(req, res, next) {
    this.menuService.getMenuAll(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取菜单 */
  getMenu(req, res, next) {
    this.menuService.getMenu(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 新增菜单 */
  addMenu(req, res, next) {
    this.menuService.addMenu(req.body)
    .then(result => {
      res.json(this.successJson(result, "新增菜单成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改菜单 */
  updateMenu(req, res, next) {
    this.menuService.updateMenu(req.body)
    .then(result => {
      res.json(this.successJson(result, "修改菜单成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 删除菜单 */
  deleteMenu(req, res, next) {
    this.menuService.deleteMenu(req.params.id)
    .then(result => {
      res.json(this.successJson(result, "删除菜单成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取菜单菜品 */
  getMenuDishs(req, res, next) {
    this.menuService.getMenuDishs(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改菜单状态 */
  updateMenuStatus(req, res, next) {
    this.menuService.updateMenuStatus(req.body.id, req.body.status)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
}