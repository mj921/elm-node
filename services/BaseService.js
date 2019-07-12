export default class BaseService {
  validDate(date, type = "YYYY-MM-DD HH:mm:ss") {
    if (typeof date !== "string") {
      return false;
    }
    const obj = {
      "YYYY": "2\\d{3}",
      "MM": "(0[1-9]|1[0-2])",
      "DD": "(0[1-9]|[1|2]\\d|3[0|1])",
      "HH": "([0|1]\\d|2[0-3])",
      "mm": "[0-5]\\d",
      "ss": "[0-5]\\d"
    };
    let exp = `^${type}$`;
    Object.keys(obj).forEach(key => {
      exp = exp.replace(key, obj[key]);
    });
    exp = new RegExp(exp);
    return exp.test(date);
  }
  validPhone(phone) {
    return /^1\d{10}$/.test(phone);
  }
  validPassword(password) {
    return /^[0-9A-Za-z]{6,16}$/.test(password);
  }
}