import AddressDao from "../daos/AddressDao";
import ServiceError from "../lib/ServiceError";
import BaseService from "./BaseService";

export default class AddressService extends BaseService {
  constructor() {
    super();
    this.addressDao = new AddressDao();
  }
  /** 新增地址 */
  async addAddress(addressModel) {
    this.validAddress(addressModel);
    return await this.addressDao.insertAddress(addressModel);
  }
  /** 获取用户地址列表 */
  async getAddressByUser(userId) {
    if (!userId) {
      throw new ServiceError("用户id不能为空");
    }
    return await this.addressDao.getAddressByUser(userId);
  }
  validAddress(addressModel) {
    if (!addressModel.userId) {
      throw new ServiceError("用户id不能为空");
    }
    if (addressModel.username.length > 10) {
      throw new ServiceError("联系人姓名长度不能大于10");
    }
    if (!this.validPhone(addressModel.phone)) {
      throw new ServiceError("联系电话格式不正确");
    }
  }
}