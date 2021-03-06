import BaseModel from "./BaseModel";

/** 菜品 */
export default class Dish extends BaseModel {
  constructor({ id = 0, merchantId = 0, name = "", price = 0, img = "", type = "", introduce = "", status = 1, monthSale = 0, addtime = "", modifytime = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.merchantId = merchantId;
    this.type = type;
    this.introduce = introduce;
    this.status = status;
    this.monthSale = monthSale;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
    this.statusStr = this._statusStr;
  }
  get _statusStr() {
    switch(this.status) {
      case Dish.STATUS.ENABLED:
        return "上架";
      case Dish.STATUS.DISABLED:
        return "下架";
      default:
        return "未知状态";
    }
  }
}
/** 状态 */
Dish.STATUS = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 上架 */
  ENABLED: 1,
  /** 下架 */
  DISABLED: 0
};