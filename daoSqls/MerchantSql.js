export default {
  /** 根据手机号 密码查询商户 用于校验商户登录 */
  getMerchantByPhoneAndPwd: "select * from e_merchant where phone = ? and password = ?",
  /** 获取商户列表 */
  getMerchants: "select id, name, phone, address, area_name areaName, logo, distribution_fee distributionFee, start_distribution_fee startDistributionFee, distribution_time distributionTime, distance, status, addtime, modifytime from e_merchant where name like ? and (true = ? or phone = ?) and (true = ? or status = ?) and deleted = 0 limit ?, ?",
  /** 获取商户总数 */
  getMerchantTotal: "select count(*) total from e_merchant where name like ? and (true = ? or phone = ?) and (true = ? or status = ?) and deleted = 0",
  /** 添加商户 */
  insertMerchant: "insert into e_merchant (name, phone, password, address, province_id, city_id, area_id, area_name, logo, distribution_fee, start_distribution_fee, distribution_time, distance, addtime, modifytime) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now())",
  /** 根据名称查找商户 */
  getMerchantByName: "select id, name, phone, address, password, logo, distribution_fee distributionFee, start_distribution_fee startDistributionFee, distribution_time distributionTime, distance, status, addtime, modifytime from e_merchant where name = ? and deleted = 0",
  /** 删除商户 */
  deleteMerchant: "update e_merchant set deleted = 1 where id = ?",
  /** 获取商户 */
  getMerchant: "select id, name, phone, address, province_id provinceId, city_id cityId, area_id areaId, area_name areaName, password, logo, distribution_fee distributionFee, start_distribution_fee startDistributionFee, distribution_time distributionTime, distance, audit_remark auditRemark, status, addtime, modifytime from e_merchant where id = ? and deleted = 0",
  /** 修改商户 */
  updateMerchant: "update e_merchant set name = ?, phone = ?, password = ?, address = ?, province_id = ?, city_id = ?, area_id = ?, area_name = ?, logo = ?, distribution_fee = ?, start_distribution_fee = ?, distribution_time = ?, distance = ? where id = ?",
  /** 根据名称id查找商户 */
  getMerchantByNameAndId: "select id, name, phone, address, password, logo, distribution_fee distributionFee, start_distribution_fee startDistributionFee, distribution_time distributionTime, distance, status, addtime, modifytime from e_merchant where name = ? and id != ? and deleted = 0",
  /** 修改商户状态备注 */
  updateMerchantStatus: "update e_merchant set status = ?, audit_remark = ? where id = ?"
};