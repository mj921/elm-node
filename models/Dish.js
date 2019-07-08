import BaseModel from "./BaseModel";

/** 菜品 */
export default class Dish extends BaseModel {
  constructor({ id = 0, name = "", price = 0, img = "", materials = [], status = 1, addtime = "", modifytime = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.materials = materials;
    this.status = status;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
    this.statusStr = this._statusStr;
  }
  get _statusStr() {
    switch(this.status) {
      case Dish.STATUS.ENABLED:
        return "启用";
      case Dish.STATUS.DISABLED:
        return "禁用";
      default:
        return "未知状态";
    }
  }
}
/** 状态 */
Dish.STATUS = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 启用 */
  ENABLED: 1,
  /** 禁用 */
  DISABLED: 0
};