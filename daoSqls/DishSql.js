export default {
  /** 新增菜品 */
  insertDish: "insert into dish(name, price, img, addtime, modifytime) values(?, ?, ?, now(), now())",
  /** 新增菜品材料 */
  insertDishMaterial: "insert into dish_material(dish_id, material_id, addtime, modifytime) values(?, ?, now(), now())",
  /** 根据名称获取菜品 */
  getDishByName: "select id, name, price, img, status, addtime, modifytime from dish where deleted = 0 and name = ?",
  /** 根据名称获取菜品 */
  getDishByNameAndId: "select id, name, price, img, status, addtime, modifytime from dish where deleted = 0 and name = ? and id != ?",
  /** 获取菜品列表 */
  getDishs: "select id, name, price, img, status, addtime, modifytime from dish where deleted = 0 and name like ? and (status = ? or true = ?) limit ?, ?",
  /** 获取菜品列表 不分页*/
  getDishAll: "select id, name, price, img, status, addtime, modifytime from dish where deleted = 0 and name like ? and (status = ? or true = ?)",
  /** 获取菜品总数 */
  getDishTotal: "select count(*) total from dish where deleted = 0 and name like ? and (status = ? or 1 = ?)",
  /** 获取菜品 */
  getDish: "select id, name, price, img, status, addtime, modifytime from dish where deleted = 0 and id = ?",
  /** 删除菜品 */
  deleteDish: "update dish set deleted = 1 where id = ?",
  /** 修改菜品 */
  updateDish: "update dish set name = ?, price = ?, img = ? where id = ?",
  /** 修改菜品状态 */
  updateDishStatus: "update dish set status = ? where id = ?",
  /** 获取菜品材料 */
  getDishMaterials: "select id, dish_id dishId, material_id materialId from dish_material where deleted = 0 and dish_id = ?",
  /** 获取菜品材料详情 */
  getDishMaterialDetail: `SELECT
                            dish_material.id,
                            dish_material.dish_id dishId,
                            material.id materialId,
                            material.NAME materialName 
                          FROM
                            dish_material
                            LEFT JOIN material ON dish_material.material_id = material.id 
                          WHERE
                            dish_material.deleted = 0 
                            AND dish_material.dish_id = ?`,
  /** 删除菜品材料 */
  deleteDishMaterials: "update dish_material set deleted = 1 where dish_id = ? and deleted = 0",
  /** 根据id列表获取菜品列表 */
  getDishByIds: "select id, name, price, img, status, addtime, modifytime from dish where deleted = 0 and id in (?)"
};