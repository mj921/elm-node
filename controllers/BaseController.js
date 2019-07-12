import ResponseCode from "../config/ResponseCode";

export default class BaseController{
  successJson (data = null, message = "") {
    return {
      success: true,
      data,
      code: ResponseCode.SUCCESS,
      message
    };
  }
  errorJson (message = "", code = ResponseCode.SERVER_ERROR) {
    return {
      success: false,
      data: null,
      code,
      message
    };
  }
}
