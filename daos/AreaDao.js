import BaseDao from "./BaseDao";
import AreaSql from "../daoSqls/AreaSql";

export default class AreaDao extends BaseDao {
  /** 根据地区父节点id获取地区 */
  async getAreas(parentId) {
    return await this.execSql(AreaSql.getAreasByParentId, [parentId]);
  }
  /** 获取地区信息 */
  async getArea(id) {
    const result = await this.execSql(AreaSql.getArea, [id]);
    return result && result.length > 0 && result[0] || null;
  }
  /** 根据id列表获取地区名称列表 */
  async getAreasByIds(ids) {
    return await this.execSql(AreaSql.getAreasByIds, [ids]);
  }
}