import BaseModel from "./BaseModel";

/** 地址 */
export default class Address extends BaseModel {
  constructor({ id = 0, username = "", phone, userId = "", province = -1, city = "", area = "", areaName = "", position = "", latitude = "", longitude = "", address = "", defaultFlag = 0, addtime = "", modifytime = "" }) {
    super();
    this.id = id;
    this.username = username;
    this.phone = phone;
    this.userId = userId;
    this.province = province;
    this.city = city;
    this.area = area;
    this.areaName = areaName;
    this.position = position;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
    this.defaultFlag = defaultFlag;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
  }
}
/** 是否是默认地址 */
Address.DEFAULT_FLAG = {
  YES: 1,
  NO: 0
};