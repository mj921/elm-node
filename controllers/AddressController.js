import BaseController from "./BaseController";
import AddressService from "../services/AddressService";
import Token from "../lib/Token";

export default class AddressController extends BaseController {
  constructor() {
    super();
    this.addressService = new AddressService();
  }
  /** 新增地址 */
  addAddress(req, res, next) {
    const addressModel = { ...req.body };
    if (!req.body.userId) {
      const result = Token.decrypt(req.headers.authorization);
      if (result.data.type === "front") {
        addressModel.userId = result.data.data.id;
      }
    }
    this.addressService.addAddress(addressModel).then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
  /** 获取用户地址列表 */
  getUserAddresss(req, res, next) {
    let userId = req.query.userId;
    if (!userId) {
      const result = Token.decrypt(req.headers.authorization);
      if (result.data.type === "front") {
        userId = result.data.data.id;
      }
    }
    this.addressService.getAddressByUser(userId).then(result => {
      res.json(this.successJson(result));
    }).catch(err => {
      next(err);
    });
  }
}