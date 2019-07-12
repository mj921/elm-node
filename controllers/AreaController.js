import AreaService from "../services/AreaService";
import BaseController from "./BaseController";

export default class AreaController extends BaseController {
  constructor() {
    super();
    this.areaService = new AreaService();
  }
  /** 获取地区列表 */
  getAreas(req, res, next) {
    this.areaService.getAreas(req.query.parentId)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取地区 */
  getArea(req, res, next) {
    this.areaService.getArea(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
}