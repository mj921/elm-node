import BaseDao from "./BaseDao";
import MaterialSql from "../daoSqls/MaterialSql";

export default class MaterialDao extends BaseDao {
  /** 获取材料列表 */
  async getMaterials(query) {
    return await this.execSql(MaterialSql.getMaterials, ["%" + query.name + "%", (query.current - 1) * query.pageSize, query.current * query.pageSize]);
  }
  /** 获取材料总数 */
  async getMaterialTotal(name) {
    const result = await this.execSql(MaterialSql.getMaterialTotal, ["%" + name + "%"]);
    return result[0].total;
  }
  /** 获取材料列表 不分页 */
  async getMaterialAll(name) {
    return await this.execSql(MaterialSql.getMaterialAll, ["%" + name + "%"]);
  }
  /** 新增材料 */
  async insterMaterial(material) {
    const result = await this.execSql(MaterialSql.insertMaterial, [material.name, material.price, material.unit]);
    return result.affectedRows === 1;
  }
  /** 根据名称获取材料 */
  async getMaterialByName(name) {
    const result = await this.execSql(MaterialSql.getMaterialByName, [name]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id获取材料 */
  async getMaterial(id) {
    const result = await this.execSql(MaterialSql.getMaterial, [id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id删除材料 */
  async deleteMaterial(id) {
    const result = await this.execSql(MaterialSql.deleteMaterial, [id]);
    return result.affectedRows === 1;
  }
  /** 更新材料 */
  async updateMaterial(material) {
    const result = await this.execSql(MaterialSql.updateMaterial, [material.name, material.price, material.unit, material.id]);
    return result.affectedRows === 1;
  }
  /** 根据名称获取材料 */
  async getMaterialByNameAndId(name, id) {
    const result = await this.execSql(MaterialSql.getMaterialByNameAndId, [name, id]);
    return result.length > 0 ? result[0] : null;
  }
  /** 根据id列表获取材料 */
  async getMaterialByIds(ids) {
    return await this.execSql(MaterialSql.getMaterialByIds, [ids]);
  }
}