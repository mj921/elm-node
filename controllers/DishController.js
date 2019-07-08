import DishService from "../services/DishService";
import BaseController from "./BaseController";

export default class DishController extends BaseController {
  constructor() {
    super();
    this.dishService = new DishService();
  }
  /** 获取菜品列表 */
  getDishs(req, res, next) {
    this.dishService.getDishs(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取菜品列表 不分页 */
  getDishAll(req, res, next) {
    this.dishService.getDishAll(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取菜品 */
  getDish(req, res, next) {
    this.dishService.getDish(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 新增菜品 */
  addDish(req, res, next) {
    this.dishService.addDish(req.body)
    .then(result => {
      res.json(this.successJson(result, "新增菜品成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改菜品 */
  updateDish(req, res, next) {
    this.dishService.updateDish(req.body)
    .then(result => {
      res.json(this.successJson(result, "修改菜品成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 删除菜品 */
  deleteDish(req, res, next) {
    this.dishService.deleteDish(req.params.id)
    .then(result => {
      res.json(this.successJson(result, "删除菜品成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取菜品素材 */
  getDishMaterials(req, res, next) {
    this.dishService.getDishMaterials(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改菜品状态 */
  updateDishStatus(req, res, next) {
    this.dishService.updateDishStatus(req.body.id, req.body.status)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
}