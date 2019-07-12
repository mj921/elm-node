import BaseDao from "./BaseDao";
import MerchantSql from "../daoSqls/MerchantSql";
import Merchant from "../models/Merchant";

export default class MerchantDao extends BaseDao {
  constructor() {
    super();
  }
  /** 根据手机号 密码查询商户 用于校验商户登录 */
  async getMerchantByPhoneAndPwd(phone, password) {
    const result = await this.execSql(MerchantSql.getMerchantByPhoneAndPwd, [phone, password]);
    return result && result[0] || null;
  }
  /** 获取商户列表 */
  async getMerchants(query) {
    return await this.execSql(MerchantSql.getMerchants, ["%" + query.name + "%", query.status === Merchant.STATUS.ALL, query.status, (query.current - 1) * query.pageSize, query.current * query.pageSize]);
  }
  /** 获取商户总数 */
  async getMerchantTotal(query) {
    const result = await this.execSql(MerchantSql.getMerchantTotal, ["%" + query.name + "%", query.status === Merchant.STATUS.ALL, query.status]);
    return result && result.length > 0 && result[0].total || 0;
  }
  /** 添加商户 */
  async insertMerchant(merchantModel) {
    const result = await this.execSql(MerchantSql.insertMerchant, [merchantModel.name, merchantModel.phone, merchantModel.password, merchantModel.address, merchantModel.provinceId, merchantModel.cityId, merchantModel.areaId, merchantModel.areaName, merchantModel.logo, merchantModel.distributionFee, merchantModel.startDistributionFee, merchantModel.distributionTime, merchantModel.distance]);
    return result.affectedRows === 1;
  }
  /** 修改商户 */
  async updateMerchant(merchantModel) {
    const result = await this.execSql(MerchantSql.updateMerchant, [merchantModel.name, merchantModel.phone, merchantModel.password, merchantModel.address, merchantModel.provinceId, merchantModel.cityId, merchantModel.areaId, merchantModel.areaName, merchantModel.logo, merchantModel.distributionFee, merchantModel.startDistributionFee, merchantModel.distributionTime, merchantModel.distance, merchantModel.id]);
    return result.affectedRows === 1;
  }
  /** 根据名称查找商户 */
  async getMerchantByName(name) {
    const result = await this.execSql(MerchantSql.getMerchantByName, [name]);
    return result && result.length > 0 && result[0] || null;
  }
  /** 根据名称id查找商户 */
  async getMerchantByNameAndId(name, id) {
    const result = await this.execSql(MerchantSql.getMerchantByNameAndId, [name, id]);
    return result && result.length > 0 && result[0] || null;
  }
  /** 删除商户 */
  async deleteMerchant(id) {
    const result = await this.execSql(MerchantSql.deleteMerchant, [id]);
    return result.affectedRows === 1;
  }
  /** 获取商户 */
  async getMerchant(id) {
    const result = await this.execSql(MerchantSql.getMerchant, [id]);
    return result && result.length > 0 && result[0] || null;
  }
  /** 修改商户状态备注 */
  async updateMerchantStatus(merchantModel) {
    const result = await this.execSql(MerchantSql.updateMerchantStatus, [merchantModel.status, merchantModel.auditRemark, merchantModel.id]);
    return result.affectedRows === 1;
  }
}