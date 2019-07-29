import BaseDao from "./BaseDao";
import AddressSql from "../daoSqls/AddressSql";

export default class AddressDao extends BaseDao {
  /** 新增地址 */
  async insertAddress(addressModel) {
    const result = await this.execSql(AddressSql.insertAddress, [addressModel.username, addressModel.userId, addressModel.phone, addressModel.position, addressModel.latitude, addressModel.longitude, addressModel.address, addressModel.defaultFlag]);
    return result && result.affectedRows === 1;
  }
  /** 获取用户地址列表 */
  async getAddressByUser(userId) {
    return await this.execSql(AddressSql.getAddressByUser, [userId]);
  }
}