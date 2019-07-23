import UserDao from "../daos/UserDao";
import ServiceError from "../lib/ServiceError";
import BaseService from "./BaseService";
import { ChineseWord } from "../lib/enums";
import User from "../models/User";

export default class UserService extends BaseService {
  constructor() {
    super();
    this.userDao = new UserDao();
  }

  //h5

  /** 注册 */
  async register (userModel) {
    if (!this.validPhone(userModel.phone)) {
      throw new ServiceError("手机号码格式不正确");
    }
    const user = await this.userDao.getUserByPhone(userModel.phone);
    if (user) {
      throw new ServiceError("手机号码已存在");
    }
    if (!this.validPassword(userModel.password)) {
      throw new ServiceError("密码格式不正确");
    }
    userModel.username = this.getRandomUsername();
    userModel.img = User.DEFAULT_IMG;
    const result = await this.userDao.insertUser(userModel);
    if (result) {
      const u = await this.userDao.getUserByPhone(userModel.phone);
      delete u.password;
      return u;
    } else {
      throw new ServiceError("注册失败");
    }
  }
  /** 登录 */
  async login (userModel) {
    if (!this.validPhone(userModel.phone)) {
      throw new ServiceError("手机号码或密码不正确");
    }
    if (!this.validPassword(userModel.password)) {
      throw new ServiceError("手机号码或密码不正确");
    }
    const user = await this.userDao.getUserByPhone(userModel.phone);
    if (user) {
      if(user.password !== userModel.password) {
        throw new ServiceError("手机号码或密码不正确");
      }
    } else {
      throw new ServiceError("手机号码或密码不正确");
    }
    delete user.password;
    return user;
  }
  /** 生成随机名字 */
  getRandomUsername(len = 5) {
    let username = "";
    for (let i = 0; i < len; i++) {
      username += ChineseWord[~~(Math.random() * ChineseWord.length)];
    }
    return username;
  }
  /** 获取当前登录用户信息 */
  async getLoginUserInfo(id) {
    const user = await this.userDao.getUser(id);
    delete user.password;
    return new User(user);
  }
}