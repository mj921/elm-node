import BaseModel from "./BaseModel";

/** 素材 */
export default class Material extends BaseModel {
  constructor({ id = 0, name = "", price = 0, unit = "", addtime = "", modifytime = "" } = {}) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.unit = unit;
    this.addtime = addtime;
    this.modifytime = modifytime;
    this.addtimeStr = this.dateFmt(addtime, "YYYY-MM-DD HH:mm:ss");
    this.modifytimeStr = this.dateFmt(modifytime, "YYYY-MM-DD HH:mm:ss");
  }
}