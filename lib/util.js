class Util {
    static addZero (n) {
        return n < 10 ? "0" + n : n + ""
    }
    static dateFmt (date = new Date(), fmt = "yyyy-MM-dd") {
        if (!(date instanceof Date)) {
            if (typeof date === "number" || /^\d{1,}$/.test(date)) {
                date = new Date(date);
            } else {
                return date || "";
            }
        } else if (date.toString() === "Invalid Date") {
            return "";
        }
        const M = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const obj = {
            "yyyy": date.getFullYear(),
            "yy": date.getYear(),
            "MM": Util.addZero(M),
            "M": M,
            "dd": Util.addZero(d),
            "d": d,
            "HH": Util.addZero(h),
            "H": h,
            "hh": Util.addZero(h % 12),
            "h": h % 12,
            "mm": Util.addZero(m),
            "m": m,
            "ss": Util.addZero(s),
            "s": s,
            "S": date.getTime() % 1000
        }
        for (let key in obj) {
            fmt = fmt.replace(key, obj[key]);
        }
        return fmt;
    }
    static isEmptyString (str) {
        return str === "" || str === null || str === undefined;
    }
    /** 深拷贝 */
	static deepCopy (obj, parent = null) {
		if (parent) {
			let _parent = parent.parent;
			while(_parent) {
				if (_parent.originParent === obj) {
					return parent.currentParent;
				}
				_parent = _parent.parent;
			}
		}
		let o = obj instanceof Array ? [] : {};
		for (var key in obj) {
			if (typeof obj[key] === "object") {
				o[key] = Util.deepCopy(obj[key], {
					originParent: obj,
					currentParent: o,
					parent: parent
				});
			} else {
				o[key] = obj[key];
			}
		}
		return o;
	}
}
export default Util;
