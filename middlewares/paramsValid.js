import ParamError from "../lib/ParamError";
/**
 * 类型校验
 * @param {*} value
 * @param {*} type
 */
const typeValid = (value, type) => {
  if (type === Number) {
    return typeof value === "number";
  } else if (type === String) {
    return typeof value === "string";
  } else if (type === Boolean) {
    return typeof value === "boolean";
  } else {
    return value instanceof type;
  }
};
/**
 * 类型转换
 * @param {string} value
 * @param {array} typeArr
 */
const typeConversion = (value, typeArr) => {
  let result;
  try {
    switch (typeArr[0]) {
      case Number:
        result = Number(value);
        if (result !== result) {
          throw new ParamError(`${typeArr[1]}类型不正确`);
        }
        return result;
      case Boolean:
        return value !== "false" && value !== "0" && value !== "null" && value !== "undefined";
      case Array:
        return JSON.parse(value);
      case Date:
        return new Date(value);
      case Object:
        return JSON.parse(value);
      default:
        return value;
    }
  } catch (err) {
    throw new ParamError(`${typeArr[1]}类型不正确`);
  }
};

const paramsConversion = (paramValid, params) => {
  Object.keys(paramValid).forEach(key => {
    // 如果参数必填 且参数为空
    if (paramValid[key][2] && (params[key] === undefined || params[key].length === 0)) {
      throw new ParamError(`${paramValid[key][1]}不能为空`);
    }
    // 如果参数不为空
    if (params[key] !== undefined && params[key].length !== 0) {
      params[key] = typeConversion(params[key], paramValid[key]);
    } else {
      if (paramValid[key].length > 3) {
        params[key] = paramValid[key][3];
      }
    }
  });
};

/**
 * 请求参数校验
 * @param {Object} params
 * @param {Object} params.query
 * @param {Object} params.body
 * @param {Object} params.params
 * @param {key: [type, name, required, defult]} query body params 内值是数据结构
 * @param type: 数据类型
 * @param name: 参数名称
 * @param required: 是否必填
 * @param default: 不是必填时默认值
 * @
 */
const paramsValid = params => (req, res, next) => {
  try {
    if (params.query) {
      paramsConversion(params.query, req.query);
    }
    if (params.body) {
      Object.keys(params.body).forEach(key => {
        if (params.body[key][2] && (req.body[key] === undefined || (typeof req.body[key] === "string" && req.body[key].length === 0))) {
          throw new ParamError(`${params.body[key][1]}不能为空`);
        }
        if (req.body[key] === undefined || (typeof req.body[key] === "string" && req.body[key].length === 0)) {
          if (params.body[key].length > 3) {
            req.body[key] = params.body[key][3];
          }
        } else {
          if (typeof req.body[key] === "string") {
            req.body[key] = typeConversion(req.body[key], params.body[key]);
          } else {
            if(!typeValid(req.body[key], params.body[key][0])) {
              throw new ParamError(`${params.body[key][1]}类型不正确`);
            }
          }
        }
      });
    }
    if (params.params) {
      paramsConversion(params.params, req.params);
    }
    next();
  } catch (err) {
    next(err);
  }
};
paramsValid.paramsConversion = paramsConversion;
export default paramsValid;
