export default {
  /** 根据地区父节点id获取地区 */
  getAreasByParentId: "select id, name, level from e_area where parent_id = ?",
  /** 获取地区信息 */
  getArea: "select id, name, code, center, city_code cityCode, parent_id parentId, level from e_area where id = ?",
  /** 根据id列表获取地区名称列表 */
  getAreasByIds: "select id, name, code, center, city_code cityCode, parent_id parentId, level from e_area where id in (?)"
};