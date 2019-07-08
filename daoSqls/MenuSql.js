export default {
  /** 新增菜单 */
  insertMenu: "insert into menu(name, addtime, modifytime) values(?, now(), now())",
  /** 新增菜单菜品 */
  insertMenuDish: "insert into menu_dish(menu_id, dish_id, addtime, modifytime) values(?, ?, now(), now())",
  /** 获取菜单列表 */
  getMenus: `SELECT
              menu.id id,
              menu.name name,
              menu.addtime addtime,
              menu.modifytime modifytime,
              menu.status status,
              IFNULL(dish_count.count,0) dishNum 
            FROM
              menu
              LEFT JOIN ( 
                SELECT
                  menu_dish.menu_id,
                  count( * ) count FROM menu_dish
                  left join dish on menu_dish.dish_id = dish.id 
                WHERE
                  menu_dish.deleted = 0 
                  and dish.deleted = 0 
                  and dish.status = 1 
                GROUP BY menu_id  
              ) dish_count ON menu.id = dish_count.menu_id 
            WHERE
              menu.name LIKE ? 
              AND ( menu.status = ? OR true = ? ) 
              AND menu.deleted = 0
              LIMIT ?, ?`,
  /** 获取菜单总数 */
  getMenuTotal: "select count(*) total from menu where deleted = 0 and menu.name like ? and ( menu.status = ? or true = ? )",
  /** 获取菜单列表 不分页 */
  getMenuAll: `SELECT
              menu.id id,
              menu.name name,
              menu.addtime addtime,
              menu.modifytime modifytime,
              menu.status status,
              IFNULL(dish_count.count,0) dishNum 
            FROM
              menu
              LEFT JOIN ( 
                SELECT
                  menu_dish.menu_id,
                  count( * ) count FROM menu_dish
                  left join dish on menu_dish.dish_id = dish.id 
                WHERE
                  menu_dish.deleted = 0 
                  and dish.deleted = 0 
                  and dish.status = 1 
                GROUP BY menu_id  
              ) dish_count ON menu.id = dish_count.menu_id 
            WHERE
              ( menu.status = ? OR true = ? ) 
              AND menu.deleted = 0`,
  /** 获取菜单 */
  getMenu: "select id, name, status, addtime, modifytime from menu where deleted = 0 and id = ?",
  /** 根据名称获取菜单 */
  getMenuByName: "select id, name, status, addtime, modifytime from menu where deleted = 0 and name = ?",
  /** 根据名称id获取菜单 */
  getMenuByNameAndId: "select id, name, status, addtime, modifytime from menu where deleted = 0 and name = ? and id != ?",
  /** 获取菜单菜品详情 */
  getMenuDishDetail: `select
                        menu_dish.id id,
                        dish.id dishId,
                        menu_dish.menu_id menuId,
                        dish.name dishName,
                        dish.price dishPrice,
                        dish.img dishImg,
                      case
                        when dish.deleted = 1 then
                        0 else dish.status 
                      end status 
                      from
                        menu_dish
                        left join dish on menu_dish.dish_id = dish.id 
                      where
                        menu_dish.deleted = 0 
                      and menu_dish.menu_id = ?`,
  /** 更新菜单 */
  updateMenu: "update menu set name = ? where id = ?",
  /** 删除菜单菜品 */
  deleteMenuDishs: "update menu_dish set deleted = 1 where menu_id = ?",
  /** 删除菜单 */
  deleteMenu: "update menu set deleted = 1 where id = ?",
  /** 修改菜单状态 */
  updateMenuStatus: "update menu set status = ? where id = ?"
};