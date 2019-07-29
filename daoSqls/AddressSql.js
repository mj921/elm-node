export default {
  /** 新增地址 */
  insertAddress: "insert into e_address (username, user_id, phone, position, latitude, longitude, address, addtime, modifytime) values(?, ?, ?, ?, ?, ?, ?, now(), now())",
  /** 获取用户地址列表 */
  getAddressByUser: "select id, username, user_id, phone, position, latitude, longitude, address, addtime, modifytime from e_address where user_id = ?"
};