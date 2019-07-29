export default {
  addAddress: {
    body: {
      username: [String, "联系人姓名", true],
      userId: [Number, "用户id", false, ""],
      phone: [String, "联系电话", true],
      position: [String, "地址", true],
      address: [String, "门牌号", false, ""],
      latitude: [String, "纬度", true],
      longitude: [String, "经度", true]
    }
  },
  getUserAddresss: {
    query: {
      userId: [Number, "用户id", false, ""],
    }
  }
};