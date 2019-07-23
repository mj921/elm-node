export default {
  /** 添加用户 */
  insertUser: "insert into e_user(phone, username, password, img, addtime, modifytime) values(?, ?, ?, ?, now(), now())",
  /** 根据手机号查询用户 */
  getUserByPhone: "select id, username, phone, img, password, status from e_user where phone = ? and deleted = 0",
  /** 根据id查询用户 */
  getUser: "select id, username, phone, img , password, status from e_user where id = ? and deleted = 0"
};