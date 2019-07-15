export default {
  /** 新增菜品 */
  insertDish: "insert into e_dish(merchant_id, name, price, img, type, introduce, addtime, modifytime) values(?, ?, ?, ?, ?, ?, now(), now())",
  /** 根据名称获取菜品 */
  getDishByName: "select id, merchant_id merchantId, name, price, img, type, introduce, status, addtime, modifytime from e_dish where deleted = 0 and name = ?",
  /** 根据名称id获取菜品 */
  getDishByNameAndId: "select id, merchant_id merchantId, name, price, img, type, introduce, status, addtime, modifytime from e_dish where deleted = 0 and name = ? and id != ?",
  /** 获取菜品列表 */
  getDishs: "select id, name, price, img, type, introduce, status, ifnull(month_sale, 0) monthSale, addtime, modifytime from e_dish left join (select dish_id, count(dish_id) month_sale from e_order_dish where merchant_id = ? group by dish_id) month_sale on e_dish.id = month_sale.dish_id where deleted = 0 and merchant_id = ? and name like ? and (status = ? or true = ?) limit ?, ?",
  /** 获取菜品列表 不分页*/
  getDishAll: "select id, merchant_id merchantId, name, price, img, type, introduce, status, ifnull(month_sale, 0) monthSale, addtime, modifytime from e_dish left join (select dish_id, count(dish_id) month_sale from e_order_dish where merchant_id = ? group by dish_id) month_sale on e_dish.id = month_sale.dish_id where deleted = 0 and merchant_id = ? and name like ? and (status = ? or true = ?)",
  /** 获取菜品总数 */
  getDishTotal: "select count(*) total from e_dish where deleted = 0 and merchant_id = ? and name like ? and (status = ? or 1 = ?)",
  /** 获取菜品 */
  getDish: "select id, merchant_id merchantId, name, price, img, type, introduce, status, addtime, modifytime from e_dish where deleted = 0 and id = ?",
  /** 删除菜品 */
  deleteDish: "update e_dish set deleted = 1 where id = ?",
  /** 修改菜品 */
  updateDish: "update e_dish set name = ?, price = ?, img = ? where id = ?",
  /** 修改菜品状态 */
  updateDishStatus: "update e_dish set status = ? where id = ?",
  /** 根据id列表获取菜品列表 */
  getDishByIds: "select id, name, price, img, status, addtime, modifytime from e_dish where deleted = 0 and id in (?)",
  /** 获取商户所有类别 */
  getDishTypesByMerchant: "select type from e_dish where merchant_id = ? group by type"
};