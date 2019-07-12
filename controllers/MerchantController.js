import MerchantService from "../services/MerchantService";
import BaseController from "./BaseController";

export default class MerchantController extends BaseController {
  constructor() {
    super();
    this.merchantService = new MerchantService();
  }
  /** 获取商户列表 */
  getMerchants(req, res, next) {
    this.merchantService.getMerchants(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取商户列表 不分页 */
  getMerchantAll(req, res, next) {
    this.merchantService.getMerchantAll(req.query)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取商户 */
  getMerchant(req, res, next) {
    console.log(req.session);
    this.merchantService.getMerchant(req.params.id)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 新增商户 */
  addMerchant(req, res, next) {
    this.merchantService.addMerchant(req.body)
    .then(result => {
      res.json(this.successJson(result, "新增商户成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改商户 */
  updateMerchant(req, res, next) {
    this.merchantService.updateMerchant(req.body)
    .then(result => {
      res.json(this.successJson(result, "修改商户成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 删除商户 */
  deleteMerchant(req, res, next) {
    this.merchantService.deleteMerchant(req.params.id)
    .then(result => {
      res.json(this.successJson(result, "删除商户成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 修改商户状态 */
  updateMerchantStatus(req, res, next) {
    this.merchantService.updateMerchantStatus(req.body.id, req.body.status)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 审核商户 */
  auditMerchant(req, res, next) {
    this.merchantService.auditMerchant(req.body.id, req.body.status, req.body.auditRemark)
    .then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
}