import BaseController from "./BaseController";
import qiniu from "qiniu";
import config from "../config";
import CommentService from "../services/CommonService";
import Token from "../lib/Token";

export default class CommonController extends BaseController {
  constructor() {
    super();
    this.commonService = new CommentService();
  }
  getUploadInfo(req, res, next) {
    try {
      const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
      const options = {
        scope: "mj921",
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const uploadToken = putPolicy.uploadToken(mac);
      res.json(this.successJson(uploadToken));
    } catch(err) {
      next(err);
    }
  }
  manageLogin(req, res, next) {
    this.commonService.manageLogin(req.body.username, req.body.password)
    .then(result => {
      const tokenData = {
        username: req.body.username,
        type: "manage"
      };
      if (result !== true) {
        tokenData.merchant = result;
      }
      res.json(this.successJson({ ...result, token: Token.encrypt(tokenData, 60 * 30) }, "登录成功"));
    }).catch(err => {
      next(err);
    });
  }
  manageLogout(req, res) {
    req.session.username = undefined;
    req.session.merchant = undefined;
    res.json(this.successJson(true, "退出成功"));
  }
}