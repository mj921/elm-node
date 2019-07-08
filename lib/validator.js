/**
 * 校验工具类
 */
export default class Validator {
    /**
     * 判断是否是正整数
     * @param {number} value 
     */
    static validPositiveInteger (value) {
        return value > 0 && /^\d*$/.test(value + "");
    }
    /**
     * 判断是否为整数
     * @param {number} value 
     */
    static validInteger (value) {
        return /^\d*$/.test(value + "");
    }
    /**
     * 判断是否为空
     * @param {*} value 
     */
    static isNull (value) {
        return value === undefined || value === null;
    }
    static isNumber (value) {
        return typeof value === "number";
    }
}