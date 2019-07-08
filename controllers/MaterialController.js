import MaterialService from "../services/MaterialService";
import BaseController from "./BaseController";

export default class MaterialController extends BaseController {
  constructor() {
    super();
    this.materialService = new MaterialService();
  }
  /** 获取材料列表 */
  getMaterials(req, res, next) {
    this.materialService.getMaterials(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取材料列表 不分页*/
  getMaterialAll(req, res, next) {
    this.materialService.getMaterialAll(req.query.name)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取材料 */
  getMaterial(req, res, next) {
    this.materialService.getMaterial(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 新增材料 */
  addMaterial(req, res, next) {
    this.materialService.addMaterial(req.body)
    .then(result => {
      res.json(this.successJson(result, "新增材料成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改材料 */
  updateMaterial(req, res, next) {
    this.materialService.updateMaterial(req.body)
    .then(result => {
      res.json(this.successJson(result, "修改材料成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 新增材料 */
  deleteMaterial(req, res, next) {
    this.materialService.deleteMaterial(req.params.id)
    .then(result => {
      res.json(this.successJson(result, "删除材料成功"));
    }).catch(err => {
      next(err);
    });
  }
}