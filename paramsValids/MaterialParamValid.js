export default {
  getMaterials: {
    query: {
      name: [String, "材料名称", false, ""],
      current: [Number, "当前页", false, 1],
      pageSize: [Number, "每页条数", false, 10]
    }
  },
  getMaterialAll: {
    query: {
      name: [String, "材料名称", false, ""]
    }
  },
  getMaterial: {
    params: {
      id: [Number, "材料id", true]
    }
  },
  addMaterial: {
    body: {
      name: [String, "材料名称", true],
      price: [Number, "材料价格", true],
      unit: [String, "材料单位", true]
    }
  },
  updateMaterial: {
    body: {
      id: [Number, "材料id", true],
      name: [String, "材料名称", true],
      price: [Number, "材料价格", true],
      unit: [String, "材料单位", true]
    }
  },
  deleteMaterial: {
    params: {
      id: [Number, "材料id", true]
    }
  }
};