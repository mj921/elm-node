import Menu from "../models/Menu";
import config from "../config";

export default {
  getMenus: {
    query: {
      name: [String, "菜单名称", false, ""],
      status: [Number, "菜单状态", false, Menu.STATUS.ALL],
      current: [Number, "当前页", false, config.page.current],
      pageSize: [Number, "每页条数", false, config.page.pageSize]
    }
  },
  getMenuAll: {
    query: {
      status: [Number, "菜单状态", false, Menu.STATUS.ALL]
    }
  },
  addMenu: {
    body: {
      name: [String, "菜单名称", true],
      dishs: [Array, "菜单菜品列表", true]
    }
  },
  updateMenu: {
    body: {
      id: [Number, "菜单id", true],
      name: [String, "菜单名称", true],
      dishs: [Array, "菜单菜品列表", true]
    }
  },
  getMenuDishs: {
    params: {
      id: [Number, "菜单id", true]
    }
  },
  getMenu: {
    params: {
      id: [Number, "菜单id", true]
    }
  },
  deleteMenu: {
    params: {
      id: [Number, "菜单id", true]
    }
  },
  updateMenuStatus: {
    body: {
      id: [Number, "菜单id", true],
      status: [Number, "菜单状态", true]
    }
  }
};