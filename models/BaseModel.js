import moment from "moment";
export default class BaseModel {
  dateFmt(date, fmt) {
    return date ? moment(date).format(fmt) : "";
  }
}
/** 全部 99 */
BaseModel.ALL = 99;