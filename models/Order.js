import BaseModel from "./BaseModel";

/** 订单 */
export default class Order extends BaseModel {
  constructor({ id = "", address = "", tableNumber = 0, username = "", phone = "", dishs = [], dishNum = 0, status = 0, type = 0, date = "", addtime = "", modifytime = "" }) {
    super();
    this.id = id;
    this.address = address;
    this.tableNumber = tableNumber;
    this.username = username;
    this.phone = phone;
    this.status = status;
    this.type = type;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.date = date;
    if (dishNum === 0 || dishs.length === dishNum) {
      this.dishs = dishs;
    }
    this.dishNum = dishs.length > 0 ? dishs.length : dishNum;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
    this.dateStr = this.dateFmt(date, "YYYY-MM-DD");
    this.statusStr = this._statusStr;
    this.typeStr = this._typeStr;
  }
  get _statusStr() {
    switch(this.status) {
      case Order.STATUS.TO_BE_PROCESSED:
        return "待处理";
      case Order.STATUS.PROCESSED:
        return "已处理";
      case Order.STATUS.CANCELED:
        return "已取消";
      default:
        return "未知状态";
    }
  }
  get _typeStr() {
    switch(this.type) {
      case Order.TYPE.LUNCH:
        return "午餐";
      case Order.TYPE.DINNER:
        return "晚餐";
      default:
        return "未知类型";
    }
  }
}
/** 状态 */
Order.STATUS = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 待处理 */
  TO_BE_PROCESSED: 0,
  /** 已处理 */
  PROCESSED: 1,
  /** 已取消 */
  CANCELED: -1
};
/** 类型 */
Order.TYPE = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 午餐 */
  LUNCH: 0,
  /** 晚餐 */
  DINNER: 1
};