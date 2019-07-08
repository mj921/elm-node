export default {
  login: {
    body: {
      username: [String, "用户名不能为空", true],
      password: [String, "密码不能为空", true]
    }
  }
};