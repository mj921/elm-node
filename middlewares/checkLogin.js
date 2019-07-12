import ResponseCode from "../config/ResponseCode";
import Token from "../lib/Token";

export default function(req, res, next) {
  if (req.headers.authorization) {
    const result = Token.decrypt(req.headers.authorization);
    if (result.token) {
      next();
    } else {
      res.json({
        success: false,
        data: null,
        code: ResponseCode.LOGIN_INVALIDATION,
        message: "登录失效"
      });
    }
  } else {
    res.json({
      success: false,
      data: null,
      code: ResponseCode.LOGIN_INVALIDATION,
      message: "登录失效"
    });
  }
}