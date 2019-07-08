import BaseDao from "./BaseDao";
import MerchantSql from "../daoSqls/MerchantSql";

export default class MerchantDao extends BaseDao {
  constructor() {
    super()
  }
  /** 根据手机号 密码查询商户 用于校验商户登录 */
  async getMerchantByPhoneAndPwd(phone, password) {
    const result = await this.execSql(MerchantSql.getMerchantByPhoneAndPwd, [phone, password]);
    return result && result[0] || null;
  }
}