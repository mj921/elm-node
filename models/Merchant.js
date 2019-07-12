import BaseModel from "./BaseModel";
/** 商户 */
export default class Merchant extends BaseModel {
  constructor({ id = 0, name = "", phone = "", password = "", address = "", provinceId = 0, cityId = 0, areaId = 0, areaName = "", logo = "", distributionFee = 0, startDistributionFee = 0, distributionTime = 0, distance = 0, status = 1, auditRemark = "", addtime = "", modifytime = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.phone = phone;
    if (password) {
      this.password = password;
    }
    this.address = address;
    this.provinceId = provinceId;
    this.cityId = cityId;
    this.areaId = areaId;
    this.areaName = areaName;
    this.logo = logo;
    this.distributionFee = distributionFee;
    this.startDistributionFee = startDistributionFee;
    this.distributionTime = distributionTime;
    this.distance = distance;
    this.auditRemark = auditRemark;
    this.status = status;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
    this.statusStr = this._statusStr;
  }
  get _statusStr() {
    switch(this.status) {
      case Merchant.STATUS.WAIT_AUDIT:
        return "待审核";
      case Merchant.STATUS.WAIT_OPEN:
        return "待开业";
      case Merchant.STATUS.OPEN:
        return "开业";
      case Merchant.STATUS.REST:
        return "休息";
      case Merchant.STATUS.DISABLED:
        return "封禁";
      case Merchant.STATUS.AUDIT_FAILED:
        return "审核不通过";
      default:
        return "未知状态";
    }
  }
}
/** 状态 0 待审核 1 待开业 2 开业 3 休息 4 封禁 -1 审核不通过' */
Merchant.STATUS = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 待审核 */
  WAIT_AUDIT: 0,
  /** 待开业 */
  WAIT_OPEN: 1,
  /** 开业 */
  OPEN: 2,
  /** 休息 */
  REST: 3,
  /** 封禁 */
  DISABLED: 4,
  /** 审核不通过 */
  AUDIT_FAILED: -1
};