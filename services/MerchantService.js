import MerchantDao from "../daos/MerchantDao";
import Page from "../lib/Page";
import ServiceError from "../lib/ServiceError";
import Merchant from "../models/Merchant";
import BaseService from "./BaseService";
import AreaDao from "../daos/AreaDao";
import DishDao from "../daos/DishDao";

export default class MerchantService extends BaseService {
  constructor() {
    super();
    this.merchantDao = new MerchantDao();
    this.areaDao = new AreaDao();
    this.dishDao = new DishDao();
  }
  /** 获取商户列表 */
  async getMerchants(query) {
    const list = await this.merchantDao.getMerchants(query);
    const page = new Page({
      current: query.current,
      pageSize: query.pageSize
    });
    const total = await this.merchantDao.getMerchantTotal(query);
    page.setTotal(total);
    return {
      list: list.map(item => new Merchant(item)),
      page
    };
  }
  /** 获取商户列表 不分页 */
  async getMerchantAll(query) {
    return await this.merchantDao.getMerchantAll(query);
  }
  /** 获取商户 */
  async getMerchant(id) {
    const merchant = await this.merchantDao.getMerchant(id);
    if (!merchant) {
      throw new ServiceError("该商户不存在");
    }
    return new Merchant(merchant);
  }
  /**
   * 商户校验
   * @param {string} type add 新增, modify 修改
   */
  async validMerchant(merchantModel, type = "add") {
    if (merchantModel.name.length > 30) {
      throw new ServiceError("商户名称长度不能大于30");
    }
    let merchant;
    if (type === "add") {
      merchant = await this.merchantDao.getMerchantByName(merchantModel.name);
    } else {
      merchant = await this.merchantDao.getMerchantByNameAndId(merchantModel.name, merchantModel.id);
    }
    if (merchant) {
      throw new ServiceError("商户名称已存在");
    }
    if (merchantModel.address.length > 50) {
      throw new ServiceError("地址长度不能大于50");
    }
    if (!this.validPhone(merchantModel.phone)) {
      throw new ServiceError("手机号格式不正确");
    }
    if (!this.validPassword(merchantModel.password)) {
      throw new ServiceError("密码格式不正确");
    }
    if (!merchantModel.provinceId || merchantModel.provinceId < 1) {
      throw new ServiceError("省不能为空");
    }
    if (!merchantModel.cityId || merchantModel.cityId < 1) {
      throw new ServiceError("市不能为空");
    }
    if (!merchantModel.areaId || merchantModel.areaId < 1) {
      throw new ServiceError("区不能为空");
    }
    return true;
  }
  /** 新增商户 */
  async addMerchant(merchantModel) {
    await this.validMerchant(merchantModel);
    const areaIds = [merchantModel.provinceId, merchantModel.cityId, merchantModel.areaId].filter(item => item && item > 0);
    const areas = await this.areaDao.getAreasByIds(areaIds);
    if (areaIds.length !== areas.length) {
      throw new ServiceError("所选地区不存在");
    }
    merchantModel.areaName = areas.map(item => item.name).join(" ");
    const result = await this.merchantDao.insertMerchant(merchantModel);
    return result;
  }
  /** 修改商户 */
  async updateMerchant(merchantModel) {
    const merchant = await this.merchantDao.getMerchant(merchantModel.id);
    if (!merchant) {
      throw new ServiceError("该商户不存在");
    }
    await this.validMerchant(merchantModel, "modify");
    const areaIds = [merchantModel.provinceId, merchantModel.cityId, merchantModel.areaId].filter(item => item && item > 0);
    const areas = await this.areaDao.getAreasByIds(areaIds);
    if (areaIds.length !== areas.length) {
      throw new ServiceError("所选地区不存在");
    }
    merchantModel.areaName = areas.map(item => item.name).join(" ");
    const result = await this.merchantDao.updateMerchant(merchantModel);
    return result;
  }
  /** 删除商户 */
  async deleteMerchant(id) {
    const merchant = await this.merchantDao.getMerchant(id);
    if (!merchant) {
      throw new ServiceError("该商户不存在");
    }
    const result = await this.merchantDao.deleteMerchant(id);
    return result;
  }
  /** 审核商户 */
  async auditMerchant(id, status, auditRemark) {
    return await this.merchantDao.updateMerchantStatus({ id, status, auditRemark });
  }
  /** 修改商户状态*/
  async updateMerchantStatus(id, status) {
    return await this.merchantDao.updateMerchantStatus({ id, status, auditRemark: "" });
  }
  /** 获取商户所有菜品类别 */
  async getMerchantTypes(id) {
    return await this.dishDao.getDishTypesByMerchant(id);
  }
}