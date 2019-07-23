import UserService from "../services/UserService";
import BaseController from "./BaseController";
import Token from "../lib/Token";
import ServiceError from "../lib/ServiceError";

export default class UserController extends BaseController {
  constructor() {
    super();
    this.userService = new UserService();
  }
  /** 注册 */
  register(req, res, next) {
    this.userService.register(req.body)
    .then(result => {
      res.json(this.successJson({ ...result, token: Token.encrypt({ data: result, type: "front" }, 86400 * 36500) }, "注册成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 登录 */
  login(req, res, next) {
    this.userService.login(req.body)
    .then(result => {
      res.json(this.successJson({ ...result, token: Token.encrypt({ data: result, type: "front" }, 86400 * 36500) }, "登录成功"));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取当前登录用户信息 */
  getLoginUserInfo(req, res, next) {
    const result = Token.decrypt(req.headers.authorization);
    if (result.data.type === "front") {
      this.userService.getLoginUserInfo(result.data.data.id).then(result => {
        res.json(this.successJson(result));
      }).catch(err => {
        next(err);
      });
    } else {
      next(new ServiceError("用户类型不正确"));
    }
  }
}