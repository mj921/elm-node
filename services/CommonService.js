import ServiceError from "../lib/ServiceError";
import MerchantDao from "../daos/MerchantDao";
import Merchant from "../models/Merchant";

export default class CommentService {
  constructor() {
    this.merchantDao = new MerchantDao();
  }
  async manageLogin(username, password) {
    if (username === "admin") {
      if (password === "123456") {
        return true;
      } else {
        throw new ServiceError("用户名或者密码错误");
      }
    } else {
      const merchant = await this.merchantDao.getMerchantByPhoneAndPwd(username, password);
      if (merchant) {
        return new Merchant({ ...merchant, password: undefined });
      } else {
        throw new ServiceError("用户名或者密码错误");
      }
    }
  }
}