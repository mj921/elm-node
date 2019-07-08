export default {
  /** 根据手机号 密码查询商户 用于校验商户登录 */
  getMerchantByPhoneAndPwd: "select * from e_merchant where phone = ? and password = ?"
}