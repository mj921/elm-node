import AreaDao from "../daos/AreaDao";
import Area from "../models/Area";

export default class AreaService {
  constructor() {
    this.areaDao = new AreaDao();
  }
  /** 根据地区父节点id获取地区 */
  async getAreas(parentId) {
    return await this.areaDao.getAreas(parentId);
  }
  /** 获取地区信息 */
  async getArea(id) {
    const area = await this.areaDao.getArea(id);
    return new Area(area);
  }
}