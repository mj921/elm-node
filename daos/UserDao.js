import BaseDao from "./BaseDao";
import UserSql from "../daoSqls/UserSql";

export default class UserDao extends BaseDao {
  /** 添加用户 */
  async insertUser(userModel) {
    const result = await this.execSql(UserSql.insertUser, [userModel.phone, userModel.username, userModel.password, userModel.img]);
    return result && result.affectedRows === 1;
  }
  /** 根据手机号查询用户 */
  async getUserByPhone(phone) {
    const result = await this.execSql(UserSql.getUserByPhone, [phone]);
    return result && result.length > 0 && result[0];
  }
  /** 获取用户 */
  async getUser(id) {
    const result = await this.execSql(UserSql.getUser, [id]);
    return result && result.length > 0 && result[0];
  }
}