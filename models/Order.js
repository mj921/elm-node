import BaseModel from "./BaseModel";

/** 订单 */
export default class Order extends BaseModel {
  constructor({ id = "", merchantId = "", merchantLogo = "", merchantName = "", userId = "", addressId = "", address = "", price = 0, username = "", phone = "", dishs = [], dishNames = [], dishNum = 0, status = 0, addtime = "", modifytime = "", finishtime = "" }) {
    super();
    this.id = id;
    this.merchantId = merchantId;
    this.merchantName = merchantName;
    this.merchantLogo = merchantLogo;
    this.userId = userId;
    this.addressId = addressId;
    this.address = address;
    this.price = price;
    this.username = username;
    this.phone = phone;
    this.status = status;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.finishtime = finishtime;
    if (dishs.length > 0) {
      this.dishs = dishs;
    } else if (dishNames.length > 0) {
      this.dishs = dishNames.split(",").map(item => ({ name: item }));
    } else {
      this.dishs = [];
    }
    this.dishNum = dishs.length > 0 ? dishs.length : dishNum;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
    this.finishtimeStr = this.dateFmt(finishtime, "YYYY-MM-DD");
    this.statusStr = this._statusStr;
  }
  get _statusStr() {
    switch(this.status) {
      case Order.STATUS.WAIT_RECEIPT:
        return "待接单";
      case Order.STATUS.RECEIPTED:
        return "已接单";
      case Order.STATUS.WAIT_DELIVERY:
        return "待配送";
      case Order.STATUS.DELIVERYING:
        return "配送中";
      case Order.STATUS.FINISH:
        return "已完成";
      case Order.STATUS.CANCELED:
        return "已取消";
      default:
        return "未知状态";
    }
  }
}
/** 状态 */
Order.STATUS = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 待接单 */
  WAIT_RECEIPT: 0,
  /** 已接单 */
  RECEIPTED: 1,
  /** 待配送 */
  WAIT_DELIVERY: 2,
  /** 配送中 */
  DELIVERYING: 3,
  /** 已完成 */
  FINISH: 4,
  /** 已取消 */
  CANCELED: -1
};