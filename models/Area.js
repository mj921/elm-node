import BaseModel from "./BaseModel";

/** 地区 */
export default class Area extends BaseModel {
  constructor({ id = 0, name = "", code = "", level = -1, cityCode = "", center = "", parentId = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.code = code;
    this.level = level;
    this.cityCode = cityCode;
    this.center = center;
    this.parentId = parentId;
  }
}