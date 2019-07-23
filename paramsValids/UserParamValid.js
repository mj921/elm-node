export default {
  register: {
    body: {
      phone: [String, "手机号码", true],
      password: [String, "密码", true]
    }
  },
  login: {
    body: {
      phone: [String, "手机号码", true],
      password: [String, "密码", true]
    }
  }
};