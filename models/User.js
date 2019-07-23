import BaseModel from "./BaseModel";
/** 用户 */
export default class User extends BaseModel {
  constructor({ id = 0, username = "", phone = "", img = "", password = "", status = 1, addtime = "", modifytime = "" }) {
    super();
    this.id = id;
    this.username = username;
    this.img = img;
    this.phone = phone;
    if (password) {
      this.password = password;
    }
    this.status = status;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
    this.statusStr = this._statusStr;
  }
  get _statusStr() {
    switch(this.status) {
      case User.STATUS.ENABLED:
        return "正常";
      case User.STATUS.DISABLED:
        return "冻结";
      default:
        return "未知状态";
    }
  }
}
/** 状态 */
User.STATUS = {
  /** 全部 */
  ALL: BaseModel.ALL,
  /** 正常 */
  ENABLED: 1,
  /** 冻结 */
  DISABLED: 0
};
User.DEFAULT_IMG = "http://ptse2w3v5.bkt.clouddn.com/default_header_img.jpg";