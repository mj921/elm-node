import Merchant from "../models/Merchant";
import { EnumsPaging } from "../lib/enums";

export default {
  getMerchants: {
    query: {
      name: [String, "商户名称", false, ""],
      phone: [String, "商户手机号", false, ""],
      status: [Number, "商户状态", false, Merchant.STATUS.ALL],
      current: [Number, "当前页", false, EnumsPaging.current],
      pageSize: [Number, "每页条数", false, EnumsPaging.pageSize]
    }
  },
  addMerchant: {
    body: {
      name: [String, "商户名称", true],
      phone: [String, "商户手机号", true],
      password: [String, "登录密码", true],
      provinceId: [Number, "省Id", true],
      cityId: [Number, "市Id", true],
      areaId: [Number, "区Id", false, 0],
      address: [String, "详细地址", false, ""],
      logo: [String, "商户logo", true],
      distributionFee: [Number, "配送费", true],
      startDistributionFee: [Number, "起送价", true],
      distributionTime: [Number, "配送时间", true],
      distance: [Number, "距离", true]
    }
  },
  updateMerchant: {
    body: {
      id: [Number, "商户id", true],
      name: [String, "商户名称", true],
      phone: [String, "商户手机号", true],
      password: [String, "登录密码", true],
      position: [String, "商户定位地址", true],
      longitude: [String, "商户定位经度", true],
      latitude: [String, "商户定位纬度", true],
      address: [String, "商户地址", false, ""],
      logo: [String, "商户logo", true],
      distributionFee: [Number, "配送费", true],
      startDistributionFee: [Number, "起送价", true],
      distributionTime: [Number, "配送时间", true],
      distance: [Number, "距离", true]
    }
  },
  auditMerchant: {
    body: {
      id: [Number, "商户id", true],
      status: [Number, "审核结果", true],
      remark: [String, "审核备注", false, ""]
    }
  },
  updateMerchantStatus: {
    body: {
      id: [Number, "商户id", true],
      status: [Number, "商户状态", true]
    }
  },
  deletedMerchant: {
    params: {
      id: [Number, "商户id", true]
    }
  },
  getMerchant: {
    params: {
      id: [Number, "商户id", true]
    }
  },
  getMerchantTypes: {
    query: {
      id: [Number, "商户id", true]
    }
  },

  // h5
  searchMerchants: {
    query: {
      name: [String, "商户名称", false, ""],
      status: [String, "商户状态", false, Merchant.ALL_STATUS.join(",")],
      current: [Number, "当前页", false, EnumsPaging.current],
      pageSize: [Number, "每页条数", false, EnumsPaging.pageSize]
    }
  }
};