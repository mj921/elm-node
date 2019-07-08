
export default class BaseController{
  successJson (data = null, message = "") {
    return {
      success: true,
      data,
      code: 20000,
      message
    };
  }
  errorJson (message = "", code = 50000) {
    return {
      success: false,
      data: null,
      code,
      message
    };
  }
}
