import BaseModel from "./BaseModel";

/** 菜单 */
export default class Menu extends BaseModel {
  constructor({ id = 0, name = "", dishs = [], dishNum = 0, addtime = "", status = 1, modifytime = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.dishs = dishs;
    this.dishNum = dishs.length ? dishs.length : dishNum;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
    this.status = status;
    this.statusStr = this._statusStr;
  }
  get _statusStr() {
    switch(this.status) {
      case Menu.STATUS.ENABLED:
        return "启用";
      case Menu.STATUS.DISABLED:
        return "禁用";
      default:
        return "未知状态";
    }
  }
}
/** 状态 */
Menu.STATUS = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 启用 */
  ENABLED: 1,
  /** 禁用 */
  DISABLED: 0
};