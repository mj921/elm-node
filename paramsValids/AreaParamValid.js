export default {
  getAreas: {
    query: {
      parentId: [Number, "父节点id", true]
    }
  },
  getArea: {
    params: {
      id: [Number, "地区id", true]
    }
  }
};