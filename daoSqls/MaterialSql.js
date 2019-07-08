export default {
  /** 获取材料列表sql 分页 */
  getMaterials: "select id, name, price, unit, addtime, modifytime from material where deleted = 0 and name like ? limit ?, ?",
  /** 获取材料总数 */
  getMaterialTotal: "select count(*) total from material where deleted = 0 and name like ?",
  /** 获取材料列表sql 不分页 */
  getMaterialAll: "select id, name, price, unit, addtime, modifytime from material where deleted = 0 and name like ?",
  /** 新增材料 */
  insertMaterial: "insert into material(name, price, unit, addtime, modifytime) values(?, ?, ?, now(), now())",
  /** 根据名称获取材料 */
  getMaterialByName: "select id, name, price, unit, addtime, modifytime from material where deleted = 0 and name = ?",
  /** 根据名称获取材料 且不是某id */
  getMaterialByNameAndId: "select id, name, price, unit, addtime, modifytime from material where deleted = 0 and name = ? and id != ?",
  /** 根据id获取材料 */
  getMaterial: "select id, name, price, unit, addtime, modifytime from material where deleted = 0 and id = ?",
  /** 根据id删除材料 */
  deleteMaterial: "update material set deleted = 1 where id = ?",
  /** 更新材料 */
  updateMaterial: "update material set name = ?, price = ?, unit = ? where id = ?",
  /** 根据id列表获取材料 */
  getMaterialByIds: "select id, name, price, unit, addtime, modifytime from material where deleted = 0 and id in (?)"
};