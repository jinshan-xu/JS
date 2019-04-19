
import md5 from 'md5';

/**
 * 传参数据验证
 */

var strategies = {
    isRequired: function (value, errorMsg) {
        if (value === undefined || value === null) {
            return errorMsg;
        }
    },
    isNonEmpty: function (value, errorMsg) {
        // 不为空
        if (value === '') {
            return errorMsg;
        }
    },
    minLength: function (value, length, errorMsg) {
        // 限制最小长度
        if (value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function (value, errorMsg) {
        // 手机号码格式
        if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    isNumber: function (value, errorMsg) {
        if (value === undefined || value === null) {
            return;
        }
        if (isNaN(+value)) {
            return errorMsg;
        }
    },
    isEmail: function (value, errorMsg) {
        if (!/^[\w]+([-+.]\w+)*@\w+([-.]\w+)*$/.test(value)) {
            return errorMsg;
        }
    },
    isGaopengEmail: function (value, errorMsg) { },
};
var Validator = function () {
    this.cache = []; // 保存校验规则
};
Validator.prototype.add = function (value, rule, errorMsg) {
    var ary = rule.split(':'); // 把strategy 和参数分开
    this.cache.push(function () {
        // 把校验的步骤用空函数包装起来，并且放入cache
        var strategy = ary.shift(); // 用户挑选的strategy
        ary.unshift(value); // 把input 的value 添加进参数列表
        ary.push(errorMsg); // 把errorMsg 添加进参数列表
        return strategies[strategy].apply(value, ary);
    });
};
Validator.prototype.start = function () {
    for (var i = 0, validatorFunc = 0; !!this.cache[i]; i++) {
        validatorFunc = this.cache[i];
        var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
        if (msg) {
            // 如果有确切的返回值，说明校验没有通过
            return msg;
        }
    }
};
/**
 *
 * @param {Object} params
 * @param {Array} validatorArgs  [key,验证规则,错误提示]
 */
var validatorFunc = function (params, validatorArgs) {
    var validator = new Validator(); // 创建一个validator 对象
    /***************添加一些校验规则****************/

    if (!validatorArgs) return '';
    for (var i in validatorArgs) {
        validatorArgs[i].unshift(params[validatorArgs[i].shift()]);
        validator.add.apply(validator, validatorArgs[i]);
    }
    var errorMsg = validator.start(); // 获得校验结果
    return errorMsg;
};

export default {
    validatorFunc: validatorFunc,

    getQueryStringArgs: function () {
        var qs = window.location.search.length > 0 ? window.location.search.substring(1) : '',
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    },

    serialize: function (obj) {
        // 序列化 在 post 请求中。 content-type: 'application/x-www-form-urlencoded' 时进行
        var parts = [];
        for (var i in obj) {
            parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
        }
        return parts.join('&');
    },
    checkPhoneNum: function (phoneNum) {
        return /^1[0-9]{10}$/.test(phoneNum);
    },
    checkCode: function (code) {
        return /^[0-9]{6}$/.test(code);
    },
    sign: function (obj, signStr) {
        if (typeof obj !== 'object') {
            throw new TypeError('must be Object');
        }
        var keyArray = [];
        var parts = [];
        for (var key in obj) {
            keyArray.push(key);
        }
        keyArray.sort();

        keyArray.forEach(function (item) {
            parts.push(item + '=' + obj[item]);
        });

        var hashStrFirst = md5("/someStr" + parts.join("&"));
        var hashStrFirstArray = hashStrFirst.split("");
        return md5(hashStrFirstArray.join(""));
    },
    millisecondToTime(micro_time, format) {
        var result = '';
        var left = micro_time;
        if (/hh/i.test(format)) {
            var hours = parseInt(left / (60 * 60 * 1000), 10);
            left = left - 60 * 60 * 1000 * hours;

            if (hours > 0) {
                result += hours > 9 ? hours : '0' + hours;
            } else {
                result += '00';
            }
            if (/mm/i.test(format)) {
                result += ':';
            }
        }
        if (/mm/i.test(format)) {
            var minutes = parseInt(left / (60 * 1000), 10);
            left = left - 60 * 1000 * minutes;

            if (minutes > 0) {
                result += minutes > 9 ? minutes : '0' + minutes;
                //str = (minutes > 9 ? minutes : "0" + minutes) + "";
            } else {
                result += '00';
            }
            if (/ss/i.test(format)) {
                result += ':';
            }
        }
        if (/ss/i.test(format)) {
            var seconds = parseInt(left / 1000, 10);
            left = left - seconds * 1000;

            if (seconds > 0) {
                result += seconds > 9 ? seconds : '0' + seconds;
            } else {
                result += '00';
            }
            if (/\./i.test(format)) {
                result += '.';
            }
        }
        if (/\./i.test(format)) {
            var micro_s = parseInt(left / 10, 10);
            if (micro_s > 0) {
                result += (micro_s > 9 ? micro_s : '0' + micro_s) + '';
            } else {
                result += '00';
            }
        }
        return result;
    },
    genSortFun(key, isReverse) {
        function compare(data1, data2) {
            if (key != null) {
                data1 = data1[key]
                data2 = data2[key]
            }
            if (isReverse) {
                return data1 < data2
            } else {
                return data1 > data2
            }
        }

        function bubbleSort(dataStore) {
            var i = dataStore.length - 1,
                j, temp;
            //不断找出最大的元素排在最后面，冒泡一样
            while (i > 0) {
                for (j = 0; j < i; j++) {
                    if (compare(dataStore[j], dataStore[j + 1])) {
                        temp = dataStore[j];
                        dataStore[j] = dataStore[j + 1];
                        dataStore[j + 1] = temp;
                    }
                }
                i--;
            }
            return dataStore;
        }
        return bubbleSort;
    },
    /**
     * 字符串替换
     *  @param {string} str
     *  @param {string|Regexp} indexStr
     *  @param {string} replaceStr
     *  @return {string}
     */
    stringReplace(str, indexStr, replaceStr) {
        if (typeof str === 'string') {
            return str.replace(indexStr, replaceStr);
        } else {
            return str;
        }
    },
    createNonceStr: function () {
        return Math.random()
            .toString(36)
            .substr(2, 15);
    },
    getSessionStorage: function (item) {
        return JSON.parse(sessionStorage.getItem(item));
    },
    setSessionStorage: function (item, obj) {
        sessionStorage.setItem(item, JSON.stringify(obj));
    },
    getLocalStorage: function (item) {
        return JSON.parse(localStorage.getItem(item));
    },
    removeSessionStorage: function (item) {
        sessionStorage.removeItem(item);
    },
    setLocalStorage: function (item, obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    },
    removeLocalStorage: function (item) {
        localStorage.removeItem(item);
    },
    //解决Android 微信端不刷新问题
    updateUrl: function (url, key) {
        key = (key || 't') + '='; //默认是“t”
        var reg = new RegExp(key + '\\d+'); //正则：t=1472286066028
        var timestamp = +new Date();
        if (url.indexOf(key) > -1) {
            //有时间戳，直接更新
            return url.replace(reg, key + timestamp);
        } //没有时间戳，加上时间戳
        else {
            if (url.indexOf('?') > -1) {
                var urlArr = url.split('?');
                if (urlArr[1]) {
                    return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
                } else {
                    return urlArr[0] + '?' + key + timestamp;
                }
            } else {
                if (url.indexOf('#') > -1) {
                    return url.split('#')[0] + '?' + key + timestamp + window.location.hash;
                } else {
                    return url + '?' + key + timestamp;
                }
            }
        }
    },
    rem750: function (fontSize) {
        var max = 750;
        if (!fontSize) {
            var width = window.innerWidth;
            width = width > max ? max : width;
            var rem = width / (max / 100);
            window.document.documentElement.style.fontSize = rem + 'px';
        } else {
            window.document.documentElement.style.fontSize = fontSize;
        }
    },
    // 获取根元素字体大小
    getRootSize: function () {
        return parseFloat(window.document.documentElement.style.fontSize);
    },
    async deferProcess(fn, deferTime) {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, deferTime);
        });
        return fn;
    },
    formatFloat: function (f, digit) {
        digit = digit != null ? digit : 2;
        var m = Math.pow(10, digit);
        return (Math.round(f * m, 10) / m).toFixed(digit);
    }
}
